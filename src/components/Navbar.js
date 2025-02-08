import React, { useState, useEffect } from 'react';
import useNavbar from '../hooks/useNavbar';

const Navbar = () => {
  const { isScrolled } = useNavbar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (isMenuOpen && !e.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };
    
    // Close menu when hash changes (section navigation)
    const handleHashChange = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [isMenuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a 
            href="#" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-xl lg:text-3xl font-bold tracking-wide hover:text-green-400 transition-colors duration-300 relative z-50"
          >
            Muhammad Abdullah
          </a>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {['Work', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-white font-semibold text-base hover:text-green-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-sm transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <ul className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] space-y-8">
            {['Work', 'About', 'Contact'].map((item) => (
              <li key={item} className="w-full text-center">
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block w-full py-4 text-white text-2xl font-semibold hover:text-green-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;