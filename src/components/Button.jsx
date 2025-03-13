import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Mail, Menu, X, ArrowLeft } from 'lucide-react';

const Button = () => {

const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('home');



  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Adding offset to improve detection
      
      // Find all sections and determine which one is in view
      const sections = menuItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveItem(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation method using direct scrolling
  const handleNavClick = (e, id) => {
    e.preventDefault(); // Prevent default anchor behavior
    
    // Update active state
    setActiveItem(id);
    
    // Close the menu
    setIsExpanded(false);
    
    // Get the target element
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Calculate position to scroll to
      const headerOffset = 80; // Adjust based on your header height if needed
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Perform smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center items-center px-4 py-4  animate-float">
      <div 
        className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl transition-all duration-300 flex items-center ${
          isExpanded ? 'py-2 px-5 w-full max-w-md' : 'p-1'
        }`}
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Toggle Button */}
              <Link
        to="/"          
        onClick={() => navigate(-1)} 
          className="absolute left-3 z-10 bg-indigo-500/80 hover:bg-indigo-500 rounded-full p-2 transition-all duration-300"
        >
          <ArrowLeft size={20} color='black'/>
        </Link>

        {/* Menu Items */}
        <div className={`flex justify-between items-center w-full transition-all duration-300 ${
          isExpanded ? 'opacity-100 ml-10' : 'opacity-0 pointer-events-none'
        }`}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <a 
                href={`#${item.id}`}
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'text-indigo-400 scale-110' 
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                <div className={`relative p-2 ${isActive ? 'before:content-[""] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-indigo-400 before:rounded-full' : ''}`}>
                  <IconComponent size={20} />
                </div>
                <span className="text-[8px] mt-1">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Hidden Collapsed View */}
        <div className={`absolute inset-0 flex justify-center items-center transition-all duration-300 ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <span className="text-xs font-semibold tracking-widest text-white/80 ml-8">Go Back</span>
        </div>
      </div>

      {/* Floating Indicator - Shows on hover/tap outside expanded menu */}
      <div 
        className={`absolute bottom-full mb-4 bg-indigo-500/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
          isExpanded ? 'opacity-0 pointer-events-none transform translate-y-2' : 'opacity-0'
        }`}
      >
        Tap to explore
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Button;