import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// import { addDoctor, allDoctors, appointmentAdmin, appointmentCancel, loginAdmin, adminDashboard } from "../controllers/adminController.js";


const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body;

    const imageFile = req.file;

    //checking for al data to add doctor

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    //validating password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    //hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      data: Date.now(),
    };

    const newDoctor = await doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res.json({ success: false, message: error.message  });
  }
};

//API for admin login
const loginAdmin = async (req, res) =>{
  try{

    const {email,password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+ password,process.env.JWT_SECRET);
      res.json({success:true,message:"Login Successful",token})
    }else{
      res.json({success:false,message:"Invalid credentials"})
    }
  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to get all doctor list for admin panel
const allDoctors = async (req, res) =>{
  try{
    const doctors = await doctorModel.find({}).select('-password') //remove password
    res.json({success:true,doctors})
  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to get all appointment list for admin panel 
const appointmentAdmin = async(req,res) => {
  try{
    const appointments = await appointmentModel.find({})  //provide all the apppointment in these appointment variable
    res.json({success:true,appointments})

  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api for appointment cancellation
const appointmentCancel = async(req,res) => {
  try{
      const {appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
      

      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

      //releasing doctor slot

      const {docId , slotDate , slotTime} = appointmentData

      const doctorData = await doctorModel.findById(docId)

      let slots_booked = doctorData.slots_booked

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)

      await doctorModel.findByIdAndUpdate(docId,{slots_booked})

      res.json({success:true , message:'Appointment Cancelled'})

  }catch(error){
      console.log(error);
      res.json({ success: false, message: error.message});
  }
}

//api fto get data for dashboard for admin panel
const adminDashboard = async(req,res) => {
  try{
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    //we are getting number of users,doctors,users data
    const dashData = {
      doctors : doctors.length,
      appointments:appointments.length,
      patients : users.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentAdmin,
  appointmentCancel,
  adminDashboard
};

