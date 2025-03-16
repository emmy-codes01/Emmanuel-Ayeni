import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Bella, Emmy's virtual assistant. Ask me anything about Emmy!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Expanded knowledge base
  const knowledgeBase = {
    // Basic info about Emmy
    "who are you": "I'm Bella, a virtual assistant for Emmy. He is a web developer and designer specializing in React and brand design.",
    "what do you do": "I help answer questions about Emmy's skills, experience, and services. Emmy is a Web developer with over 3 years of experience building web applications.",
    "who is emmy": "Emmy is a talented web developer and designer with over 3 years of experience building web applications. He specializes in React, JavaScript, and UI/UX design.",
    "tell me about emmy": "Emmy is a creative web developer and designer who creates beautiful, functional websites and applications. With over 3 years of experience, he specializes in React, JavaScript, and UI/UX design.",
    "contact": "You can contact Emmy at eayeni185@gmail.com or through the contact form on this website.",
    "email": "You can reach Emmy at eayeni185@gmail.com for any inquiries or project discussions.",
    "phone": "Emmy prefers initial contact through email at eayeni185@gmail.com or through the contact form on this website.",
    "location": "Emmy is based in Nigeria and works remotely with clients worldwide.",
    "hire": "If you're interested in hiring Emmy for your project, please use the contact form on this website or email him directly at eayeni185@gmail.com with details about your project.",
    
    // Conversation starters
    "how are you": "I'm doing great! I'm here to help answer any questions you might have about Emmy or his services. How can I assist you today?",
    "hello": "Hello there! I'm Bella, Emmy's virtual assistant. How can I help you today?",
    "hi": "Hi! I'm Bella, Emmy's virtual assistant. Feel free to ask me anything about Emmy or his services!",
    "hey": "Hey there! I'm Bella, Emmy's assistant. What would you like to know about Emmy?",
    "good morning": "Good morning! I'm Bella, Emmy's virtual assistant. How can I help you today?",
    "good afternoon": "Good afternoon! I'm Bella, Emmy's virtual assistant. What can I help you with?",
    "good evening": "Good evening! I'm Bella, Emmy's virtual assistant. How can I assist you tonight?",
    "what's up": "I'm here to help you learn more about Emmy and his services! What would you like to know?",
    "how's it going": "Everything's great! I'm here to help you learn more about Emmy. What can I tell you about him?",
    
    // Response to user's state
    "I'm good": "That's great to hear! I'm Emmy's assistant, Bella. Feel free to ask me anything about Emmy or his services.",
    "I'm fine": "Glad to hear that! I'm Emmy's assistant, Bella. What would you like to know about Emmy?",
    "I'm okay": "Good to know! I'm Emmy's assistant, Bella. How can I help you today?",
    "I'm doing great": "Wonderful! I'm Emmy's assistant, Bella. What can I tell you about Emmy or his services?",
    "I'm doing fine": "That's good! I'm Emmy's assistant, Bella. Feel free to ask me anything about Emmy.",
    "I'm alright": "Glad to hear that! I'm Emmy's assistant, Bella. What would you like to know about Emmy?",
    "I'm not good": "I'm sorry to hear that. I hope your day gets better. In the meantime, maybe I can help you find something interesting about Emmy and his work?",
    "I'm sad": "I'm sorry you're feeling down. While I'm here to talk about Emmy, I hope learning about his creative work might bring a little brightness to your day.",
    "I'm tired": "Taking breaks is important! When you're ready, I'm here to tell you all about Emmy and his amazing work.",
    
    // Skills and Expertise
    "skills": "Emmy specializes in React, JavaScript, Node.js, and UI/UX design. He's also experienced with TypeScript, Next.js, and various CSS frameworks like Tailwind and Styled Components.",
    "expertise": "Emmy's expertise includes front-end development with React, responsive design, UI/UX principles, brand design, and creating performant web applications.",
    "technologies": "Emmy works with React, JavaScript, TypeScript, Next.js, Node.js, Express, MongoDB, PostgreSQL, Firebase, Tailwind CSS, SCSS, and various other web technologies.",
    "programming languages": "Emmy primarily works with JavaScript and TypeScript, but also has experience with HTML, CSS, SQL, and basic Python.",
    "frontend": "Emmy excels in frontend development, working with React, Next.js, JavaScript, TypeScript, and CSS frameworks like Tailwind.",
    "backend": "Emmy has experience with Node.js, Express, MongoDB, PostgreSQL, and Firebase for backend development.",
    "design": "Emmy combines his development skills with strong design sensibilities, creating visually appealing and user-friendly interfaces.",
    "ux": "Emmy prioritizes user experience in all his projects, focusing on intuitive navigation, accessibility, and responsive design.",
    "ui": "Emmy creates beautiful, functional user interfaces that align with brand identities and provide excellent user experiences.",
    "react": "React is one of Emmy's core specialties. He's built numerous applications using React, including this website.",
    "javascript": "Emmy has deep knowledge of JavaScript, including ES6+ features, async programming, and modern best practices.",
    "typescript": "Emmy uses TypeScript in many projects to ensure type safety and improve code quality.",
    "css": "Emmy is skilled with modern CSS techniques, including flexbox, grid, animations, and using frameworks like Tailwind CSS.",
    
    // Experience
    "experience": "Emmy has over 3 years of professional experience working with startups and agencies. He's built everything from e-commerce platforms to SaaS applications.",
    "work history": "Emmy has worked with various clients in different industries, from startups to established businesses, helping them build their web presence.",
    "career": "Emmy has been working professionally in web development for over 3 years, continuously expanding his skills and taking on increasingly complex projects.",
    "clients": "Emmy has worked with clients across various industries including tech, education, healthcare, e-commerce, and creative services.",
    "industries": "Emmy has experience working with clients in tech, education, healthcare, e-commerce, and creative services industries.",
    
    // Projects
    "portfolio": "You can check out Emmy's portfolio by clicking on the 'Works' section in the navigation menu. He's worked on projects for clients in construction, tech, education, and e-commerce.",
    "projects": "Emmy has worked on various projects including e-commerce websites, company websites, web applications, and brand identity designs. Check out the 'Works' section to see some examples.",
    "recent work": "Emmy's recent work includes web applications, e-commerce sites, and brand identity projects. Visit the 'Works' section to see some of his latest projects.",
    "best project": "Emmy takes pride in all his projects, but you can see some of his highlighted work in the 'Works' section.",
    "examples": "You can find examples of Emmy's work in the 'Works' section of this website.",
    
    // Services
    "services": "Emmy offers web development, logo & brand design, consulting, and maintenance services for existing websites.",
    "web development": "Emmy provides full-stack web development services, specializing in React-based applications and responsive websites.",
    "brand design": "Emmy offers brand design services including logo creation, color palette development, typography selection, and brand guidelines.",
    "logo design": "Emmy creates unique, memorable logos that capture the essence of your brand and work across various applications.",
    "consulting": "Emmy provides technical consulting services to help businesses make informed decisions about their web technology stack.",
    "maintenance": "Emmy offers website maintenance services to keep your site updated, secure, and performing optimally.",
    "website redesign": "Emmy can help redesign your existing website to improve its appearance, functionality, and user experience.",
    "mobile responsive": "Emmy ensures all websites he builds are fully responsive and work perfectly on all devices, from desktops to smartphones.",
    
    // Pricing and Process
    "pricing": "Emmy's rates vary based on project scope and complexity. For a custom quote, please contact him through the contact form with details about your project needs.",
    "rates": "Emmy's rates are project-based and depend on the scope, complexity, and timeline. Contact him for a personalized quote.",
    "cost": "The cost of working with Emmy depends on your specific project requirements. Please reach out through the contact form for a customized quote.",
    "quote": "To get a quote for your project, please use the contact form on this website with details about your requirements.",
    "process": "Emmy's design and development process starts with understanding your goals, followed by research, wireframing, design, development, and thorough testing. He ensures clients are kept in the loop at every stage.",
    "timeline": "Project timelines vary based on scope and complexity. Emmy will provide an estimated timeline after discussing your specific requirements.",
    "how long": "The time to complete a project depends on its scope and complexity. Emmy will provide a timeline estimate after your initial consultation.",
    "payment": "Emmy typically works with a deposit upfront and milestone payments throughout the project. Specific payment terms are discussed during the project planning phase.",
    
    // Personality and Background
    "personality": "Emmy is known for being incredibly talented, gifted, and gentle. He approaches every project with creativity and a positive attitude. He's patient with clients and takes time to understand their vision before bringing it to life.",
    "what is he like": "Emmy is a creative, gentle soul with a passion for design and technology. He's known for his patience, attention to detail, and ability to transform complex ideas into beautiful, functional websites.",
    "background": "Emmy discovered his passion for web development and design early on, and has continuously honed his skills through both formal education and self-directed learning. His unique approach combines technical expertise with an artistic sensibility.",
    "education": "Emmy has a strong educational background in computer science and designing, complemented by continuous self-learning and staying updated with the latest web technologies and design trends.",
    "why emmy": "Emmy stands out for his combination of technical skills and design sensibility, his attention to detail, and his commitment to delivering high-quality work that meets and exceeds client expectations.",
    
    // Work Approach
    "work style": "Emmy takes a collaborative approach to his work, ensuring clients are involved throughout the development process. He values clear communication and makes complex technical concepts easy to understand.",
    "collaboration": "Emmy believes in working closely with clients to ensure their vision is realized. He maintains open communication throughout the project and welcomes feedback.",
    "communication style": "Emmy is an excellent communicator who keeps clients informed throughout the project lifecycle. He explains technical concepts clearly and is always responsive to questions and concerns.",
    "revisions": "Emmy works with clients to ensure they're completely satisfied with the final product. The number of revisions depends on the project agreement, but he's always willing to make adjustments to meet client expectations.",
    "feedback": "Emmy welcomes feedback throughout the project process and uses it to improve the final product.",
    
    // Personal Life
    "social life": "Outside of work, Emmy enjoys spending his time alone, attending tech meetups, and participating in design communities. He believes in balancing work with social activities that inspire creativity.",
    "hobbies": "When not coding or designing, Emmy enjoys photography, fashion, exploring nature, reading books on design and innovation, and occasionally volunteering for community projects.",
    "interests": "Emmy is interested in design, technology, photography, fashion, and nature. These interests often inspire his creative work.",
    "fun facts": "Emmy has a keen eye for photography and fashion, which influences his design aesthetic. He also loves exploring nature to find inspiration for his creative projects.",
    
    // Strengths and Values
    "strengths": "Emmy's greatest strengths are his creativity, technical problem-solving abilities, attention to detail, and genuine care for delivering high-quality work that exceeds client expectations.",
    "unique qualities": "What makes Emmy stand out is his ability to bridge the gap between technical functionality and beautiful design. He's not just a developer or designer – he excels at both.",
    "values": "Emmy values honesty, quality craftsmanship, continuous learning, and building lasting relationships with clients. He believes that the best digital products come from understanding both user needs and business goals.",
    "philosophy": "Emmy believes that technology should serve people, not the other way around. He focuses on creating digital experiences that are not only visually appealing but also intuitive and accessible.",
    "mission": "Emmy's mission is to create digital experiences that are not only visually stunning but also intuitive, accessible, and effective at achieving business objectives.",
    
    // Availability and Contact
    "availability": "Emmy's availability varies depending on his current project load. Contact him through the website to discuss your project timeline and his availability.",
    "schedule": "Emmy typically responds to inquiries within 1-2 business days. Project timelines are discussed during the initial consultation.",
    "timezone": "Emmy is based in Nigeria (WAT timezone) but works with clients globally and can accommodate different time zones for meetings and communications.",
    "remote work": "Emmy works remotely with clients worldwide, using various communication tools to ensure smooth collaboration regardless of location.",
    "meeting": "Emmy conducts project meetings via video calls or phone calls, depending on client preference. He's flexible with scheduling to accommodate different time zones.",
    
    // About the Chatbot
    "who made you": "I was created by Emmy to help answer questions about his services and experience. I'm just a simple chatbot, but I'm here to help you learn more about Emmy!",
    "are you real": "I'm a virtual assistant created by Emmy to help answer questions about his services. While I'm not a real person, I'm designed to provide helpful information about Emmy and his work.",
    "are you human": "No, I'm not a human. I'm Bella, a virtual assistant created by Emmy to help answer questions about his services and experience.",
    "what are you": "I'm Bella, a virtual assistant created by Emmy to help visitors learn more about him and his services. I can answer questions about Emmy's skills, experience, and work.",
    "your name": "My name is Bella! I'm Emmy's virtual assistant.",
    "bella": "Yes, that's me! I'm Bella, Emmy's virtual assistant. How can I help you today?",
    
    // FAQs
    "faq": "Some common questions about Emmy include inquiries about his skills, experience, services, and how to get in touch. Feel free to ask me anything specific!",
    "testimonials": "Check out the testimonials section on the website to see what Emmy's clients have to say about working with him.",
    "guarantee": "Emmy stands behind his work and is committed to client satisfaction. He works closely with clients throughout the project to ensure the final product meets their expectations.",
    "support": "Emmy provides support for his projects as specified in the project agreement. For ongoing support, he offers maintenance packages to keep your website running smoothly.",
    "hosting": "Emmy can provide recommendations for hosting services based on your specific needs, or work with your existing hosting provider.",
    "domain": "Emmy can help you select and register a domain name for your website if needed.",
    "seo": "Emmy implements SEO best practices in all websites he builds, including proper HTML structure, meta tags, and performance optimization.",
    "accessibility": "Emmy is committed to creating accessible websites that follow WCAG guidelines, ensuring that your site is usable by people with various disabilities.",
    "responsive": "All websites Emmy builds are fully responsive, ensuring they work perfectly on all devices from desktops to smartphones.",
    "cms": "Emmy can build websites with various content management systems, including custom solutions, to make it easy for you to update your content.",
    
    // Irrelevant question detection
    "irrelevant": "I'm only trained to answer questions about Emmy and enhance your experience on this site. I can't answer that question, sorry. Feel free to ask me anything about Emmy, his services, or his work!",
    
    // Additional common questions
    "website speed": "Emmy prioritizes website performance and optimizes all sites for fast loading speeds, which improves user experience and SEO rankings.",
    "security": "Emmy implements security best practices in all websites he builds, including secure authentication methods, data encryption, and protection against common vulnerabilities.",
    "training": "Emmy can provide basic training on how to use and update your website after it's completed.",
    "maintenance plan": "Emmy offers website maintenance plans to keep your site updated, secure, and running smoothly. Contact him for specific maintenance package details.",
    "contract": "Emmy works with a simple but comprehensive contract that outlines the project scope, timeline, deliverables, and payment terms to ensure clarity for both parties.",
    "changes": "Emmy understands that requirements can evolve. Minor changes can usually be accommodated within the project scope, while significant changes may require adjustments to the timeline and budget.",
    "portfolio examples": "You can find examples of Emmy's work in the 'Works' section of this website. Each project showcases his skills in development and design.",
    "turnaround time": "Turnaround time depends on project complexity. Simple websites might take 2-4 weeks, while more complex applications can take several months to complete properly.",
    "project management": "Emmy uses efficient project management tools to track progress and maintain clear communication throughout the development process.",
    "tech stack": "Emmy primarily works with React, Next.js, Node.js, and modern CSS solutions like Tailwind. The specific tech stack is chosen based on project requirements.",
    "integrations": "Emmy can integrate various third-party services into your website, such as payment processors, CRM systems, email marketing tools, and social media platforms.",
    "e-commerce": "Emmy has experience building e-commerce solutions with platforms like Shopify, WooCommerce, or custom solutions depending on your specific needs.",
    "analytics": "Emmy can set up analytics for your website to help you track user behavior, conversion rates, and other important metrics.",
    "mobile app": "While Emmy specializes in web development, he can create progressive web apps (PWAs) that provide app-like experiences on mobile devices.",
    "ongoing relationship": "Emmy values long-term relationships with clients and is available for future updates, expansions, or new projects after the initial work is completed.",

    // Technical Skills - Specific technologies
    "next.js": "Emmy is proficient with Next.js, using it to build SEO-friendly, performant React applications with server-side rendering capabilities.",
    "tailwind": "Emmy uses Tailwind CSS as his preferred styling framework for creating custom, responsive designs efficiently.",
    "styled components": "Emmy has experience with Styled Components for creating component-based styling solutions in React applications.",
    "firebase": "Emmy has integrated Firebase services into many projects, utilizing authentication, real-time database, storage, and hosting features.",
    "mongodb": "Emmy has built applications with MongoDB as the database, leveraging its flexibility for document-based data storage.",
    "postgresql": "Emmy works with PostgreSQL for projects requiring relational database capabilities and complex data relationships.",
    "graphql": "Emmy has experience implementing GraphQL APIs to provide efficient, flexible data fetching in web applications.",
    "rest api": "Emmy designs and consumes RESTful APIs, ensuring proper resource management and HTTP method implementation.",
    "animation": "Emmy creates smooth, engaging animations using CSS, React Spring, Framer Motion, and other animation libraries.",
    "sass": "Emmy uses Sass to write more maintainable and organized CSS with variables, mixins, and nested rules.",
    "jamstack": "Emmy builds websites using the Jamstack architecture for better performance, security, and developer experience.",
    "pwa": "Emmy can transform your web application into a Progressive Web App (PWA) for improved mobile experience and offline functionality.",
    "webpack": "Emmy is familiar with Webpack configuration for optimizing application bundles and improving load times.",
    "git": "Emmy uses Git for version control, ensuring organized collaboration and code history management.",
    "testing": "Emmy implements testing using Jest, React Testing Library, and Cypress to ensure application reliability and stability.",
    "deployment": "Emmy has experience deploying applications to various platforms including Vercel, Netlify, Heroku, and AWS.",

    // Project Types
    "e-commerce development": "Emmy builds custom e-commerce solutions with features like product catalogs, shopping carts, secure checkout, and inventory management.",
    "saas application": "Emmy has experience developing Software-as-a-Service (SaaS) applications with subscription models and multi-tenant architectures.",
    "landing page": "Emmy creates high-converting landing pages focused on clear messaging, strong calls-to-action, and optimized user flows.",
    "blog platform": "Emmy can build custom blog platforms with content management systems, categorization, and SEO optimization.",
    "portfolio site": "Emmy designs and develops portfolio websites that showcase work beautifully across all devices.",
    "membership site": "Emmy builds membership sites with secure authentication, role-based access control, and subscription management.",
    "web application": "Emmy develops web applications with complex functionality, data management, and interactive user interfaces.",
    "dashboard": "Emmy creates intuitive admin dashboards and data visualization interfaces for businesses to monitor and manage their operations.",
    "progressive web app": "Emmy builds Progressive Web Apps that provide app-like experiences with offline functionality and home screen installation.",
    "single page application": "Emmy develops Single Page Applications (SPAs) that provide smooth, app-like user experiences without page reloads.",

    // Client Support
    "post-launch support": "Emmy offers post-launch support packages to ensure your website continues to run smoothly after going live.",
    "website updates": "Emmy can provide regular website updates to keep your content fresh and your technology secure.",
    "performance optimization": "Emmy offers performance optimization services to improve your website's loading speed and overall user experience.",
    "emergency fixes": "Emmy provides emergency support for critical issues that might affect your website's functionality.",
    "training sessions": "Emmy offers training sessions to help you and your team learn how to manage and update your website effectively.",
    "content updates": "Emmy can help with regular content updates to keep your website fresh and engaging.",
    "analytics review": "Emmy provides analytics review services to help you understand your website traffic and user behavior.",
    "technology migration": "Emmy can help migrate your website to newer technologies for improved performance and features.",
    "backup solutions": "Emmy implements reliable backup solutions to ensure your website data is safe and recoverable.",

    // SEO & Marketing
    "seo practices": "Emmy implements SEO best practices in all websites, including proper HTML structure, meta tags, schema markup, and performance optimization.",
    "meta tags": "Emmy ensures all pages have appropriate meta tags for better search engine visibility and social media sharing.",
    "schema markup": "Emmy implements schema markup to help search engines better understand your content and improve rich snippets in search results.",
    "sitemap": "Emmy creates and submits XML sitemaps to search engines to ensure all your content is properly indexed.",
    "analytics implementation": "Emmy can set up Google Analytics or other analytics platforms to track visitor behavior and conversion metrics.",
    "conversion optimization": "Emmy can optimize your website for better conversion rates through improved user flows and call-to-action placement.",
    "local seo": "Emmy implements local SEO strategies for businesses that serve specific geographic areas.",
    "mobile optimization": "Emmy ensures all websites are fully optimized for mobile devices, which is critical for SEO rankings.",
    "page speed": "Emmy optimizes websites for fast loading times, which improves both user experience and search engine rankings.",

    // Accessibility
    "wcag compliance": "Emmy follows Web Content Accessibility Guidelines (WCAG) to ensure websites are accessible to people with disabilities.",
    "screen reader compatibility": "Emmy tests websites with screen readers to ensure they're usable by people with visual impairments.",
    "keyboard navigation": "Emmy ensures all websites can be fully navigated using only a keyboard for users who can't use a mouse.",
    "color contrast": "Emmy uses appropriate color contrast ratios to ensure content is readable by people with visual impairments.",
    "alt text": "Emmy adds descriptive alt text to all images to make them accessible to screen readers and improve SEO.",
    "aria labels": "Emmy implements ARIA attributes to improve accessibility for dynamic content and complex UI components.",
    "accessible forms": "Emmy creates forms with proper labels, error handling, and keyboard accessibility for all users.",
    "semantic html": "Emmy uses semantic HTML elements to improve accessibility, SEO, and code clarity.",
    "accessibility testing": "Emmy performs accessibility audits using tools like Lighthouse and WAVE to identify and fix potential issues.",

    // Project Management
    "project timeline": "Emmy provides detailed project timelines with milestones to keep everyone aligned on expectations and progress.",
    "communication tools": "Emmy uses various communication tools like Slack, Email, or your preferred platform to maintain clear, regular updates.",
    "milestone approvals": "Emmy works with a milestone approval process to ensure clients are satisfied at each stage before moving forward.",
    "progress updates": "Emmy provides regular progress updates throughout the development process to keep clients informed.",
    "requirements gathering": "Emmy begins each project with a thorough requirements gathering process to fully understand your needs and goals.",
    "user stories": "Emmy works with user stories to ensure the website meets the actual needs of the intended audience.",
    "wireframing process": "Emmy creates wireframes early in the project to establish layout and functionality before detailed design work begins.",
    "design approval": "Emmy works collaboratively on designs, seeking client approval before moving to development phases.",
    "testing phase": "Emmy includes a comprehensive testing phase to ensure all features work correctly across different devices and browsers.",
    "launch checklist": "Emmy uses a detailed launch checklist to ensure everything is ready before taking a website live.",

    // Industry-Specific Expertise
    "startup websites": "Emmy has extensive experience working with startups to create websites that communicate their vision and value proposition clearly.",
    "small business sites": "Emmy creates effective, affordable websites for small businesses that drive customer engagement and growth.",
    "educational platforms": "Emmy builds educational websites and learning management systems with content delivery and student engagement features.",
    "nonprofit websites": "Emmy helps nonprofits create impactful websites that communicate their mission and facilitate donations.",
    "healthcare websites": "Emmy creates healthcare websites with a focus on accessibility, clear information architecture, and patient resources.",
    "professional services": "Emmy designs websites for professional service providers that build trust and generate leads.",
    "real estate websites": "Emmy builds real estate websites with property listings, search functionality, and lead generation features.",
    "creative portfolios": "Emmy creates stunning portfolio websites for creative professionals that showcase their work effectively.",
    "tech startup sites": "Emmy understands the unique needs of tech startups and creates websites that communicate complex products simply.",

    // Technical Questions
    "browser compatibility": "Emmy tests all websites across major browsers (Chrome, Firefox, Safari, Edge) to ensure consistent functionality.",
    "mobile responsiveness": "Emmy designs websites to be fully responsive, adapting seamlessly to all screen sizes from mobile to desktop.",
    "content management": "Emmy can build your site with user-friendly content management capabilities so you can update content easily.",
    "load times": "Emmy optimizes websites for fast loading times through code optimization, image compression, and caching strategies.",
    "database design": "Emmy creates efficient database structures tailored to your specific data requirements and access patterns.",
    "api integrations": "Emmy can integrate your website with various third-party APIs and services to extend its functionality.",
    "payment processing": "Emmy implements secure payment processing with providers like Stripe, PayPal, or your preferred gateway.",
    "form handling": "Emmy builds secure, user-friendly forms with validation and protection against spam and abuse.",
    "authentication systems": "Emmy implements secure user authentication systems using industry best practices.",
    "data encryption": "Emmy ensures sensitive data is properly encrypted both in transit and at rest.",
    "cdn setup": "Emmy configures Content Delivery Networks (CDNs) to improve website performance globally.",
    "caching strategies": "Emmy implements appropriate caching strategies to improve website performance and reduce server load.",

    // Client Relationships
    "communication frequency": "Emmy maintains regular communication throughout projects, with update frequency tailored to client preferences.",
    "feedback process": "Emmy welcomes feedback throughout the development process and makes adjustments to ensure client satisfaction.",
    "revision policy": "Emmy's projects typically include a specified number of revision rounds, with additional revisions available as needed.",
    "long-term relationships": "Emmy values building long-term relationships with clients, providing ongoing support and evolving their digital presence over time.",
    "referral program": "Emmy appreciates referrals and offers benefits for clients who refer new business.",
    "project handover": "Emmy provides comprehensive documentation and training during project handover to ensure clients can manage their websites confidently.",
    "knowledge transfer": "Emmy ensures clients understand how their websites work and how to maintain them through documentation and training.",

    // Contact and Booking
    "book meeting": "To book a meeting with Emmy, please use the contact form on this website or email him directly at eayeni185@gmail.com.",
    "consultation": "Emmy offers free initial consultations to discuss your project needs and how he can help.",
    "discovery call": "Emmy begins with a discovery call to understand your business goals and how a new website or application can support them.",
    "project inquiry": "To inquire about a project, please provide details about your goals, timeline, and budget through the contact form.",
    "response time": "Emmy typically responds to inquiries within 1-2 business days.",
    "start date": "Project start dates depend on Emmy's current schedule. Contact him to discuss your timeline needs.",
    "urgent project": "For urgent projects, please mention the timeline in your inquiry and Emmy will let you know if he can accommodate it.",

    // Common Questions About Working Together
    "revision rounds": "Emmy typically includes 2-3 rounds of revisions in project quotes to ensure your satisfaction with the final product.",
    "content creation": "Emmy focuses on design and development but can recommend content creators if you need help with website copy or images.",
    "photography": "Emmy doesn't provide photography services but can recommend photographers or help you source stock images for your website.",
    "copywriting": "Emmy doesn't provide copywriting services but can recommend copywriters who can help create effective website content.",
    "logo creation": "Emmy offers logo design services as part of his brand identity packages or as a standalone service.",
    "hosting recommendations": "Emmy can recommend hosting providers based on your website's specific needs and budget.",
    "domain purchase": "Emmy can help you purchase and set up your domain name if you don't already have one.",
    "maintenance costs": "Website maintenance costs depend on your specific needs. Emmy offers various maintenance packages to keep your site updated and secure.",
    "contract terms": "Emmy works with a straightforward contract that outlines project scope, timeline, deliverables, payment terms, and ownership rights.",
    "deposit requirement": "Emmy typically requires a 50% deposit to secure your spot in his schedule, with the remaining balance due upon project completion.",
    "payment plans": "Emmy can work with payment plans for larger projects, typically tied to project milestones.",
    "project cancellation": "If you need to cancel a project, Emmy's contract includes provisions for cancellation fees based on work completed.",

    // Personal Brand and Design Philosophy
    "design philosophy": "Emmy believes in creating designs that are not only visually appealing but also functional, accessible, and aligned with business goals.",
    "minimalist design": "Emmy often employs minimalist design principles, focusing on clean layouts, purposeful whitespace, and clear typography.",
    "design process": "Emmy's design process begins with research and understanding user needs, followed by wireframing, visual design, client feedback, and refinement.",
    "color theory": "Emmy applies color theory principles to create harmonious color schemes that reinforce brand identity and guide user attention.",
    "typography choices": "Emmy selects typography that balances readability with brand personality, ensuring text is both functional and expressive.",
    "visual hierarchy": "Emmy creates clear visual hierarchies that guide users through content in order of importance.",
    "user-centered design": "Emmy follows user-centered design principles, ensuring websites are intuitive and meet the needs of their intended audience.",
    "brand consistency": "Emmy ensures consistent application of brand elements across all touchpoints for a cohesive user experience.",

    // Additional Conversational Responses
    "thank you": "You're welcome! I'm happy to help. Is there anything else you'd like to know about Emmy or his services?",
    "thanks": "You're welcome! If you have any other questions about Emmy, feel free to ask.",
    "bye": "Thanks for chatting! If you'd like to get in touch with Emmy, you can use the contact form or email him at eayeni185@gmail.com. Have a great day!",
    "goodbye": "Thanks for chatting! Feel free to return if you have more questions about Emmy. Have a great day!",
    "talk later": "Sounds good! I'll be here if you have more questions about Emmy. Have a great day!",
    "help": "I can help answer questions about Emmy, his skills, services, process, and more. What would you like to know?",
    "options": "You can ask me about Emmy's skills, experience, services, process, portfolio, pricing, or anything else related to his work as a web developer and designer.",
    "what can you do": "I can answer questions about Emmy, his web development and design services, his skills, experience, process, and more. What would you like to know?",
    "are you smart": "I'm designed to be helpful and informative about Emmy and his services. While I can't match human intelligence, I can answer many questions about Emmy's work as a web developer and designer.",
    "hello there": "Hello! I'm Bella, Emmy's virtual assistant. How can I help you learn more about Emmy and his services today?",
    "tell me more": "I'd be happy to tell you more about Emmy! Is there a specific aspect of his work, skills, or services you're interested in learning about?",
    "can you help": "Yes, I'd be happy to help! I can answer questions about Emmy's web development and design services, his experience, process, and more. What would you like to know?",
  
    "code quality": "Emmy prioritizes clean, maintainable code with proper documentation and follows industry best practices for code quality.",
    "version control": "Emmy uses Git for version control, allowing for collaborative development and a complete history of changes.",
    "responsive design approach": "Emmy uses a mobile-first approach to responsive design, ensuring websites work perfectly on all devices.",
    "cross-browser testing": "Emmy thoroughly tests all websites across major browsers to ensure consistent functionality and appearance.",
    "performance testing": "Emmy conducts performance testing using tools like Lighthouse to optimize loading times and user experience.",
    "security practices": "Emmy follows security best practices including input validation, secure authentication, and protection against common vulnerabilities.",
    "code reviews": "Emmy welcomes code reviews and can work with your technical team to ensure code quality meets your standards.",
    "technical documentation": "Emmy provides technical documentation for all projects to facilitate future maintenance and updates.",
    "agile methodology": "Emmy can work with agile methodologies, adapting to changing requirements throughout the development process.",
    "sprint planning": "For larger projects, Emmy can work with sprint-based development cycles to deliver value incrementally.",
  
  };

  // List of inappropriate or offensive terms to check for
  const inappropriateTerms = [
    "fuck", "shit", "asshole", "bitch", "bastard", "cunt", "dick", "pussy", "cock", "whore",
    "slut", "damn", "hell", "piss", "crap", "nigga", "nigger", "faggot", "retard", "twat",
    "wanker", "bollocks", "bullshit", "fag", "dyke", "jerk", "idiot", "stupid", "dumb", "moron"
  ];

  // List of irrelevant topics that the bot shouldn't answer
  const irrelevantTopics = [
    "politics", "religion", "sex", "dating", "gambling", "betting", "stocks", "crypto",
    "bitcoin", "weather", "sports", "game", "play", "movie", "film", "tv", "show", "actor",
    "actress", "singer", "music", "song", "artist", "celebrity", "news", "vaccine", "covid",
    "pandemic", "election", "vote", "president", "democracy", "republican", "democrat", 
    "travel", "hotel", "flight", "vacation", "holiday", "recipe", "cook", "food", "restaurant",
    "diet", "workout", "exercise", "weight loss", "drug", "medication", "medical", "health",
    "disease", "symptom", "diagnosis", "treatment", "therapy", "doctor", "hospital",
    "investment", "mortgage", "loan", "insurance", "bank", "finance", "money", "business advice"
  ];

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Check for inappropriate language
    const lowerCaseInput = input.toLowerCase();
    const containsInappropriate = inappropriateTerms.some(term => 
      lowerCaseInput.includes(term)
    );
    
    // Check for irrelevant topics
    const containsIrrelevant = irrelevantTopics.some(topic => 
      lowerCaseInput.includes(topic)
    );
    
    setTimeout(() => {
      let botResponse = "I don't have information about that yet. You can contact Emmy directly for more details!";
      
      // Handle inappropriate language
      if (containsInappropriate) {
        botResponse = "I'm here to provide information about Emmy in a respectful manner. Please feel free to ask me something about Emmy's work or services.";
      }
      // Handle irrelevant topics
      else if (containsIrrelevant) {
        botResponse = knowledgeBase["irrelevant"];
      }
      // Check for matches in knowledge base (case insensitive)
      else {
        const userQuestion = lowerCaseInput;
        
        // Sort entries by key length (descending) to match more specific phrases first
        const sortedEntries = Object.entries(knowledgeBase).sort((a, b) => b[0].length - a[0].length);
        
        for (const [key, value] of sortedEntries) {
          if (userQuestion.includes(key)) {
            botResponse = value;
            break;
          }
        }
        
        // If no direct match, look for partial matches or similar questions
        if (botResponse === "I don't have information about that yet. You can contact Emmy directly for more details!") {
          // Look for similar keywords in the question
          const keywords = userQuestion.split(" ").filter(word => word.length > 3);
          
          for (const keyword of keywords) {
            for (const [key, value] of sortedEntries) {
              if (key.includes(keyword)) {
                botResponse = value;
                break;
              }
            }
            if (botResponse !== "I don't have information about that yet. You can contact Emmy directly for more details!") {
              break;
            }
          }
        }
      }
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-3 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="p-4 bg-indigo-600 text-white rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">Bella</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-xs">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask something about Emmy..."
                className="flex-1 p-2 border text-xs border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-700"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;