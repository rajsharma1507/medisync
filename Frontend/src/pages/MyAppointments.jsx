import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Handle Razorpay payment
  const handlePayment = async (appointment) => {
    try {
      // Step 1: Call the backend to create the order
      const { data } = await axios.post(
        `${backendUrl}/api/create-order`,
        { amount: appointment.amount },
        { headers: { token } }
      );

      if (data.success) {
        const { id: orderId } = data.order;

        // Step 2: Initialize Razorpay
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
          amount: appointment.amount * 100, // Amount in paise
          currency: "INR",
          name: "Doctor Appointment",
          description: `Payment for ${appointment.docData.name}`,
          order_id: orderId,
          handler: async function (response) {
            try {
              const {
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
              } = response;

              const paymentData = {
                paymentId,
                orderId,
                signature,
                appointmentId: appointment._id,
              };

              const verifyResponse = await axios.post(
                `${backendUrl}/api/verify-payment`,
                paymentData,
                { headers: { token } }
              );

              if (verifyResponse.data.success) {
                // Update the appointment to show "Paid"
                const updatedAppointments = appointments.map((appt) =>
                  appt._id === appointment._id ? { ...appt, payment: true } : appt
                );
                setAppointments(updatedAppointments);
                toast.success("Payment successful!");
                getUserAppointments();
                getDoctorsData();
              } else {
                toast.error(verifyResponse.data.message);
              }
            } catch (error) {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: "Patient Name", // Get patient's name dynamically if needed
            email: "patient@example.com", // Patient's email
          },
          theme: {
            color: "#F37254",
          },
        };

        // Step 4: Open the Razorpay modal
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Error creating Razorpay order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address :</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-xs text-neutral-700 font-medium">Date & Time :</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end">
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => handlePayment(item)}
                  className="text-xs text-stone-500 sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {item.payment && (
                <button className="sm:min-w-48 py-2 px-4 border border-green-500 rounded-lg text-green-500 font-semibold bg-green-100 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
                Paid
              </button>
              )}
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-xs text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
