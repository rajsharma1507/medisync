import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Calendar, UserRound, Users, AlertCircle, X } from 'lucide-react';

const StatsCard = ({ icon, value, title, color }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
    <div className="flex items-center space-x-4">
      <div className={`rounded-full p-3 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {

  const {aToken, dashData, getDashData, cancelAppointment} = useContext(AdminContext) 
  const {slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if(aToken){
      getDashData()
    }
  }, [aToken]);

  if (!dashData) return null;

  const stats = [
    {
      icon: <UserRound className="h-8 w-8 text-blue-600" />,
      value: dashData.doctors,
      title: 'Doctors',
      color: 'bg-blue-50'
    },
    {
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      value: dashData.appointments,
      title: 'Appointments',
      color: 'bg-emerald-50'
    },
    {
      icon: <Users className="h-8 w-8 text-violet-600" />,
      value: dashData.patients,
      title: 'Patients',
      color: 'bg-violet-50'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Latest Bookings</h2>
          </div>
        </div>

        <div className="divide-y max-h-[600px] overflow-auto">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                  />
                </div>
                <div className="ml-4 truncate">
                  <p className="font-medium text-gray-900 truncate">
                    {item.docData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
              </div>
              {item.cancelled ? (
                <div className="flex items-center text-red-500 gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Cancelled</span>
                </div>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="ml-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200 border border-red-200 hover:border-red-600"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard