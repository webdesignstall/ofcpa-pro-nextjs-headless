import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const pathToLabel = {
      '/': 'Home',
      '/#what-we-do': 'What We Do',
      '/blog': 'Blog and Articles',
      '/#packages': 'Packages',
    };
    setActiveSection(pathToLabel[router.asPath] || '');
  }, [router.asPath]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const closeSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex xl:justify-around lg:justify-between justify-between items-center px-6 py-6 xl:px-4 xl:py-4">
        <Link href="/">
          <Image
            width={300}
            height={300}
            className="bg-cover w-52 lg:w-72"
            src="/OFCPA-Banner.webp"
            alt="Main logo"
            priority
          />
        </Link>
        <div className="lg:hidden">
          <Sidebar />
        </div>
        <div className="hidden lg:flex">
          <div className="flex">
            {[
              { label: 'Home', href: '/' },
              { label: 'What We Do', href: '/#what-we-do' },
              { label: 'Testimonials', href: 'https://go.ofcpa.pro/vsl-step-2-page', external: true },
              { label: 'Packages', href: '/#packages' },
              { label: 'Blog and Articles', href: '/blog' },
              { label: 'Comparison', href: '/comparison' },
            ].map(({ label, href, external }) => (
              <div
                key={label}
                className={`text-xl  font-normal p-3 cursor-pointer duration-200 
                  ${activeSection === label ? 'text-yellow-500' : 'text-[#005978] hover:text-yellow-500'}`}
              >
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </div>
            ))}
            <div
              className="text-lg font-normal text-[#005978] p-3 hover:text-yellow-500 duration-200 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={25} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div
            data-aos="fade-up"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          >
            <button
              onClick={closeSearch}
              className="fixed top-12 right-12 text-white hover:text-yellow-500"
            >
              <X size={35} />
            </button>
            <div
              className="relative w-full max-w-3xl mx-auto"
              data-aos="fade-up"
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
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
