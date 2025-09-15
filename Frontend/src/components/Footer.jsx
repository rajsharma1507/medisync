import React from "react";
import { assets } from '../assets/assets';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                className="w-12 h-12 object-contain" 
                src={assets.logo} 
                alt="MediSync Logo" 
              />
              <h2 className="ml-3 text-xl font-bold text-gray-900">MediSync</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              MediSync is India's leading healthcare technology platform, transforming 
              the way medical professionals manage their practices. We provide cutting-edge 
              solutions for appointment scheduling, patient records management, and 
              seamless healthcare delivery.
            </p>
            <div className="flex space-x-4 mb-8">
              
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-800 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919876543210" className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3">
                    <Phone size={16} className="group-hover:text-blue-600" />
                  </span>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p>+91 00000 00000</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:ayush@medisync.in" className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3">
                    <Mail size={16} className="group-hover:text-blue-600" />
                  </span>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p>ayush@medisync.in</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="group flex items-center text-gray-600">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3">
                    <MapPin size={16} className="group-hover:text-blue-600" />
                  </span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Bhopal, Madhya Pradesh</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="group flex items-center text-gray-600">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3">
                    <Clock size={16} className="group-hover:text-blue-600" />
                  </span>
                  <div>
                    <p className="font-medium">Hours</p>
                    <p>Mon - Sat: 9AM - 7PM</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MediSync. All rights reserved. | Made with ❤️ in India
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
              <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;