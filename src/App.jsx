import React, { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import BottomMenu from './components/Menu'
import CustomCursor from './components/CustomCursor'
import FuturisticLoader from './components/Loader'
import BottomSheetNotification from './components/Notification'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [shootingStars, setShootingStars] = useState([]);
  // Create a ref to track if ScrollReveal has been initialized
  const scrollRevealInitialized = useRef(false);
 
  // Handle initial loading
  useEffect(() => {
    // Simulate loading time or replace with actual asset loading logic
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Initialize ScrollReveal only after loading completes
      // Small timeout to ensure the loader transition has started
      setTimeout(() => {
        initializeScrollReveal();
      }, 800); // Match this with the transition time in your loader
    }, 3000);
   
    return () => clearTimeout(timer);
  }, []);
  
  // Function to initialize ScrollReveal
  const initializeScrollReveal = () => {
    // Prevent double initialization
    if (scrollRevealInitialized.current) return;
    
    // If you're using the ScrollReveal package
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal();
      
      // Configure your scroll reveal animations here
      // Example: target all sections with the reveal class
      sr.reveal('.reveal', {
        duration: 1000,
        distance: '20px',
        easing: 'ease-in-out',
        origin: 'bottom',
        reset: false
      });
      
      // Add more specific animations as needed
      sr.reveal('.reveal-left', {
        origin: 'left',
        delay: 300
      });
      
      sr.reveal('.reveal-right', {
        origin: 'right',
        delay: 300
      });
      
      scrollRevealInitialized.current = true;
    }
  };
 
  // Generate new shooting stars periodically
  useEffect(() => {
    // Only start shooting star animations after loading is complete
    if (loading) return;
   
    // Create initial shooting stars
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createShootingStar(), i * 700);
    }
   
    // Add new shooting stars every few seconds
    const interval = setInterval(() => {
      createShootingStar();
    }, 1500);
   
    return () => clearInterval(interval);
  }, [loading]);
 
  // Function to create a new shooting star
  const createShootingStar = () => {
    const newStar = {
      id: Date.now() + Math.random(),
      left: Math.random() * 80,
      top: Math.random() * 40,
      duration: Math.random() * 2 + 2.5, // 2.5-4.5s duration
      size: Math.random() * 1.5 + 0.8,
      distance: Math.random() * 250 + 150
    };
   
    setShootingStars(prev => [...prev, newStar]);
   
    // Remove shooting star after animation completes
    setTimeout(() => {
      setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
    }, newStar.duration * 1000 + 100);
  };

  return (
    <>
      {/* Futuristic Loader */}
      <FuturisticLoader isLoading={loading} />
   
      {/* Main Content - only visible after loading */}
      <div className={`relative bg-black h-full montserrat overflow-hidden transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Night sky background - with z-index to ensure it stays behind content */}
        <div className="fixed inset-0 bg-black z-0">
          {/* Shooting stars only */}
          {shootingStars.map(star => (
            <div
              key={star.id}
              className="absolute h-px"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size * 80}px`,
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0))',
                animation: `shoot ${star.duration}s cubic-bezier(0.05, 0.25, 0.25, 1) forwards`,
                transform: 'rotate(45deg)'
              }}
            />
          ))}
        </div>
        {/* Your existing components with z-index to ensure they're above the stars */}
        <div className="relative z-10">
          <Home />
          <BottomMenu />
          <CustomCursor />
          <BottomSheetNotification />
        </div>
       
        {/* Animation for shooting stars */}
        <style jsx>{`
          @keyframes shoot {
            0% {
              transform: translateX(0) translateY(0) rotate(45deg);
              opacity: 0.5;
            }
            10% {
              opacity: 0.7;
            }
            100% {
              transform: translateX(${Math.random() * 200 + 150}px) translateY(${Math.random() * 200 + 150}px) rotate(45deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default App