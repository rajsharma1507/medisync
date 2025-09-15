import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative ">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.1)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center min-h-[calc(100vh-6rem)] py-8">
          {/* Left Content Section */}
          <div className="md:w-1/2 flex flex-col items-start justify-center space-y-8 md:pr-12">
            {/* Floating Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-full py-2 px-4 border border-white/20">
              <span className="text-emerald-400 font-medium">✨ Trusted by 10,000+ Patients</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Expert Healthcare
                <span className="block bg-gradient-to-r from-blue-200 to-emerald-200 bg-clip-text text-transparent">
                  At Your Fingertips
                </span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                Connect with top-rated doctors for personalized care. 
                Schedule appointments seamlessly and take control of your health journey.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">👨‍⚕️</div>
                <div className="text-white font-semibold">500+ Doctors</div>
                <div className="text-blue-200 text-sm">Verified Specialists</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">🏥</div>
                <div className="text-white font-semibold">100+ Clinics</div>
                <div className="text-blue-200 text-sm">Premium Locations</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">⭐️</div>
                <div className="text-white font-semibold">4.9/5 Rating</div>
                <div className="text-blue-200 text-sm">Patient Reviews</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">🕒</div>
                <div className="text-white font-semibold">24/7 Support</div>
                <div className="text-blue-200 text-sm">Always Available</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#speciality"
                className="relative overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Appointment
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute -inset-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur-2xl" />
              </div>

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/90 to-indigo-900/90 p-1">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    src={assets.header_img}
                    alt="Professional doctor consultation"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                </div>
              </div>

              {/* Floating Card - Available Now */}
              <div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-gray-800 font-medium">Live Consultations Available</p>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Connect with doctors in real-time
                </p>
              </div>

              {/* Floating Card - Quick Appointment */}
              <div className="absolute -top-4 right-4 bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-lg shadow-xl text-white">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium">Quick Appointments</p>
                </div>
                <p className="text-sm mt-1">Available within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;