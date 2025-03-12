import React, { useEffect, useState } from 'react';

const FuturisticLoader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    let interval;
    
    if (isLoading) {
      setVisible(true);
      // Use a more reliable approach for progress incrementation
      interval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 1;
          // Force completion after a timeout to prevent hanging
          if (newValue >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newValue;
        });
      }, 25);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);
  
  // Handle completion and transition separately
  useEffect(() => {
    let hideTimer;
    
    if (progress >= 100 && !isLoading) {
      hideTimer = setTimeout(() => {
        setVisible(false);
      }, 800); // Slightly longer delay for smoother transition
    }
    
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [progress, isLoading]);
  
  // Add a safety timeout to ensure the loader always completes
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(100);
      }
    }, 8000); // Force completion after 8 seconds max
    
    return () => clearTimeout(safetyTimeout);
  }, []);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <div className={`montserrat fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-700 ${!isLoading && progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-12 relative mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-indigo-500 rounded-full opacity-30 animate-pulse"></div>
          
          {/* Inner rotating element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-t-2 border-r-2 border-indigo-500 rounded-full animate-spin"></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Text & Progress - properly centered */}
        <div className="text-center w-full max-w-xs px-4">
          <div className="text-white font-semibold text-md font-light mb-4 mx-auto">
            Hang tight, Almost there! <br />
            <span className='text-xs opacity-70 font-normal'> Great things take time, just like this masterpiece.</span>
          </div>
          
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-indigo-500" 
              style={{ 
                width: `${progress}%`, 
                transition: 'width 0.2s ease-out' 
              }}
            ></div>
          </div>
          
          <div className="text-indigo-500 mt-2 montserrat mx-auto">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticLoader;