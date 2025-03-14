import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from './Menu';
import ScrollReveal from 'scrollreveal';
import me from '../assets/images/image.png'
import signature from '../assets/images/sign.png'
import works from '../assets/images/works.png'
import what from '../assets/images/serve.png'
import grid from '../assets/images/upwave.png'
import ig from '../assets/images/Instagram.png'
import li from '../assets/images/LinkedIn.png'
import wa from '../assets/images/WhatsApp.png'
import { ArrowRight, ArrowUp, ArrowDown, X, Eye, Mail } from 'lucide-react'
// import FuturisticLoader from '../components/Loader'


const Home = () => {
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleAboutMe = (e) => {
    e.preventDefault();
    setIsAboutMeOpen(!isAboutMeOpen);
  };

    const toggleServices = (e) => {
    e.preventDefault();
    setIsServicesOpen(!isServicesOpen);
  };




  
//  useEffect(() => {
  // Function to handle scroll event
//   const handleScroll = () => {
//     if (window.scrollY > 300) {
//       document.getElementById('scrollTopBtn').classList.remove('hidden');
//     } else {
//       document.getElementById('scrollTopBtn').classList.add('hidden');
//     }
//   };
  
//   // Add scroll event listener
//   window.addEventListener('scroll', handleScroll);
  
//   // Initial check in case page is already scrolled on load
//   handleScroll();
  
//   // Cleanup event listener on component unmount
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);

// Function to handle scroll to top
// function handleScrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
// }

    

    
    // SCROLL REVEAL

 useEffect(() => {
    // ScrollReveal setup
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out',
      opacity: 0,
      reset: false, // Optional: Reset animation on scroll back
      scale: 0.8, // Optional: You can scale the element
    });
  }, []);
    
    
    

