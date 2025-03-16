import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, X } from 'lucide-react';

const NetworkStatusDetector = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);

  useEffect(() => {
    // Handler functions
    const handleOnline = () => {
      setIsOnline(true);
      if (hasBeenOffline) {
        setShowNotification(true);
        // Auto-hide the notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setHasBeenOffline(true);
      setShowNotification(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [hasBeenOffline]);

  // Don't render anything if there's no network status change
  if (!showNotification) return null;

  return (
    <div className="fixed top-6 right-6 left-6 md:left-auto md:w-96 z-50 flex items-center justify-between bg-gradient-to-r from-gray-900 to-black border border-indigo-500/30 rounded-2xl p-4 shadow-lg shadow-indigo-500/20 backdrop-blur-sm animate-fadeIn">
      <div className="flex items-center">
        {isOnline ? (
          <div className="relative">
            <Wifi className="text-indigo-400 h-6 w-6 mr-3" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
        ) : (
          <div className="relative">
            <WifiOff className="text-red-400 h-6 w-6 mr-3" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        )}
        <div>
          <p className="text-white font-medium">
            {isOnline ? 'Connection Restored' : 'No Internet Connection'}
          </p>
          <p className="text-white/60 text-[8px]">
            {isOnline
              ? 'Your connection has been restored. You can continue exploring.'
              : 'Please check your internet connection and reload.'}
          </p>
        </div>
      </div>
      <button
        onClick={() => setShowNotification(false)}
        className="text-white/60 hover:text-indigo-400 transition-colors ml-3 flex-shrink-0"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default NetworkStatusDetector;