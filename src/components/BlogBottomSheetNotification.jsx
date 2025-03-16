import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import me from '../assets/images/model.webp'
import { X, MessageSquare,  MessageSquareText, Image, Users, BookOpen, ArrowRight, BookText, Sparkles } from 'lucide-react';

const BlogBottomSheetNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the notification after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 120000);
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
        <h3 className="text-2xl font-medium mb-2 text-white">😎 Fresh Insights & Ideas <br /> <span className='text-lg hidden' >I'm currently AVAILABLE to take projects.</span></h3>
        <p className="text-gray-30 font-light text-xs max-w-[90%]"> Discover thought-provoking articles, expert tips, and industry insights on my blog. I also share relatable and funny content to brighten your day!</p>
      </div>
      <div className="flex text-center justify-center items-center text-sm text-gray-400 mb-4">
              <Sparkles size={16} className="mr-1 text-yellow-400" />
              <span>Updated daily with fresh content</span>
            </div>
   <div className="flex flex-col gap-3">
  <Link 
          to="/blogs"
          onClick={handleClose}
    className="bg-indigo-700 hover:bg-indigo-600 text-white py-3 px-4 rounded-2xl flex items-center justify-center font-semibold transition-colors"
  >
    <BookOpen className="mr-2" size={18} />
    Go to Feed
  </Link>

</div>

    </div>
  );
};

export default BlogBottomSheetNotification;