import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { Search } from 'lucide-react';
import Link from 'next/link';

function Header() {
  const [activeSection, setActiveSection] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection(section); // Set active section
    const sectionId = section.toLowerCase().replace(/\s+/g, '-');
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Home', 'What We Do', 'Testimonials', 'Packages'];
      sections.forEach((section) => {
        const sectionId = section.toLowerCase().replace(/\s+/g, '-');
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const { top, bottom } = sectionElement.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="flex xl:justify-around lg:justify-between justify-between items-center px-6 py-4">
        <div>
          <Link href='/'>
            <Image
              width={300}
              height={300}
              className="bg-cover"
              src="/OFCPA-Banner.webp"
              alt="Main logo"
              priority
            />
          </Link>
        </div>
        <div className="lg:hidden">
          <Sidebar />
        </div>
        <div className="hidden lg:flex">
          <div className="flex">
            {['Home', 'What We Do', 'Testimonials', 'Packages'].map((section) => (
              <div
                key={section}
                onClick={() => handleSectionClick(section)}
                className={`text-lg font-normal p-3 cursor-pointer duration-200 ${
                  activeSection === section ? 'text-yellow-500 font-semibold' : 'text-[#005978] hover:text-yellow-500'
                }`}
              >
                {section}
              </div>
            ))}
            <div className="text-lg font-normal text-[#005978] p-3 hover:text-yellow-500 duration-200 cursor-pointer">
              <Link href='/blog'>Blog and Articles</Link>
            </div>
            <div className="text-lg font-normal text-[#005978] p-3 hover:text-yellow-500 duration-200 cursor-pointer">
              <Search size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
