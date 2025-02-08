import React , { useState , useEffect } from 'react';

const useNavbar = () => {

      const [isScrolled, setIsScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
      return{
        isScrolled 
      }

};

export default useNavbar;