import React, { useState, useEffect } from 'react'
import me from '../assets/images/image.png'
import signature from '../assets/images/sign.png'
import works from '../assets/images/works.png'
import what from '../assets/images/what.png'
import grid from '../assets/images/upwave.png'
import ig from '../assets/images/Instagram.png'
import li from '../assets/images/LinkedIn.png'
import wa from '../assets/images/WhatsApp.png'
import { ArrowRight, ArrowUp, ArrowDown } from 'lucide-react'

const Home = () => {
  // Add state for the bottom sheet
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  // Add state for scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Toggle function for bottom sheet
  const toggleAboutMe = (e) => {
    e.preventDefault();
    setIsAboutMeOpen(!isAboutMeOpen);
  };

  // Handle scroll events to show/hide the scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show button when user is near bottom (within 300px of bottom)
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 300;
      // Hide button when user is near top (within 100px of top)
      const isNearTop = scrollTop < 100;
      
      setShowScrollTop(isNearBottom && !isNearTop);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='flex flex-col text-white gap-4 px-5 lg:px-80 py-5'>
      {/* ============= ROW 1 ============= */}
      <div className='flex md:flex-row flex-col items-stretch gap-4 justify-center'>
        {/* left div - Profile */}
        <div className='border border-zinc-900 flex justify-center lg:flex-row items-center gap-4 md:gap-8 bg-white/3 py-5 px-5 rounded-4xl w-full md:flex-1'>
          <img src={me} alt="Emmy" className='rounded-full md:rounded-full size-20 md:size-50 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')} />
          
          <div className='flex flex-col gap-0.1 lg:text-left'>
            <p className='opacity-70 md:text-xs text-[10px]' style={{fontWeight: '300'}}> Hello I'm</p>
            <p className='font-semibold md:text-2xl text-sm md:text-xl text-indigo-400'>Emmanuel Ayeni.</p>
            <p className='md:text-sm text-[10px] opacity-70 max-w-xs' style={{fontWeight: '300'}}>A Creative Brand Designer, Web Developer & Founder. <span className='hidden lg:block'> I'm known for using my Creativity to design brands and Develop aesthetically pleasing UIs and build scalable web applications that perform efficiently and solve problems.</span></p>
          </div>
        </div>
        
        {/* right div - Cards container */}
        <div className='flex flex-col md:flex-1 gap-4 w-full '>
          {/* About Me section with bottom sheet */}
          <div className='flex flex-col w-full border border-zinc-900 rounded-3xl'>
            <div className='flex items-center justify-between md:justify-center md:gap-10 lg:gap-52 bg-white/3 border-3xl p-5 rounded-3xl'>
              <p className='font-semibold text-xl md:text-2xl lg:text-4xl'>
                More <span className='text-indigo-400'>About Me.</span>
              </p>

              <a href="/" onClick={toggleAboutMe} className='bg-white/4 shadow-md shadow-indigo-500 p-2 rounded-full hover:bg-white/8 transition-colors animate-float'>
                {isAboutMeOpen ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              </a>
            </div>
            
            {/* Bottom Sheet Content */}
            {isAboutMeOpen && (
              <div 
                className='bg-white/3 border border-white/10 rounded-3xl p-4 md:p-6 mt-1 transition-all duration-300 transform origin-top'
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
                    {['Figma', 'Adobe Creative Suite', 'Brand Design', 'UI/UX', 'React', 'Next.js', 
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
          <div className='flex gap-4 flex-col md:flex-row w-full h-full'>
            {/* one - Credentials */}
            <div className='bg-white/3 rounded-4xl flex flex-col gap-4 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={grid} alt="logo compilation" className='rounded-2xl size-45 w-full blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DELIVER PREMIUM</p>
                  <p className='font-semibold'>LOGOS & BRAND DESIGNS</p>
                </div>
                <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <ArrowRight size={18} className='rotate-45'/>
                </a>
              </div>
            </div>

            {/* two - Projects */}
            <div className='bg-white/3 rounded-4xl flex flex-col justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem] blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>I DEVELOP</p>
                  <p className='font-semibold'>WEB APPLICATIONS</p>
                </div>
                <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <ArrowRight size={18} className='rotate-45'/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============= ROW 2 ============= */}
      <div className='flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-row lg:gap-4 gap-4'>
        {/* first */}
         <div className='flex lg:flex-row flex-col md:grid md:grid-cols-3 items-center items-stretch gap-4 justify-between bg-white/3 border-3xl py-14.5 px-5 rounded-3xl w-full h-full border border-zinc-900'>
          <div className='bg-white/1.5 px-3 py-8 rounded-3xl text-center w-full h-full shadow-md shadow-indigo-500'>
            <p className='text-3xl font-semibold'>03+</p>
            <p className='opacity-60 text-xs text-center' style={{fontWeight: '300'}}>Years <br /> Experience</p>
          </div>

          <div className='bg-white/1.5 px-3 py-8 rounded-3xl text-center w-full shadow-md shadow-indigo-500'>
            <p className='text-3xl font-semibold'>15+</p>
            <p className='opacity-60 text-xs text-center' style={{fontWeight: '300'}}>Clients worked with</p>
          </div>

          <div className='bg-white/1.5 px-3 py-8 rounded-3xl text-center w-full shadow-md shadow-indigo-500'>
            <p className='text-3xl font-semibold'>50+</p>
            <p className='opacity-60 text-xs text-center' style={{fontWeight: '300'}}>Projects completed</p>
          </div>
        </div>
              


        {/* second */}
        <div className='bg-white/3 rounded-4xl flex flex-col justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
          <img src={what} alt="MY SERVICES" className='w-50 mb-[-1.5rem] blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

          <div className='flex justify-end items-center w-full'>
            <div className='flex flex-col mr-auto'>
              <p className='text-[8px] opacity-70'>ALL THE</p>
              <p className='font-semibold'>SERVICES I OFFER</p>
            </div>
            <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
              <ArrowRight size={18} className='rotate-45' />
            </a>
          </div>
        </div>

        {/* third */}
        
        <div className='bg-white/3 rounded-4xl flex flex-col justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
          <img src={signature} alt="MacBook Pro" className='w-50 mb-[-1.5rem] blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

          <div className='flex justify-end items-center w-full'>
            <div className='flex flex-col mr-auto'>
              <p className='text-[8px] opacity-70'></p>
              <p className='font-semibold'>CREDENTIALS</p>
            </div>
            <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
              <ArrowRight size={18} className='rotate-45'/>
            </a>
          </div>
        </div>
      </div>

      {/* ============= ROW 3 ============= */}
      <div className='flex md:flex-row flex-col items-stretch gap-2 justify-center'>
       <div className='bg-white/3 rounded-4xl flex flex-col lg:flex-row justify-between items-center py-8 px-5 w-full h-full border border-zinc-900'>
          {/* <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem]' /> */}

          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col mr-auto'>
              <p className='text-[8px] opacity-70'>CLICK ICONS</p>
              <p className='font-semibold lg:text-2xl'>GET IN TOUCH</p>
            </div>
            {/* <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
              <ArrowRight size={18} className='rotate-125' />
            </a> */}
                  </div>
                  
                  <div className="socials flex gap-3 w-full h-full mr-[-1rem]">
                      <a href="https://instagram.com/emmanuelayeni_"><img src={ig} alt="Instagram" className='size-20 transition-transform duration-300 hover:scale-130 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                     <a href="https://wa.me/09132489550"><img src={wa} alt="whatsapp" className='size-20 transition-transform duration-300 hover:scale-130 blur-xs'    loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                     <a href=""><img src={li} alt="linkedin"className='size-20 transition-transform duration-300 hover:scale-130 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                  </div>
              </div>

        {/* two */}
        <div className='flex items-center justify-between lg:gap-60 gap-10 bg-white/3 border-3xl py-8 px-7 rounded-3xl w-full h-full border border-zinc-900'>
          <p className='font-semibold text-2xl lg:text-4xl'>
            Let's <br /> work <span className='text-indigo-400'>together.</span>
          </p>

          <a href="/" className='bg-white/4 p-2 rounded-full mt-6 shadow-md shadow-indigo-500'>
            <ArrowUp size={18} />
          </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-500/80 hover:bg-indigo-500 text-white py-3 px-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm animate-fadeIn z-50"
        >
          <ArrowUp size={18} />
          <span className="font-medium">Scroll to top</span>
        </button>
      )}

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