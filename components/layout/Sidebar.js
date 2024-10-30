import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { AlignJustify, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    toggleDrawer(); // Close the drawer

    // Delay smooth scrolling until after drawer close animation
    setTimeout(() => {
      const sectionId = section.toLowerCase().replace(/\s+/g, '-');
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Adjust delay as needed (300ms is typically fine)
  };

  return (
    <>
      <button onClick={toggleDrawer} className="top-4 left-4">
        <AlignJustify size={30} />
      </button>
      
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{
          width: '80vw',
          maxWidth: '400px',
          height: '100vh',
          backgroundColor: '#fff',
          paddingTop: '1rem',
        }}
        className="relative z-40"
      >
        <button onClick={toggleDrawer} className="absolute top-4 right-5 z-50">
          <X size={30} />
        </button>
        
        <div className="pt-14 space-y-4">
          {['Home', 'What We Do', 'Testimonials', 'Packages', 'Blog and Articles'].map((section) => (
            <div
              key={section}
              onClick={() => handleSectionClick(section)}
              className={`text-md px-6 py-1 transition-colors cursor-pointer ${
                selectedSection === section ? 'text-blue-600 font-medium' : 'hover:bg-gray-100'
              }`}
            >
              {section}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
