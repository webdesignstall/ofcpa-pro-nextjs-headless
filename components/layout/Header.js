import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSectionClick = (section) => {
    setActiveSection(section);
    const sectionId = section.toLowerCase().replace(/\s+/g, '-');
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const closeSearch = () => {
    setSearchQuery('');  // Clear the search input
    setIsSearchOpen(false);
  };

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
          <Link href="/">
            <Image
              width={300}
              height={300}
              className="bg-cover w-36 lg:w-full"
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
                className={`text-lg font-normal p-3 cursor-pointer duration-200 ${activeSection === section ? 'text-yellow-500 font-semibold' : 'text-[#005978] hover:text-yellow-500'
                  }`}
              >
                <Link href={`/#${section.toLowerCase().replace(/\s+/g, '-')}`}>{section}</Link>
              </div>
            ))}
            <div className="text-lg font-normal text-[#005978] p-3 hover:text-yellow-500 duration-200 cursor-pointer">
              <Link href="/blog">Blog and Articles</Link>
            </div>
            <div
              className="text-lg font-normal text-[#005978] p-3 hover:text-yellow-500 duration-200 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <button>
                <Search size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeSearch}
              className="fixed top-12 right-12 text-white hover:text-yellow-500"
            >
              <X size={35} />
            </button>
            <motion.div
              className="relative w-full max-w-3xl mx-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 text-lg bg-white rounded-md focus:outline-none"
                placeholder="Search"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-4 top-4 text-[#005978] hover:text-yellow-500"
              >
                <Search size={25} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