const currentYear = new Date().getFullYear();

    return (
      
    <div className='flex flex-col text-white gap-4 px-5 lg:px-85 py-5 lg:py-15' id='home'>
      {/* ============= ROW 1 ============= */}
      <div id="home" className='reveal flex md:flex-row flex-col items-stretch gap-4 justify-center'>
        {/* left div - Profile */}
        <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal border border-zinc-900 flex justify-center lg:flex-row items-center gap-4 md:gap-8 bg-white/3 py-5 px-5 rounded-4xl w-full md:flex-1'>
          <img src={me} alt="Emmy" className='rounded-full md:rounded-full size-20 md:size-50 blur-xs reveal'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')} />
          
          <div className='flex flex-col gap-0.1 lg:text-left reveal'>
            <p className='opacity-70 md:text-xs text-[10px]' style={{fontWeight: '300'}}> Hello I'm</p>
            <p className='font-semibold md:text-2xl text-sm text-indigo-400'>Emmanuel Ayeni.</p>
            <p className='md:text-sm text-[10px] opacity-70 max-w-xs' style={{fontWeight: '300'}}>A Creative Brand Designer, Web Developer, Founder & Mentor. <span className='hidden lg:block'> I'm known for using my Creativity to design brands and Develop aesthetically pleasing UIs and build scalable web applications that perform efficiently and solve problems.</span></p>
          </div>
        </div>
        
        {/* right div - Cards container */}
        <div className='flex flex-col md:flex-1 gap-4 w-full '>
          {/* About Me section with bottom sheet */}
          <div id="about" className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 flex flex-col w-full border border-zinc-900 rounded-3xl reveal'>
            <div className='flex items-center justify-between md:justify-between md:gap-14 lg:gap-40 bg-white/3 border-3xl p-5 rounded-3xl'>
              <p className='font-semibold text-xl md:text-2xl lg:text-4xl'>
                More <span className='text-indigo-400'>About Me.</span>
              </p>

              <a href="#about" onClick={toggleAboutMe} className='bg-white/4 text-xs shadow-md shadow-indigo-500 p-2 rounded-full hover:bg-white/8 transition-colors animate-float'>
                {isAboutMeOpen ? <span className='flex items-center px-1 gap-1'><X size={18} /> Collapse</span> : <span className='flex items-center px-1 gap-1'><ArrowDown size={18} /> Expand</span> }
              </a>
            </div>
            
            {/* Bottom Sheet Content */}
            {isAboutMeOpen && (
              <div 
                className='reveal bg-white/3  rounded-3xl p-4 md:p-6 mt-1 transition-all duration-300 transform origin-top'
                style={{
                  animation: 'slideIn 0.3s ease-out forwards',
                }}
              >
                <div className='grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8'>
                  <div>
                    <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-indigo-400'>My Journey</h3>
                    <p className='text-xs md:text-sm opacity-80 mb-3 md:mb-4' style={{fontWeight: '300'}}>
                      I started my design and development journey with a passion for creating 
                      visually appealing and functional digital experiences. Over the years, 
                      I've honed my skills in both brand design and web development.
                    </p>
                    <p className='text-xs md:text-sm opacity-80' style={{fontWeight: '300'}}>
                      I combine creativity with technical expertise to deliver solutions 
                      that not only look great but also perform exceptionally well.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-indigo-400'>My Approach</h3>
                    <p className='text-xs md:text-sm opacity-80 mb-3 md:mb-4' style={{fontWeight: '300'}}>
                      I believe in understanding the core of each project before diving into design or code. 
                      This allows me to create brands and websites that truly represent my clients' vision 
                      and meet their business objectives.
                    </p>
                    <p className='text-xs md:text-sm opacity-80' style={{fontWeight: '300'}}>
                      Whether designing a brand identity or developing a web application, I focus on 
                      creating work that's both aesthetically pleasing and functionally sound.
                    </p>
                  </div>
                </div>
                
                <div className='mt-4 md:mt-6'>
                  <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-indigo-400'>Skills & Technologies</h3>
                  <div className='flex flex-wrap gap-2'>
                    {['Adobe Creative Suite', 'Brand Design', 'UI/UX', 'React', 'Next.js', 
                      'Tailwind CSS', 'JavaScript', 'Node.js', 'MongoDB'].map((skill) => (
                      <span key={skill} className='px-2 md:px-3 py-1 bg-white/5 rounded-full text-[10px] md:text-xs'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cards wrapper */}
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' id="projects">
            {/* one - Credentials */}
            <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-4 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={grid} alt="logo compilation" className='rounded-2xl size-45 w-full blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DELIVER PREMIUM</p>
                  <p className='font-semibold'>BRAND DESIGNS</p>
                </div>
                <Link to="/projects" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex gap-1 text-xs items-center'>Explore <ArrowRight size={10} /></span>
                </Link>
              </div>
            </div>

            {/* two - Projects */}
            <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem] blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DEVELOP FAST & SCALABLE</p>
                  <p className='font-semibold'>WEB APPLICATIONS</p>
                </div>
                <Link to="/projects" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex gap-1 text-xs items-center'>Explore <ArrowRight size={10} /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============= ROW 2 ============= */}
      <div className='flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-row lg:gap-4 gap-4'>
        {/* first */}
         <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal flex lg:flex-row flex-col md:grid md:grid-cols-3 items-stretch gap-4 justify-between bg-white/3 border-3xl py-14.5 px-5 rounded-3xl w-full h-full border border-zinc-900'>
          <div className='reveal bg-white/1.5 px-3 py-8 rounded-3xl text-center w-full h-full shadow-md shadow-indigo-500'>
            <p className='text-3xl font-semibold'>03+</p>
            <p className='opacity-60 text-xs text-center' style={{fontWeight: '300'}}>Years <br /> Experience</p>
          </div>

          <div className='reveal bg-white/1.5 px-3 py-8 rounded-3xl text-center w-full shadow-md shadow-indigo-500'>
            <p className='text-3xl font-semibold'>20+</p>
            <p className='opacity-60 text-xs text-center' style={{fontWeight: '300'}}>Clients worked with</p>
          </div>

          <div className='reveal bg-white/1.5 px-3 py-8 rounded-3xl text-center w-full shadow-md shadow-indigo-500'>
            <p className='text-3xl font-semibold'>50+</p>
            <p className='opacity-60 text-xs text-center' style={{fontWeight: '300'}}>Projects completed</p>
          </div>
        </div>
              


        {/* second */}
        <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
          <img src={what} alt="MY SERVICES" className='reveal w-50 md:w-42 blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

          <div className='flex justify-center gap-[-1rem] items-center w-full'>
            <div className='flex flex-col mr-auto'>
              <p className='text-[8px] opacity-70'>MY</p>
              <p className='font-semibold'>SERVICES</p>
            </div>
            <a href="#services" onClick={toggleServices} className='bg-white/4 text-xs p-2 rounded-full shadow-md shadow-indigo-500 flex flex-row '>
               {isServicesOpen ? <span className='flex items-center px-1 gap-1'><X size={18} /> Collapse</span> : <span className='flex items-center px-1 gap-1'><ArrowDown size={18} /> Expand</span> }
            </a>
            </div>
            



            {isServicesOpen && (
              <div 
                className='reveal bg-white/3 rounded-3xl p-4 md:p-6 mt-1 transition-all duration-300 transform origin-top'
                style={{
                  animation: 'slideIn 0.3s ease-out forwards',
                }}
              >
                <div className='grid md:grid-cols-2 gap-6 md:gap-6 lg:gap-8'>
                  <div>
                    <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-indigo-400'>Branding & Rebranding</h3>
                    <p className='text-xs md:text-sm opacity-80 mb-3 md:mb-4' style={{fontWeight: '300'}}>
                     I will help you create a strong brand identity that is perfect for you or your business. From logos to brand strategy, I will make sure your brand looks professional and feels right for your audience.
                    </p>
                    <p className='text-xs md:text-sm opacity-80 hidden' style={{fontWeight: '300'}}>
                      I combine creativity with technical expertise to deliver solutions 
                      that not only look great but also perform exceptionally well.
                    </p>
                    <a href="https://wa.me/2349132489550?text=Hi%20Emmy,%20I%20need%20your%20Branding%20Service." className='bg-indigo-500 text-white px-2 py-2 text-xs rounded-full border border-black'>I need this</a>
                  </div>
                  
                  <div>
                    <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-indigo-400'>Website Development 🧑‍💻</h3>
                    <p className='text-xs md:text-sm opacity-80 mb-3 md:mb-4' style={{fontWeight: '300'}}>
                     I design and develop websites that are fast, user-friendly, and visually appealing. Whether you need a simple portfolio or a full business website or landingpage, I make sure it works smoothly and looks great 😉.
                    </p>
                    <p className='text-xs md:text-sm opacity-80 hidden' style={{fontWeight: '300'}}>
                      Whether designing a brand identity or developing a web application, I focus on 
                      creating work that's both aesthetically pleasing and functionally sound.
                    </p>
                     <a href="https://wa.me/2349132489550?text=Hi%20Emmy,%20I%20need%20a%20Website." className='bg-indigo-500 text-white px-2 py-2 text-xs rounded-full border border-black'>I need this</a>
                  </div>
                </div>
                
                <div className='mt-4 md:mt-6'>
                  <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-indigo-400'>Graphic Designing <span className='text-amber-300'>(Subscription Only)</span></h3>
                  <p className='text-xs md:text-sm opacity-80 mb-3 md:mb-4' style={{fontWeight: '300'}}>
                    Great designs ain't a one-time thing, it’s ongoing. <span className='font-medium'>My subscription service</span> gives you <span className='text-amber-300'>unlimited, high-quality designs </span>whenever you need them, without the hassle of hiring a full-time designer 😲. It’s the most cost-effective and convenient way to keep your brand looking fresh 😜.
                  </p>
                   <a href="https://wa.me/2349132489550?text=Hi%20Emmy,%20please%20send%20me%20your%20Graphic%20Design%20subscription%20Packages." className='bg-indigo-500 text-white px-2 py-2 text-xs rounded-full border border-black'>I need this</a>
                </div>
              </div>
            )}
        </div>

        {/* third */}
        
        <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
          <img src={signature} alt="MacBook Pro" className='reveal w-50 mb-[-1.5rem] blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

          <div className='flex justify-end items-center w-full'>
            <div className='flex flex-col mr-auto'>
              <p className='text-[8px] opacity-70'></p>
              <p className='font-semibold'>CREDENTIALS</p>
            </div>
            <a href="https://linkedin.com/in/emmanuel-ayeni01" className='bg-white/4 flex gap-1.5 p-1.5 cursor-pointer rounded-full shadow-md shadow-indigo-500 text-xs'>
                {/* <ArrowRight size={18} className='rotate-45'/> */}
              <Eye size={18} />  View on linkedIn
            </a>
          </div>
        </div>
      </div>

      {/* ============= ROW 3 ============= */}
        <div className='reveal flex md:flex-row flex-col items-stretch lg:gap-[-2rem] gap-2 justify-center ' id='contact'>
          {/* one */}
       <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col lg:flex-row justify-between items-center py-8 px-5 w-full h-full border border-zinc-900'>
          {/* <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem]' /> */}

          {/* <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem]' /> */}

          <div className='flex justify-center items-center w-full reveal '>
            <div className='flex flex-col mr-auto'>
              <p className='text-[8px] opacity-70'>CLICK ICONS TO</p>
              <p className='font-semibold lg:text-2xl'>GET IN TOUCH</p>
            </div>
            {/* <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
              <ArrowRight size={18} className='rotate-125' />
            </a> */}
                  </div>
                  
                  <div className="socials flex gap-3 w-full h-full mr-[-1rem] reveal">
                      <a href="https://instagram.com/emmanuelayeni_"><img src={ig} alt="Instagram" className='reveal size-20 transition-transform duration-300 hover:scale-130 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                     <a href="https://wa.me/+2349132489550"><img src={wa} alt="whatsapp" className='reveal size-20 transition-transform duration-300 hover:scale-130 blur-xs'    loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                     <a href="https://linkedin.com/in/emmanuel-ayeni01"><img src={li} alt="linkedin"className='reveal size-20 transition-transform duration-300 hover:scale-130 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                  </div>
              </div>

        {/* two */}
        <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal flex items-center justify-between lg:gap-40 gap-6 bg-white/3 border-3xl py-8 px-7 rounded-3xl w-full h-full border border-zinc-900'>
          <p className='font-semibold text-2xl lg:text-4xl'>
            Let's <br /> work <span className='text-indigo-400'>together.</span>
          </p>

          <a href="http://wa.me/09132489550" className='bg-white/4 p-2 rounded-full mt-6 shadow-md shadow-indigo-500 text-xs'>
              <span className='flex flex-row gap-1'>
                 <ArrowUp size={18} />
              Say Hi!👋
             </span>
          </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
     {/* <button
  id="scrollTopBtn"
  onClick={handleScrollToTop}
  className="fixed bottom-6 right-6 z-50 hidden flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full shadow-md shadow-indigo-500 hover:bg-gray-800 transition-all duration-300"
>
  <ArrowUp className="w-5 h-5" />
  <span className="text-sm font-medium">Top</span>
</button> */}
          
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
          <div className="text-center md:text-right">
            <a 
              href="mailto:eayeni185@gmail.com" 
              className="text-gray-400 shadow-md flex gap-1.5 shadow-indigo-500 p-4 rounded-2xl text-sm hover:text-indigo-400 transition duration-300"
                >
               <Mail size={24} />   
              eayeni185@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>

        
        {/* Menu */}
        <BottomMenu />


      {/* Add the CSS animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Home