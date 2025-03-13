import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import me from '../assets/images/model.webp'
import { X, MessageSquare, ArrowRight } from 'lucide-react';

const BottomSheetNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the notification after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 14500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className={`fixed backdrop-blur-3xl gap-4 bg-black/80 border border-white/10 bottom-0 rounded-[2.5rem] transform transition-transform duration-300 ease-in-out z-50 
      sm:right-0 sm:left-auto sm:max-w-md sm:rounded-tl-4xl sm:rounded-tr-4xl
      md:right-6 md:bottom-6 md:rounded-4xl
      xs:left-0 xs:right-0 xs:rounded-t-4xl
      ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-full md:translate-x-[120%] md:translate-y-0'}
      p-5 text-white`}
    >
      <div className="flex justify-end items-center mb-4 md:ml-85">
        <div className="flex items-center">
          {/* <MessageSquare className="text-indigo-500 mr-2" size={20} /> */}
          {/* <span className="font-medium">Notification</span> */}
        </div>
        <button onClick={handleClose} className="text-gray-400 hover:text-white">
          <X size={30} />
        </button>
      </div>
          
      <div className='flex justify-center items-center'>
        <img src={me} alt="Emmy" className='rounded-full size-35 shadow-xs shadow-indigo-500 mb-3'/>
      </div>
      
      <div className="mb-6 text-center flex justify-center flex-col items-center">
        <h3 className="text-2xl font-medium mb-2 text-white">Hey there!, <br /> <span className='text-lg hidden' >I'm currently AVAILABLE to take projects.</span></h3>
        <p className="text-gray-30 font-light text-xs max-w-[90%]">I'm currently AVAILABLE to take projects. Looking for an expert creative to handle your next project? Let's collaborate to create something amazing together.</p>
      </div>
      
      <div className="flex flex-col gap-3">
        <a 
          href="https://wa.me/09132489550" 
          className="bg-indigo-500 hover:bg-indigo-400 text-white py-3 px-4 rounded-2xl flex items-center justify-center font-semibold transition-colors"
        >
          Tell me about your project
          <ArrowRight className="ml-2" size={16} />
        </a>

        <Link 
          to="/projects"
          onClick={handleClose}
          className="bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-2xl flex items-center justify-center font-semibold transition-colors"
        >
          See my past works
        </Link>
      </div>
    </div>
  );
};

export default BottomSheetNotification;