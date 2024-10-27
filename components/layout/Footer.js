import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div>
      {/* Main Footer Section */}
      <div className="bg-sky-700 px-4 py-16 md:py-24 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Empty Column (for Centered Layout on Desktop) */}
          <div></div>

          {/* Center Content */}
          <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
            {/* Contact Details */}
            <ul className="text-white space-y-6 md:space-y-8">
              {/* Email */}
              <li className="flex items-center space-x-4 group">
                <div className="rounded-full p-3 bg-sky-800 group-hover:bg-yellow-500 border border-sky-700 transition duration-200">
                  <Mail size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-medium">Email</span>
                  <span className="text-md font-medium">abc@gmail.com</span>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-center space-x-4 group">
                <div className="rounded-full p-3 bg-sky-800 group-hover:bg-yellow-500 border border-sky-700 transition duration-200">
                  <Phone size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-medium">Phone</span>
                  <span className="text-md font-medium">+8525412556</span>
                </div>
              </li>
            </ul>

            {/* Logo */}
            <div className="pt-8 md:pt-0">
              <Image
                width={150}
                height={150}
                src="/footer_section_logo.webp"
                alt="footer logo"
                className="transition duration-200 transform hover:scale-105"
              />
            </div>
          </div>

          {/* Right Empty Column (for Centered Layout on Desktop) */}
          <div></div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-gray-800 py-4">
        <p className="text-white text-center text-xs sm:text-sm">
          <span className="text-gray-400">Copyright © 2024</span>{' '}
          <Link href="#" className="underline hover:text-yellow-500 transition duration-200">
            The OnlyFans Accountant
          </Link>
        </p>
      </div>
    </div>
  );
}
