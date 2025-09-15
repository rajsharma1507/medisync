import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-white border-r border-gray-200 shadow-sm'>
        {
            aToken && 
            <ul className='pt-4 md:pt-6 text-gray-700'>
                <NavLink className={({isActive})=> `
                            flex items-center gap-4 py-4 px-6 mx-3 mb-2
                            transition-all duration-300 ease-in-out
                            rounded-lg
                            ${isActive 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600' 
                                : 'hover:bg-gray-50 hover:text-gray-900'
                            }
                        `} 
                        to={'/admin-dashboard'}>
                    <img src={assets.home_icon} alt="" 
                    className="w-5 h-5 opacity-80"
                    />
                    <p className="font-medium text-sm" >Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `
                            flex items-center gap-4 py-4 px-6 mx-3 mb-2
                            transition-all duration-300 ease-in-out
                            rounded-lg
                            ${isActive 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600' 
                                : 'hover:bg-gray-50 hover:text-gray-900'
                            }
                        `} 
                        to={'/all-appointments'}
                        >
                    <img src={assets.appointment_icon} alt=""
                     className="w-5 h-5 opacity-80"
                    />
                    <p className="font-medium text-sm" >All Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=> `
                            flex items-center gap-4 py-4 px-6 mx-3 mb-2
                            transition-all duration-300 ease-in-out
                            rounded-lg
                            ${isActive 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600' 
                                : 'hover:bg-gray-50 hover:text-gray-900'
                            }
                        `} 
                        to={'/add-doctor'}
                        >
                    <img src={assets.add_icon} alt="" className="w-5 h-5 opacity-80"/>
                    <p className="font-medium text-sm" >Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive})=> `
                            flex items-center gap-4 py-4 px-6 mx-3 mb-2
                            transition-all duration-300 ease-in-out
                            rounded-lg
                            ${isActive 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600' 
                                : 'hover:bg-gray-50 hover:text-gray-900'
                            }
                        `} 
                        to={'/doctor-list'}>
                    <img src={assets.people_icon} alt="" className="w-5 h-5 opacity-80"/>
                    <p className="font-medium text-sm" >Doctors List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar