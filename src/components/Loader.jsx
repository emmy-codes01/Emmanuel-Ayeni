import React, { useEffect, useState } from 'react';

const FuturisticLoader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 25);
      
      return () => clearInterval(interval);
    } else {
      // When loading is complete and progress reaches 100%
      if (progress === 100) {
        // Add a small delay before hiding the loader for a smooth transition
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 500);
        return () => clearTimeout(hideTimer);
      }
    }
  }, [isLoading, progress]);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
      <center>
          <div className={`montserrat h-screen overflow-hidden fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${!isLoading && progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-24 h-24 mb-12 relative">
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
      
      {/* Text & Progress */}
      <div className="text-center">
                  <div className="text-white font-semibold text-md font-light mb-4">Hang tight, Almost there! <br /><span className='text-xs opacity-70 font-normal'> Great things take time, just like this masterpiece.</span></div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full w-full bg-indigo-500" 
            style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}
          ></div>
        </div>
        <div className="text-indigo-500 mt-2 montserrat">{progress}%</div>
      </div>
    </div>
    </center>
  );
};

export default FuturisticLoader;