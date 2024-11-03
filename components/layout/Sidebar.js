import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { AlignJustify, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleDrawer} className="top-4 left-4">
        <AlignJustify strokeWidth={1.5} className='text-blue-700' size={30} />
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
          <X className='text-blue-700' size={30} />
        </button>

        <div className="pt-20 space-y-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'What We Do', href: '/#what-we-do' },
            { label: 'Testimonials', href: 'https://go.ofcpa.pro/vsl-step-2-page' },
            { label: 'Packages', href: '/#packages' },
            { label: 'Blog and Articles', href: '/blog' },
            { label: 'Comparison', href: '/comparison' },
          ].map(({ label, href, external }) => (
            <div
              key={label}
              onClick={() => {
                toggleDrawer();
                setTimeout(() => {
                  if (!external) {
                    router.push(href);
                  } else {
                    window.open(href, '_blank', 'noopener noreferrer');
                  }
                }, 300);
              }}
              className={`text-md px-6 py-1 transition-colors cursor-pointer ${
                router.asPath === href ? 'text-blue-600 font-medium' : 'hover:bg-gray-100'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
