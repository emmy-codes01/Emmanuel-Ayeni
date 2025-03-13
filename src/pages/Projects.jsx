import React from 'react'
import grid from '../assets/images/OASIS.png'
import works from '../assets/images/works.png'
import designs from '../assets/images/designs.png'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react';
import Button from '../components/Button';



const Projects = () => {

  const currentYear = new Date().getFullYear();


  return (
    <div className='flex flex-col text-white items-stretch gap-4 px-5 lg:px-85 py-5 lg:py-15'>
      {/* Heading */}
      <div>
        <h4 className='md:gap-14 lg:gap-52 bg-white/3 border border-zinc-900 border-3xl p-5 rounded-3xl text-2xl font-semibold shadow-md shadow-indigo-500'>My <span className='text-indigo-500'>Portfolio</span></h4>
      </div>
      

      
      
      {/* Cards wrapper */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one - Credentials */}
            <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={grid} alt="logo compilation" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DELIVER PREMIUM</p>
                  <p className='font-semibold'>LOGOS & BRAND DESIGNS</p>
                </div>
                <Link to="/projects/brands" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex gap-1 text-xs items-center'>See More <ArrowRight size={10} /></span>
                </Link>
              </div>
            </div>

            {/* two - Projects */}
            <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={works} alt="MacBook Pro" className='blur-xs bg-cover w-full h-full' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DEVELOP FAST & SCALABLE</p>
                  <p className='font-semibold'>WEB APPLICATIONS</p>
                </div>
                <Link to="/projects/websites" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex gap-1 text-xs items-center'>View All <ArrowRight size={10} /></span>
                </Link>
              </div>
        </div>
        
 {/* three - Projects */}
            <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={designs} alt="My Designs" className='blur-xs bg-cover rounded-2xl w-full h-full'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DESIGN HIGH QUALITY</p>
                  <p className='font-semibold'>CUSTOM GRAPHICS</p>
                </div>
                <Link to="/projects/websites" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex gap-1 text-xs items-center'>See More <ArrowRight size={10} /></span>
                </Link>
              </div>
        </div>

      </div>
      


         
<footer className="w-full bg-transparent py-6 border-t border-gray-800 mt-16 mb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Copyright and name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              <span className="font-medium text-white">Emmanuel Ayeni</span> © {currentYear} All rights reserved
            </p>
          </div>
          
          {/* Middle - Navigation */}
          {/* <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li><a href="#home" className="text-gray-400 hover:text-white text-sm transition duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm transition duration-300">About</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white text-sm transition duration-300">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm transition duration-300">Contact</a></li>
            </ul>
          </nav> */}
          
          {/* Right side - Email */}
          {/* <div className="text-center md:text-right">
            <a 
              href="mailto:eayeni105@gmail.com" 
              className="text-gray-400 shadow-md flex gap-1.5 shadow-indigo-500 p-4 rounded-2xl text-sm hover:text-indigo-400 transition duration-300"
                >
               <Mail size={24} />   
              eayeni105@gmail.com
            </a>
          </div> */}
        </div>
      </div>
    </footer>

 



      <Button />
      

      </div>

  
  )
}

export default Projects