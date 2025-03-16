import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, X, WifiLow } from 'lucide-react';

const NetworkStatusDetector = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    isOnline: navigator.onLine,
    isWeak: false,
    latency: 0
  });
  const [showNotification, setShowNotification] = useState(false);
  const [hasHadIssue, setHasHadIssue] = useState(false);

  // Function to test connection speed/quality
  const checkConnectionQuality = () => {
    // Only check if we're online
    if (!navigator.onLine) return;

    const startTime = Date.now();
    
    // Fetch a small resource to test latency
    fetch('/favicon.ico', { cache: 'no-store' })
      .then(response => {
        const latency = Date.now() - startTime;
        const isWeak = latency > 600; // Consider connection weak if latency > 300ms
        
        setConnectionStatus(prev => ({
          ...prev,
          isWeak,
          latency
        }));

        // Show notification if connection is weak and we haven't shown one already
        if (isWeak && !showNotification) {
          setHasHadIssue(true);
          setShowNotification(true);
          // Auto-hide after 5 seconds
          setTimeout(() => setShowNotification(false), 7000);
        }
      })
      .catch(() => {
        // If fetch fails but navigator.onLine is true, it might be a weak connection
        setConnectionStatus(prev => ({
          ...prev,
          isWeak: true
        }));
        setHasHadIssue(true);
        setShowNotification(true);
      });
  };

  useEffect(() => {
    // Handler functions
    const handleOnline = () => {
      setConnectionStatus(prev => ({
        ...prev,
        isOnline: true
      }));
      
      if (hasHadIssue) {
        setShowNotification(true);
        // Auto-hide the notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      }
      
      // Check quality after connection is restored
      setTimeout(checkConnectionQuality, 1000);
    };

    const handleOffline = () => {
      setConnectionStatus(prev => ({
        ...prev,
        isOnline: false
      }));
      setHasHadIssue(true);
      setShowNotification(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check connection quality initially and periodically
    checkConnectionQuality();
    const intervalId = setInterval(checkConnectionQuality, 30000); // Check every 30 seconds

    // Also check when resources fail to load
    const handleResourceError = () => {
      checkConnectionQuality();
    };
    
    window.addEventListener('error', handleResourceError, true);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleResourceError, true);
      clearInterval(intervalId);
    };
  }, [hasHadIssue]);

  // Helper function to get notification content based on connection status
  const getNotificationContent = () => {
    if (!connectionStatus.isOnline) {
      return {
        icon: <WifiOff className="text-red-400 h-6 w-6 mr-3" />,
        indicator: <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>,
        title: 'No Internet Connection',
        message: 'Please check your internet connection and reload.'
      };
    } else if (connectionStatus.isWeak) {
      return {
        icon: <WifiLow className="text-yellow-400 h-6 w-6 mr-3" />,
        indicator: <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>,
        title: 'Weak Connection Detected',
        message: `Slow loading might occur in some images. Network latency: ${connectionStatus.latency}ms`
      };
    } else {
      return {
        icon: <Wifi className="text-indigo-400 h-6 w-6 mr-3" />,
        indicator: <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>,
        title: 'Connection Restored',
        message: 'Your connection has been restored. You can continue exploring.'
      };
    }
  };

  // Don't render anything if there's no notification to show
  if (!showNotification) return null;

  const content = getNotificationContent();

  return (
    <div className="fixed top-6 right-6 left-6 md:left-auto md:w-96 z-50 flex items-center justify-between bg-gradient-to-r from-gray-900 to-black border border-indigo-500/30 rounded-2xl p-4 shadow-lg shadow-indigo-500/20 backdrop-blur-sm animate-fadeIn">
      <div className="flex items-center">
        <div className="relative">
          {content.icon}
          {content.indicator}
        </div>
        <div>
          <p className="text-white font-medium">{content.title}</p>
          <p className="text-white/60 text-[8px]">{content.message}</p>
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