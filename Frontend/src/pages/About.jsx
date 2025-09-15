import React from 'react';
import { assets } from '../assets/assets';
import { Clock, Heart, Activity, Check, Users, Hospital } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "10K+", text: "Active Users" },
    { number: "500+", text: "Doctors" },
    { number: "50+", text: "Specialties" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section with Stats */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">
          About <span className="text-blue-600">MediSync</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Revolutionizing healthcare access through technology and compassionate care
        </p>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section with Image */}
      <div className="flex flex-col lg:flex-row gap-16 mb-20 items-center">
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3"></div>
          <img 
            className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]" 
            src={assets.about_image} 
            alt="Healthcare professionals" 
          />
        </div>

        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Transforming Healthcare For A Better Tomorrow
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            At MediSync, we're revolutionizing the way you access healthcare services. Our platform combines cutting-edge technology with compassionate care to provide you with an unparalleled medical appointment experience.
          </p>

          {/* Key Features */}
          <div className="space-y-4">
            {[
              "Easy online appointment booking",
              "24/7 customer support",
              "Secure medical records",
              "Instant doctor consultations"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-1">
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              Our vision at MediSync is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose <span className="text-blue-600">MediSync</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience healthcare that's designed around you and your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Efficiency",
              description: "Streamlined appointment scheduling that fits into your busy lifestyle, with smart reminders and instant confirmations."
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Convenience",
              description: "Access to a network of trusted healthcare professionals in your area, with easy online booking and management."
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Personalization",
              description: "Tailored recommendations and reminders to help you stay on top of your health, with personalized care plans."
            }
          ].map((feature, index) => (
            <div key={index} 
                 className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;