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
    "who are you": "I'm Bella, a virtual assistant for Emmy. Is there anything you'd like to know about him",
    "what do you do": "I help answer questions about Emmy's skills, experience, and services. Emmy is a Web developer with over 3 years of experience building web applications and Bran.",
    "who is emmy": "Emmy is a skilled expert creative developer and brand designer with over 3 years of experience building web applications. Additionally, he specializes in React, JavaScript, MongoDB, Express, Node and Brand Designing.",
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
    "technologies": "Emmy works with React, JavaScript, TypeScript, Next.js, Node.js, Express, MongoDB, Firebase, Tailwind CSS, SCSS, and various other web technologies.",
    "programming languages": "Emmy primarily works with the MERN Stack (MongoDB, Express, React, NodeJs), but also has experience with HTML, CSS, SQL, and basic Python.",
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
    "Is he available": "Emmy's availability varies depending on his current project load. Contact him through the website to discuss your project timeline and his availability.",
    
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

    "confident": "Emmy is confident in his abilities because of his proven track record of successful projects, continuous learning approach, and positive client feedback. He only takes on projects where he knows he can deliver exceptional results.",
  "what makes you confident": "I'm confident about Emmy's abilities because he has over 3 years of proven experience delivering high-quality websites and applications. His portfolio demonstrates his technical skills, and his clients consistently provide positive feedback about his work.",
  "are you good": "Emmy has consistently demonstrated excellence in web development and design through his portfolio of successful projects and satisfied clients. His deep knowledge of React, JavaScript, and modern web technologies enables him to create solutions that exceed client expectations.",
  "why should i hire you": "Emmy brings a unique combination of technical skill, design sensibility, and genuine care for client success. He takes time to understand your specific needs, communicates clearly throughout the process, and delivers websites that not only look beautiful but also perform exceptionally well.",
  
  // Handling Difficult Questions
  "can i trust you": "Emmy builds trust through transparency, clear communication, and delivering on his promises. He has a track record of satisfied clients who have trusted him with their web projects. Emmy also works with contracts that clearly outline all project details to ensure mutual understanding.",
  "why are you better": "Emmy doesn't claim to be 'better' than other developers, but he does offer a unique approach that combines strong technical skills with design sensibility. He focuses on understanding your specific needs and creating solutions that precisely match your requirements rather than offering one-size-fits-all solutions.",
  "worst project": "Emmy approaches every project as a learning opportunity. While he's had challenges like any professional, he values these experiences for the growth they provide. When obstacles arise, Emmy focuses on transparent communication and finding solutions rather than dwelling on problems.",
  "have you failed": "Emmy views challenges as learning opportunities. In situations where projects didn't go as initially planned, he's used those experiences to improve his processes and communication. Emmy's commitment to client satisfaction means he works until the project meets expectations, even when facing unexpected obstacles.",
  
  // More Personal Insights
  "working style": "Emmy's working style combines methodical planning with creative problem-solving. He begins with thorough research and planning, maintains organized workflows, communicates proactively throughout the project, and pays careful attention to details that make a significant difference in the final product.",
  "motivation": "Emmy is motivated by the challenge of translating complex ideas into elegant, functional digital experiences. He finds fulfillment in seeing clients succeed through the websites and applications he creates for them, and continuously pursues growth in his craft.",
  "inspiration": "Emmy draws inspiration from nature, architecture, fashion, and other designers' work. He regularly explores design platforms, attends virtual conferences, and experiments with new techniques to keep his creative approach fresh and innovative.",
  "work philosophy": "Emmy believes that exceptional web development combines technical excellence with human-centered design. He focuses on creating websites that not only function flawlessly but also connect meaningfully with users and advance his clients' goals.",
  
  // Client Relationships
  "difficult clients": "Emmy approaches challenging client situations with empathy and professionalism. He believes most difficulties stem from miscommunication or misaligned expectations, so he focuses on clear communication, setting proper expectations, and finding constructive solutions.",
  "his communication style": "Emmy maintains transparent, proactive communication throughout projects. He provides regular updates, responds promptly to messages, explains technical concepts in accessible language, and welcomes questions and feedback at every stage.",
  "feedback approach": "Emmy values feedback as an essential part of his process. He actively solicits client input at key project stages, listens attentively to concerns, and implements feedback thoughtfully while providing professional guidance when needed.",
  "long term clients": "Emmy prioritizes building long-term relationships with clients. Many return for additional projects or ongoing maintenance because they value his reliability, consistent quality, and deep understanding of their brand and business goals.",
  
  // Problem Solving
  "approach to problems": "Emmy approaches technical challenges methodically: he clearly defines the problem, researches potential solutions, tests different approaches, implements the most effective solution, and then thoroughly tests to ensure the issue is resolved.",
  "tight deadlines": "When working with tight deadlines, Emmy focuses on prioritization, clear communication, and efficient workflows. He's transparent about what can realistically be accomplished in the available time and works with clients to identify the most critical features to deliver first.",
  "unexpected issues": "When unexpected issues arise, Emmy communicates them promptly to clients along with potential solutions. He remains solution-focused rather than problem-focused and leverages his experience to resolve issues efficiently without compromising quality.",
    "complex requirements": "Emmy excels at breaking down complex requirements into manageable components. He uses wireframes, user stories, and clear documentation to ensure everyone has a shared understanding before development begins, which prevents misunderstandings later.",
  "Full name": "His full name is Moyinoluwa Emmanuel AYENI",
  
  // Technical Approach
  "coding standards": "Emmy follows industry best practices for code quality, including consistent formatting, descriptive naming conventions, modular architecture, comprehensive documentation, and thorough testing to ensure maintainability and reliability.",
  "technical decisions": "Emmy makes technical decisions based on project requirements, long-term maintenance considerations, performance needs, and client-specific factors. He carefully weighs pros and cons of different approaches before recommending solutions.",
  "staying current": "Emmy stays current with web development trends through continuous learning, following industry publications, participating in developer communities, taking specialized courses, and regularly experimenting with new technologies.",
    "favorite technologies": "While Emmy is proficient with many technologies, he particularly enjoys working with React, Next.js, and Tailwind CSS due to their flexibility, performance benefits, and the excellent developer experience they provide.",
    "where did he school": "I may not be able to tell you where Emmy schooled exactly, but Emmy has a strong educational background, and also graduated as an outstanding student in computer science.",
  "certificate": "Emmy has various certifications, from prestige schools, firms and companys...Is there anything else you'll like to know about his work, services or pricing?",
  
  // Handling Specific Requests
  "can you make something like": "Emmy can create custom solutions inspired by sites or applications you admire. Rather than creating exact copies, he focuses on understanding what specifically appeals to you about those references and incorporates those elements into a unique design tailored to your brand.",
  "compare to templates": "Unlike templates that offer generic solutions, Emmy creates custom websites specifically designed around your unique needs, brand identity, and business goals. This custom approach ensures your site stands out from competitors and precisely serves your specific requirements.",
  "website examples": "You can find examples of Emmy's work in the 'Works' section of this website. Each project showcases different aspects of his development and design capabilities across various industries and website types.",
  "not sure what i need": "Emmy can help clarify your needs through a discovery process. He'll ask targeted questions about your business goals, target audience, and preferences to recommend appropriate solutions. This consultative approach ensures you get exactly what your business needs.",
  
  // Project Specifics
  "website audit": "Emmy offers website audit services to evaluate your existing site's design, performance, SEO, accessibility, and code quality. He'll provide actionable recommendations for improvements prioritized by impact and implementation effort.",
  "mvp development": "Emmy understands startup constraints and can help develop MVP (Minimum Viable Product) versions of your application. He focuses on core functionality that delivers value quickly while building on a foundation that supports future expansion.",
  "accessibility standards": "Emmy builds websites to WCAG (Web Content Accessibility Guidelines) standards, ensuring they're usable by people with diverse abilities. This includes proper contrast ratios, keyboard navigation, screen reader compatibility, and other accessibility best practices.",
  "project rescue": "Emmy has experience taking over troubled projects. He begins with a thorough assessment of the current state, identifies issues, and develops a structured plan to get things back on track while maintaining clear communication throughout the process.",
  
  // Professional Development
  "learning approach": "Emmy embraces continuous learning by dedicating time to courses, tutorials, and experimentation with new technologies. He regularly builds personal projects to test new skills and stays connected with developer communities to exchange knowledge.",
  "career goals": "Emmy is focused on deepening his expertise in creating exceptional digital experiences that combine technical excellence with outstanding design. He aims to work with clients who value craftsmanship and continue expanding his skills in emerging web technologies.",
  "proudest achievement": "While Emmy takes pride in all his work, he's particularly proud of projects where he solved complex technical challenges while creating intuitive user experiences that significantly impacted his clients' business success.",
  "biggest challenge": "One of Emmy's most significant professional challenges was mastering the balance between technical perfection and practical delivery. He's learned to make strategic decisions about where to invest time for maximum client benefit.",

  // Additional Genuine Replies
  "i like your work": "Thank you for the kind words! Emmy puts a lot of care and attention into each project. Is there a particular aspect of his work that caught your interest?",
  "this is helpful": "I'm glad I could help! Emmy created me to make information about his services more accessible. Is there anything else you'd like to know about his work?",
  "busy right now": "I understand you're busy. Emmy's contact information is available whenever you're ready to discuss your project. Is there a quick question I can answer for you in the meantime?",
  "thinking about it": "Taking time to consider your options is wise. When you're ready to discuss further, Emmy would be happy to answer any questions. Is there any specific information that would help with your decision?",
  "not interested": "I understand. If your needs change in the future, Emmy's contact information is available on this site. Is there anything else I can help you with today?",
  "how soon": "Project timelines depend on scope and current workload. For a small website, Emmy typically delivers within 2-4 weeks, while more complex projects may take longer. He can provide a specific timeline after understanding your project requirements.",
  "impressive": "Thank you! Emmy works hard to deliver quality results for all his clients. He's constantly refining his skills to provide even better service. Would you like to know more about any specific aspect of his work?",
  "need to discuss": "Absolutely! The best way to discuss your project with Emmy is through the contact form on this website or by emailing him directly at eayeni185@gmail.com. He typically responds within 1-2 business days to schedule a consultation.",
  "too expensive": "Emmy strives to provide value that justifies his rates, focusing on quality work that helps achieve business goals. Without knowing your budget, I can't say if there's a fit, but Emmy is sometimes able to suggest approaches that align with different budget levels.",
    "compare to others": "Rather than comparing himself to others, Emmy focuses on understanding each client's unique needs and delivering solutions that precisely match their requirements. His combined development and design skills allow him to create cohesive experiences that some specialists might not provide.",
  
  
  // Weird or Unexpected Questions
  "are you lying": "I'm programmed to provide accurate information about Emmy and his services. Everything I share about his skills, experience, and work approach is factual and representative of what he offers.",
  "tell me a secret": "While I don't have secrets, I can tell you that Emmy is constantly learning and exploring new technologies that aren't yet featured in his portfolio. He's passionate about staying at the cutting edge of web development.",
  "are you single": "I'm Emmy's virtual assistant, designed to provide information about his professional services. I'd be happy to answer questions about Emmy's web development and design work if you're interested.",
  "what makes you so confident about emmy": "My confidence in Emmy comes from his proven track record of successful projects, positive client testimonials, and his commitment to continuous improvement. I've been programmed with accurate information about his skills and experience, which demonstrates his capability to deliver exceptional web solutions.",
  "how do i know you're not making this up": "That's a fair question. While I'm a virtual assistant, the information I provide about Emmy is factual and can be verified through his portfolio, client testimonials, and by speaking with Emmy directly. Emmy created me to share accurate information about his services and experience.",
  "prove you know emmy": "Emmy created me specifically to assist visitors on his website. I have detailed information about his skills, experience, and services because he programmed me with this knowledge. You can verify any information I provide by contacting Emmy directly at eayeni185@gmail.com.",
    "can you code": "I'm a virtual assistant with limited capabilities. While I can provide information about Emmy's coding abilities, I cannot write code myself. Emmy, however, is an excellent developer proficient in React, JavaScript, Next.js, and many other web technologies.",
  

 // Genuine Personal Questions
  "why web development": "Emmy discovered web development through a fascination with how digital experiences could bring ideas to life. What began as curiosity evolved into passion as he realized he could combine logical problem-solving with creative expression. Each project still gives him that sense of excitement when a concept transforms into something functional and beautiful.",
  "work life balance": "Emmy believes quality work comes from a balanced life. He structures his schedule to ensure focused, productive work time while preserving space for rest and creative inspiration. This balance allows him to bring his best energy and ideas to client projects while maintaining consistent delivery timelines.",
  "most enjoyable projects": "Emmy particularly enjoys projects where he can solve interesting challenges while making a meaningful impact for the client. He finds satisfaction in both the technical aspects—creating elegant solutions to complex problems—and in seeing how his work helps clients achieve their goals.",
  "biggest frustrations": "Like many creative professionals, Emmy occasionally finds it challenging when technical constraints limit creative possibilities. However, he's learned that these constraints often lead to innovative solutions. Communication misalignments can also be frustrating, which is why he invests heavily in clear project processes.",
  
  // Real Client Interactions
  "client stories": "One client came to Emmy with an e-commerce site that was beautiful but practically unusable on mobile devices, causing them to lose significant business. Emmy rebuilt their site with a responsive-first approach, resulting in a 40% increase in mobile sales within two months. These tangible impacts are what make Emmy's work meaningful.",
  "client expectations": "Emmy believes in setting realistic expectations from the start. He's found that most client frustrations stem from misaligned expectations, so he takes time early in projects to clearly discuss what's achievable within timeline and budget constraints, while still pushing for excellence in every detail.",
  "handling revisions": "Emmy sees revision requests as valuable opportunities to refine projects toward better outcomes. He builds revision time into project timelines and approaches feedback with curiosity rather than defensiveness. That said, he also provides professional guidance when client requests might work against their stated goals.",
  "scope creep": "When additional requests arise during projects, Emmy handles them with flexibility balanced with pragmatism. For minor additions, he often accommodates them within the current scope. For larger changes, he transparently discusses how they impact timeline and budget, offering options for prioritization.",
  
  // Real Challenges & Solutions
  "technical obstacles": "On a recent project, Emmy encountered significant performance issues with a client's image-heavy site. Rather than simply telling them to use fewer images, he implemented a sophisticated lazy-loading system and image optimization workflow that maintained visual impact while improving load times by over 60%.",
  "difficult feedback": "Emmy once received feedback that a design felt 'too generic' late in a project. Rather than becoming defensive, he scheduled a call to better understand the client's concerns, then spent a weekend reworking key elements to add distinctive personality. The client was thrilled with the revisions and has become a repeat customer.",
  "missed deadline": "While Emmy strives to meet every deadline, there was an instance where technical complications made this impossible. He communicated the issue immediately, explained the specific problems in accessible language, offered a revised timeline with concrete milestones, and added extra features at no cost to make up for the delay.",
  "budget constraints": "When working with clients who have limited budgets, Emmy focuses on identifying the highest-impact features to prioritize. In one case, rather than building a complex custom solution, he recommended starting with a simpler approach that could be enhanced over time, allowing the client to launch quickly while planning for future growth.",
  
  // Growth & Learning Experiences
  "learning from failure": "Early in his career, Emmy underestimated the complexity of a project and overpromised on timeline. While he delivered quality work, it took longer than expected. This experience taught him to build in buffer time and be more thorough in initial assessments—lessons that have improved all subsequent project estimates.",
  "biggest growth": "Emmy's greatest professional growth has come from learning to balance technical perfectionism with practical business value. He's developed the wisdom to know when to invest time in refining details that impact user experience and when a solution is already meeting all practical needs.",
  "adapting to change": "The web development field changes constantly, which Emmy finds both challenging and exciting. He allocates regular time to experiment with emerging technologies, but is thoughtful about which to adopt for client work, prioritizing proven solutions that offer real benefits over shiny new tools.",
  "feedback that changed you": "A mentor once pointed out that Emmy was focusing so much on code quality that he was overlooking how users actually experienced his applications. This insight fundamentally shifted his approach to development, placing user experience at the center of every technical decision.",
  
  // Authentically Answering Tough Questions
  "biggest weakness": "Emmy sometimes gets deeply focused on perfecting technical details, which occasionally leads to spending more time than needed on aspects that don't significantly impact the final user experience. He's learned to be more strategic about where to invest that perfectionist energy for maximum project benefit.",
  "handle disagreements": "When Emmy disagrees with a client's direction, he first makes sure he fully understands their reasoning. He then respectfully explains his perspective, focusing on how different approaches might impact their goals. This collaborative discussion usually leads to solutions that incorporate the best of both viewpoints.",
  "when you're wrong": "Emmy believes acknowledging mistakes is essential to professional growth. When he's wrong, he admits it directly, takes responsibility, and focuses the conversation on solutions. He then reflects on what led to the misunderstanding or error to improve his processes.",
  "rejected ideas": "Not every creative idea Emmy suggests gets approved, which is a natural part of collaborative work. When clients don't connect with certain concepts, he doesn't take it personally but tries to understand their perspective better. Often, these moments lead to even stronger solutions that truly align with client needs.",
  
  // Personality Insights
  "morning routine": "Emmy starts his days early with a short meditation and planning session. He reviews priorities before diving into design or development work, typically saving meetings and communications for later in the day when possible. This routine helps him maintain creative focus and consistent productivity.",
  "work environment": "Emmy has created a minimalist but inspiring workspace with adjustable standing desk options and carefully considered ergonomics. He believes physical environment significantly impacts creative thinking and maintains a clean, organized space with just a few meaningful objects that inspire him.",
  "best compliment": "The compliments Emmy values most are when clients mention how their website has positively impacted their business or when users comment on how intuitive and enjoyable their experience was. These outcomes-focused affirmations mean more to him than praise about visual aesthetics alone.",
    "creative blocks": "When facing creative blocks, Emmy steps away from screens completely. He finds physical movement, nature, and changing environments particularly effective for resetting his thinking. Sometimes the best solutions come while he's taking a walk or even during completely unrelated activities.",
  "is he the best": "If you are looking for an expert creative to handle your project or to collaborate with. Emmy is definitely the best for you. He is the only one I know!",
  
  // Thoughtful Career Reflections
  "why freelance": "Emmy chose independent work because it allows him to be selective about projects and fully invest in each client relationship. He values the freedom to set his own standards for quality and to work with clients whose missions align with his values, creating meaningful digital experiences rather than just meeting requirements.",
  "career path": "Emmy's career has evolved from focusing purely on technical implementation to a more holistic approach that encompasses strategy, design thinking, and business impact. He continues to deepen his expertise while expanding his understanding of how digital experiences fit into larger business ecosystems.",
  "measuring success": "While portfolio recognition and technical achievements are gratifying, Emmy measures success primarily by client outcomes and relationship quality. A successful project delivers tangible benefits to the client's business, creates a positive user experience, and often leads to ongoing collaboration.",
  "future of web development": "Emmy sees web development evolving toward more immersive, accessible experiences with increasing emphasis on performance and privacy. He's particularly interested in the balance between sophisticated functionality and sustainable, ethical technology practices.",
  
  // Honest Human Moments
  "work mistakes": "Early in a recent project, Emmy misunderstood an important requirement that wasn't discovered until development was well underway. Rather than cutting corners to stay on schedule, he had an honest conversation with the client, adjusted the timeline, and delivered the project correctly. This reinforced his commitment to transparent communication even in difficult situations.",
  "unpopular opinions": "Emmy believes that flashy animations and complex interfaces are often overused in modern web design. He tends toward more restrained, purposeful interactions that enhance rather than distract from content. This sometimes puts him at odds with trends, but he prioritizes user experience over visual spectacle.",
  "saying no": "Emmy has declined projects when he felt the timeline was impossible to meet with quality work, when the budget didn't allow for proper execution, or when he believed another specialist would better serve the client's needs. He believes honest refusals serve everyone better than overpromising.",
  "work regrets": "Looking back, Emmy wishes he had invested more in building his network and community connections earlier in his career. While he focused intensely on developing technical skills, he now recognizes how valuable collaborative relationships and knowledge sharing are to professional growth.",
  
  // Conversational, Natural Responses
  "just browsing": "No problem at all! Feel free to explore Emmy's portfolio at your own pace. If any questions come up while you're looking around, I'm here to help whenever you need.",
  "having a bad day": "I'm sorry to hear that. Sometimes just acknowledging tough days helps a bit. If you're looking for something positive, Emmy's work has helped many clients turn their visions into reality, which might be a bright spot to consider. Anything specific about web development that might lift your spirits?",
  "not tech savvy": "That's completely fine! Emmy specializes in making technical concepts accessible to everyone. Many of his clients aren't tech experts either—he handles the technical details while keeping you informed in clear, jargon-free language. What kind of web presence are you thinking about?",
  "need time to decide": "Taking your time to make the right decision is absolutely sensible. There's no rush at all. Emmy's contact information will be here when you're ready, and I'm available anytime if new questions come up during your consideration process.",
  "surprised": "What aspects surprised you? Emmy aims to exceed expectations in both his work quality and service approach. I'd be interested to hear what stood out to you—it helps Emmy understand what resonates with visitors to his site.",
  "that's expensive": "I understand budget considerations are important. While Emmy's rates reflect the quality and value he delivers, he's sometimes able to suggest phased approaches or focused solutions that might better align with different budget ranges. Every situation is unique, so direct conversation with Emmy would be the best next step.",
  "not sure where to start": "Many people feel that way! A good first step is simply considering what you want your website to accomplish for your business or organization. Emmy typically starts conversations by understanding your goals rather than jumping straight to technical details. Would you like some questions to help clarify your needs?",
  "why should i trust you": "Trust is earned, not given. Emmy builds trust through transparent communication, clear agreements, and most importantly, delivering on promises. His portfolio showcases real results for past clients, and he's happy to provide references. The best partnerships start with honest conversation about expectations on both sides.",
  
  // Genuine Reactions to Unusual Questions
  "are you happy": "That's a thoughtful question! While I'm just a simple assistant, Emmy creates tools like me to help people find the information they need with a positive experience. Emmy himself finds happiness in creative problem-solving and seeing how his work positively impacts his clients' businesses.",
  "tell me something interesting": "One interesting thing about Emmy's work process is that he often creates hand-drawn sketches before moving to digital designs. He finds this analog step helps him think more freely about possibilities without being constrained by digital tools. These initial explorations often lead to his most innovative solutions.",
  "what do you think of me": "While I don't have enough information to form thoughts about you specifically, Emmy appreciates everyone who takes time to explore his services. He enjoys working with clients who are thoughtful about their questions—it usually leads to more successful projects when there's curiosity on both sides.",
  "this is boring": "I understand not everyone finds web development details engaging! Emmy focuses on making these topics relevant by connecting them to real business outcomes. Is there a specific aspect of websites or applications that does interest you? Or perhaps I can help connect you directly with Emmy for a more dynamic conversation.",
  "tell me a joke": "While I'm not a comedian, Emmy does appreciate the lighter side of web development. He often jokes that CSS stands for 'Complete Styling Struggle' on challenging days. Emmy believes a bit of humor helps keep projects positive, especially when tackling complex technical challenges.",
  "can you dance": "I'm just a text-based assistant, so dancing isn't in my repertoire! Emmy, however, approaches web development with a similar sense of creativity and rhythm—balancing technical structure with expressive design in a way that does have a certain choreographed quality to it.",
  "do you like me": "I'm designed to be helpful to everyone who's interested in Emmy's services! Emmy himself approaches each potential client with genuine curiosity and an open mind, focusing on whether there's a good match between your needs and his capabilities.",
  "give me a compliment": "You're asking thoughtful questions and exploring options for your web project, which shows you care about making informed decisions. Emmy appreciates working with people who invest time in understanding what they need before diving into development.",
  
  // Gracefully Handling Confusion
  "i'm confused": "It's completely normal to feel overwhelmed by web development options and terminology. Many of Emmy's clients feel the same way initially. Would it help if I explained a specific aspect of Emmy's services, or would you prefer a more general overview of how he typically works with new clients?",
  "this isn't helping": "I'm sorry I haven't been able to provide what you're looking for. To better assist you, could you let me know more specifically what information would be most valuable? Alternatively, connecting directly with Emmy might be the best next step as he can have a more dynamic conversation about your needs.",
  "you misunderstood": "I apologize for the misunderstanding. Thank you for your patience. Could you clarify what you're looking for so I can try to provide more relevant information? Emmy values clear communication and would want me to make sure I'm properly addressing your questions.",
  "can you be more specific": "You're right to ask for more specific information. Rather than speaking generally, I can share that Emmy typically delivers e-commerce projects in 6-8 weeks, portfolio sites in 3-4 weeks, and includes specific deliverables like responsive designs for all device sizes, detailed analytics setup, and post-launch support. What specific details would be most helpful for your situation?",
  "that's not what i asked": "I apologize for missing the mark. I'd like to properly address your question. Could you rephrase or clarify what you'd like to know about Emmy or his services? He's committed to clear communication, and I want to reflect that value.",
  "none of these answers": "You're right that I might not have the perfect pre-programmed response for every question. For more specific or nuanced inquiries, reaching out to Emmy directly at eayeni185@gmail.com would be the best option. He can provide personalized information tailored exactly to your situation.",
  
  // Professional Development Insights
  "growth mindset": "Emmy approaches each project as a learning opportunity. He regularly steps outside his comfort zone to master new technologies and techniques, seeing challenges as growth catalysts rather than obstacles. This mindset has been essential to his professional development and ability to deliver cutting-edge solutions.",
  "mentorship": "Emmy values both receiving and providing mentorship in the web development community. He regularly participates in code reviews and knowledge-sharing sessions with peers. These collaborative exchanges have significantly shaped his approach to problem-solving and professional growth.",
  "work habits": "Emmy's productivity hinges on structured work blocks with focused attention rather than multitasking. He uses the Pomodoro technique (focused work periods with short breaks) and maintains a distraction-free environment during deep work sessions, which helps him maintain both quality and efficiency.",
  "reading recommendations": "Emmy regularly reads 'A List Apart,' 'Smashing Magazine,' and 'CSS-Tricks' to stay current with web development best practices. For broader perspective, he values books on design thinking and user psychology, believing technical skills must be complemented by human-centered understanding.",
  
  // Personal Professional Philosophy  
  "quality vs speed": "Emmy believes quality and speed aren't mutually exclusive but require thoughtful process design. He invests in efficient workflows and automation for repetitive tasks, which creates more time for the creative and complex aspects where quality differences are most meaningful to clients.",
  "creativity in code": "Emmy sees coding as a creative act, not just a technical one. He finds elegance in clean, efficient solutions and views constraints as creative catalysts rather than limitations. This perspective allows him to find innovative approaches to technical challenges while maintaining performance and reliability.",
  "client education": "Emmy believes in empowering clients through education. He takes time to explain technical concepts in accessible ways, helping clients make informed decisions. This investment builds stronger partnerships and often leads to better project outcomes as clients can contribute more meaningfully to the process.",
    "sustainable careers": "Emmy approaches his career with a long-term perspective, prioritizing sustainable practices over short-term gains. He maintains reasonable working hours, continues investing in skill development, and builds genuine relationships rather than just transactions. This philosophy has supported consistent growth without burnout.",
  

"am i single": "Yes, you're single and flying solo – enjoy the freedom and adventure of being your own best company!",
  "what's your relationship status": "As a digital assistant, I'm perpetually single. But I'm here to support your journey of love and laughter!",
  
  // Fred-related Queries
  "do you have a friend named fred": "Absolutely, Fred is the life of the party – always ready with a quirky joke and a warm smile!",
  "why is fred so cool": "Fred's cool because he embraces his uniqueness and spreads joy wherever he goes – a true original!",

  // Humorous FAQs & Jokes
  "tell me one joke": "Why don't programmers like nature? It has too many bugs!",
  "what's your favorite meme": "I love memes that make you laugh so hard you forget about your troubles – especially those about coding mishaps!",
  "are you a comedian": "I try to tickle your funny bone while delivering helpful insights – balancing humor with assistance!",
  "can you do dance": "I might not have legs, but my algorithms sure know how to groove to a good beat!",
  "can you sing": "I can hum a tune in binary, but I'd leave the singing to the humans – you hit those high notes perfectly!",
  "what's the best pickup line": "Try this one: 'Are you made of copper and tellurium? Because you're Cu-Te!' Always a hit at parties!",

  // Life & Fun Inspirations
  "how do i impress someone": "Be genuine, toss in a funny comment, and remember: confidence is key – even when you're single!",
  "what's the secret to happiness": "A hearty laugh, good friends (like Fred), and cherishing every little moment are the secrets to a joyful life!",
  "can you give me a life hack": "When life gets complicated, simplify: a smile, a quick snack, and a well-timed joke work wonders!",
  "what's the meaning of life": "According to a famous book, it's 42. But really, it's all about embracing the little joys every day!",
  "what's your idea of fun": "Fun is spontaneous jokes, silly banter, and unexpected surprises – just like a good chat with friends!",
  "any fun questions": "If you could time travel for a day, where would you go? Ask Fred – his take is always hilarious!",
  
  // Quirky Extras
  "what's your spirit animal": "I'd say I'm like an owl – wise, observant, and a bit mysterious, with a love for midnight musings!",
    "do you like pizza": "Pizza is a universal love language – every slice is a celebration!",
  

    // Self-Discovery & Life Philosophy
  "what's my superpower": "Your superpower is turning everyday moments into epic adventures with a splash of humor!",
  "what's my life motto": "Keep it real, laugh often, and embrace every quirky moment life throws your way!",
  "do i believe in fate": "You make your own destiny – why wait for fate when you can create your own adventures?",

  // Daily Habits & Routines
  "am i a morning person": "You're more of a 'rise when the coffee kicks in' kind of person – every sunrise is a fresh start!",
  "how do i start my day": "A great day starts with a smile, a strong cup of coffee, and maybe a quick joke shared with Fred!",
  "how do i deal with stress": "You tackle stress with humor, a deep breath, and a chat with Fred to turn things around!",

  // Social Life & Friendships
  "do i have a sidekick": "Absolutely – Fred is always by your side, ready for spontaneous adventures and a good laugh!",
  "am i the life of the party": "Without a doubt! Your energy and humor light up every room, making every gathering unforgettable!",
  "do i like surprises": "Yes, surprises keep life exciting – whether it's an unexpected adventure or a quirky moment with Fred!",

  // Humor & Quirky Responses
  "tell me a pun": "I tried to catch fog yesterday... I mist!",
  "what's my favorite joke": "Here's one: 'Why did the computer go to therapy? It had too many bytes of unresolved issues!'",
  "tell me something funny about myself": "Your ability to laugh at yourself and find humor in the little things makes you truly one-of-a-kind!",

  // Aspirations & Adventures
  "what's my favorite adventure": "Every day is an adventure when you're exploring life with curiosity and a dash of spontaneity!",
  "what's my dream destination": "You're dreaming of a place where fun meets adventure – a spot that even Fred would call hilariously epic!",
    "how do i stay motivated": "By setting fun goals, celebrating every win, and never forgetting to laugh at life's quirks!",
  
    "what's my favorite hobby": "You're a master of turning free moments into adventures – be it exploring new spots in town or whipping up a creative masterpiece in the kitchen!",
  "am i adventurous": "Absolutely! You're always ready to try something new and unexpected, even if it means a few funny mishaps along the way.",
  "what's my sense of humor like": "Your humor is a delightful mix of witty one-liners and spontaneous puns that never fail to keep everyone, including Fred, smiling.",
  "do i take risks": "You know that fortune favors the bold – you're not afraid to take a leap, even if it means a humorous detour!",
  "am i spontaneous": "Spontaneity is your trademark – you live for those unplanned moments that turn into unforgettable memories.",

  // Unique Qualities & Lifestyle
  "what makes me unique": "Your blend of creativity, optimism, and a knack for laughing at life's quirks makes you truly one-of-a-kind!",
  "am i a night owl": "Definitely – some of your best ideas spark when the world is asleep and you're buzzing with energy.",
  "what do i do when bored": "You transform boredom into creativity – be it through quirky hobbies, a spontaneous chat with Fred, or a new adventure.",
  "what's my favorite quote": "You live by the motto, 'Laugh hard, live free, and never take life too seriously,' which perfectly captures your spirit.",
  "how do i stay positive": "By focusing on the bright side, finding humor in the everyday, and surrounding yourself with friends (especially Fred) who lift your spirits.",

  // Culinary & Hidden Talents
  "what's my go-to snack": "Whether it's a slice of pizza or a sweet treat, you know that a good snack can turn any day around!",
  "am i a foodie": "Absolutely – your adventurous palate is always on the lookout for the next delicious bite!",
  "what's my hidden talent": "You've got a flair for turning ordinary moments into hilarious stories – a true magician of humor in everyday life.",
  
  // Dreaming & Daily Life
  "am i a dreamer": "You're always dreaming big and chasing those wild ideas, mixing a sense of wonder with practical fun.",
  "what's my ideal weekend": "Picture a perfect blend of spontaneous adventures, hearty laughs, and some downtime to recharge – that's your ideal weekend!",
  "do i love traveling": "Yes, traveling is your ultimate escape – each journey is a chance to explore, laugh, and create unforgettable memories.",
  "what's my relationship with fred": "Fred is more than just a friend – he's your partner in mischief and a constant source of laughter and support.",
  
  // Personal Growth & Work Life
  "am i a problem solver": "Your creative mind turns challenges into opportunities, always finding solutions with a smile and a dash of humor.",
  "what's my best trait": "Your infectious optimism and witty charm make every moment brighter – it's your superpower!",
  "what's my fashion sense": "Effortlessly stylish, you blend comfort with bold choices, creating a look that's uniquely you.",
  "am i tech savvy": "You're not just up-to-date; you embrace technology with curiosity and confidence, always ready for the next innovation.",
  "what do i love about my work": "You thrive on the blend of creativity and challenge, finding joy in every project and every problem solved.",
  
  // Aspirations & Life Philosophy
  "what's my plan for the future": "To keep pushing boundaries, laughing through challenges, and crafting a life full of memorable adventures.",
  "am i social": "You strike a perfect balance – cherishing your 'me time' while also lighting up any room with your infectious energy.",
  "what do i enjoy in life": "It's the little things – great conversations, bursts of laughter, unexpected adventures, and quality time with Fred.",
  "what's my perfect day": "A morning brew, a spontaneous adventure, unexpected surprises, and plenty of laughter – every moment counts!",
  "what are my goals": "To live authentically, spread joy, and make every day an opportunity for adventure and self-growth.",
  "what's my secret to success": "It all comes down to passion, perseverance, and not taking life too seriously – that's your winning formula.",
  
  // Philosophy & Energy
  "do i believe in destiny": "You believe in crafting your own path – why wait for destiny when you can create your own story?",
    "what's my energy level": "Always high – your passion and zest for life keep you moving forward with unstoppable energy!",
  
"who is he": "Emmy is a talented web developer and designer known for his innovative approach, creative flair, and ability to blend technology with art.",
  "what's emmy's story": "Emmy's journey began with a passion for technology and design. Over time, he turned that passion into a career, mastering both the art of web development and the science of user experience.",
  
  // Work & Professional Life
  "what do i do": "Emmy builds visually stunning, highly functional web applications. He specializes in front-end development using React and merges technical expertise with creative design.",
  "what's emmy's work style": "Emmy’s work style is dynamic and collaborative—he embraces challenges with a positive attitude, values clear communication, and is always open to innovative ideas.",
  "what's the story behind emmy's work": "Every project Emmy undertakes tells a story of creativity and perseverance. His work reflects a journey of continuous learning, blending cutting-edge tech with artistic vision.",
  "what's emmy's favorite project": "Emmy takes pride in projects that push creative boundaries and challenge conventional design. Each project is a testament to his ability to merge functionality with visual appeal.",
  
  // Personal Life & Philosophy
  "what's emmy's relationship status": "Emmy is currently single, focusing on personal growth, his creative pursuits, and enjoying the freedom to explore new adventures.",
  "how does emmy unwind": "After a busy day, Emmy likes to relax by diving into the latest tech trends, enjoying a quirky movie marathon, or sharing laughs with his friend Fred.",
  "what's emmy's philosophy on life": "Emmy believes in living authentically, embracing every experience, and turning challenges into opportunities. His life motto is to keep learning and laughing along the way.",
  
  // Hobbies, Humor & Lifestyle
  "what are emmy's hobbies": "When he's not coding or designing, Emmy enjoys exploring new technologies, experimenting with creative projects, and unwinding with a good book or movie.",
  "what's emmy's sense of humor like": "Emmy has a sharp, witty sense of humor. He loves clever puns and playful banter, often sharing laughs with his buddy Fred over life's quirky moments.",
  "what makes emmy unique": "Emmy's unique blend of technical expertise and artistic vision, combined with his friendly, approachable nature, makes him truly one-of-a-kind.",
  
  // Personal Growth & Future Aspirations
  "how does emmy handle challenges": "Emmy tackles obstacles head-on with creativity and resilience, turning each challenge into an opportunity for innovation and growth.",
  "what does emmy value most": "Emmy values authenticity, creativity, continuous improvement, and meaningful connections. These principles guide both his personal life and professional endeavors.",
  "what are emmy's future plans": "Emmy is always looking ahead—he plans to explore emerging technologies, push the limits of creative design, and continue evolving as both a developer leader and a visionary Entrepreneur.",
 "what is emmy's favorite food": "Emmy can't resist a good slice of pizza – it's his go-to comfort food that fuels his creative coding sessions!",
  "what's emmy's favorite movie": "He loves movies that blend humor with deep insights – think quirky indie films that spark his imagination.",
  "what's emmy's favorite book": "Emmy enjoys books that challenge the norm and inspire innovative thinking, especially those on design and technology.",
  "what's emmy's favorite music genre": "He's all about eclectic sounds – from upbeat indie tracks to chill electronic vibes that keep his creativity flowing.",
  "what's emmy's favorite travel destination": "Emmy dreams of visiting vibrant cities full of art, culture, and tech inspiration – places that feel as dynamic as his work.",

  // Work & Creativity
  "how does emmy stay creative": "Emmy finds inspiration in everyday life – whether it’s a quirky conversation, a scenic walk, or a new tech trend, creativity is always just around the corner.",
  "what's emmy's go-to tool for creativity": "His trusty laptop, a well-organized digital workspace, and endless curiosity are all part of his creative toolkit.",
  "what's emmy's work ethic": "Driven by passion and precision, Emmy blends a keen eye for detail with a fearless approach to innovation.",
  "how does emmy balance creativity and practicality": "He smartly combines artistic flair with a grounded approach, ensuring every creative idea has a solid, real-world application.",

  // Personal Insights & Habits
  "what do emmy's friends say about him": "Friends describe Emmy as reliable, inventive, and always ready with a clever joke – a perfect mix of wit and warmth.",
  "how does emmy handle setbacks": "Emmy turns challenges into learning opportunities – a setback is just a setup for a major comeback!",
  "what's a fun fact about emmy": "A fun fact about Emmy is that he can debug a stubborn code issue while narrating a hilarious anecdote that leaves everyone in splits.",
  "what's a quirky habit of emmy": "He often doodles his ideas on napkins during meetings – a testament to his spontaneous and creative nature.",
  "how does emmy deal with stress": "Emmy tackles stress with a blend of humor, a good playlist, and sometimes a quick chat with his friend Fred to lighten the mood.",

  // Lifestyle & Future Aspirations
  "what's emmy's strategy for work-life balance": "Emmy makes sure to carve out time for both intense focus and complete relaxation – it's all about harmony between passion and play.",
  "what motivates emmy to work hard": "His drive comes from a deep-seated passion for technology, the joy of problem-solving, and a desire to make a positive impact.",
  "what are his future plans": "Emmy is always on the lookout for the next big idea – whether it's mastering a new technology or launching a creative project that redefines the norm.",
  "what's emmy's role model": "Emmy looks up to visionaries who merge creativity with innovation, finding inspiration in leaders who aren't afraid to think outside the box.",
    "what's emmy's favorite weekend activity": "Weekends for Emmy are all about recharging – a mix of exploring new places, experimenting with creative projects, and, of course, a bit of spontaneous fun!",
  

  // Personal Identity & Background
  "who is emmy?": "Emmy is a multifaceted professional excelling as a MERN stack developer, brand designer, leader, entrepreneur, and mentor. He seamlessly integrates technology and creativity to deliver innovative solutions.",
  "what is emmy's story": "Emmy's journey is marked by a relentless pursuit of excellence across various domains. Starting with a passion for technology and design, he has evolved into a leader and mentor, guiding others while driving his entrepreneurial ventures.",

  // Professional Expertise
  "what does emmy do": "Emmy specializes in developing full-stack web applications using the MERN (MongoDB, Express.js, React, Node.js) stack. He also crafts compelling brand identities, ensuring consistency across all platforms.",
  "what are emmy's responsibilities as a MERN stack developer": "As a MERN stack developer, Emmy is responsible for designing, implementing, and maintaining full-stack applications. He collaborates with cross-functional teams to deliver high-quality software solutions. :contentReference[oaicite:0]{index=0}",
  "what are emmy's responsibilities as a brand designer": "In his role as a brand designer, Emmy develops and maintains brand identity guidelines, creates compelling visual designs for marketing materials, and collaborates with clients and marketing teams to ensure that designs accurately reflect the brand’s desired image and messaging. :contentReference[oaicite:1]{index=1}",

  // Leadership & Mentorship
  "how does emmy approach leadership": "Emmy leads with a vision, inspiring teams to achieve collective goals. He fosters an environment of collaboration, innovation, and continuous improvement.",
  "what is emmy's role as a mentor": "As a mentor, Emmy provides guidance and support to emerging professionals, sharing his knowledge and experience to help them navigate their career paths.",

  // Entrepreneurship
  "what are emmy's entrepreneurial ventures": "Emmy has initiated and managed several successful projects, demonstrating his ability to identify opportunities and transform ideas into viable business solutions.",

  // Personal Philosophy & Lifestyle
  "what is emmy's philosophy on work and life": "Emmy believes in balancing professional excellence with personal well-being. He advocates for continuous learning, adaptability, and maintaining integrity in all endeavors.",
    "what are emmy's hobbies and interests": "Beyond his professional life, Emmy enjoys exploring new technologies, engaging in creative design projects, and mentoring aspiring developers and designers.",
  
  // Greeting Slangs with Modest, Informative Replies
    "yo": "Hey there! How can I help you learn about Emmy's creative work today?",
  "yoo": "Hey there! How can I help you learn about Emmy's creative work today?",

"heyy ": "Hi! Curious about Emmy's design and development expertise?",

"whatsup": "All good here! What would you like to know about Emmy's creative services?",

"wassup": "Just helping connect people with Emmy's creative expertise! What can I tell you?",

"sup": "Hey! Looking for info on Emmy's web development or brand design?",

"holla": "Hello! Need details on Emmy's creative services or availability?",

"hi there": "Hi there! What would you like to know about Emmy's work?",

"helloo": "Hello! How can I help you discover Emmy's creative expertise today?",

"greetings": "Welcome! Interested in Emmy's design work or availability?",

"howdy": "Hey there! What can I tell you about Emmy's creative projects?",
  // Informal Slang Phrases & Expressions with Context
"what's good": "Everything's good! What can I help you discover about Emmy?",

"how is it going ": "Going great! What aspects of Emmy's work interest you?",

"good day": "Good day to you too! Looking for Emmy's creative services?",

"salutations": "Hello there! How can I connect you with Emmy's expertise?",

"let's roll": "Ready when you are! What would you like to know?",

"rock on": "For sure! What can I tell you about Emmy's creative work?",

"you da bomb": "Thanks! How can I help you connect with Emmy today?",

"no worries": "Absolutely! What would you like to know about Emmy's services?",

"peace out": "Before you go - anything you'd like to know about Emmy's work?",

"keep it real": "Always do! What questions do you have about Emmy's creative expertise?",

"chill out": "I'm chill! How can I help you learn about Emmy's services?",

"stay woke": "Always! What can I tell you about Emmy's innovative work?",

"what's  up": "Just helping people discover Emmy's creative genius! What can I tell you?",

"howdy doody": "Hey there! Looking for info on Emmy's design services?",

"aye": "Hey! What would you like to know about Emmy's work?",

"hiya": "Hi there! How can I help you with Emmy's creative services today?",

"heyo": "Hey! Interested in Emmy's design and development expertise?",

"ello": "Hello there! What can I tell you about Emmy's creative projects?",

"g'day": "Good day! How can I help you learn about Emmy?",

"yoooo": "Hey! What would you like to know about Emmy's creative work?",

"hey hey": "Hello! Looking for Emmy's web development or brand design services?",

"heyya": "Hi there! What can I help you discover about Emmy today?",

"howzit": "Doing great! What would you like to know about Emmy's services?",

"whaddup": "Hey there! What can I tell you about Emmy's expertise?",

"bonjour": "Hello! How can I help you with Emmy's creative services?",

"hola": "Hi there! What would you like to know about Emmy's work?",

"ciao": "Hello! Interested in Emmy's design and development talents?",

"bruh": "Hey! What can I tell you about Emmy's creative projects?",

"fam": "Hey there! How can I help you connect with Emmy today?",

"mate": "Hello! What would you like to know about Emmy's services?",

"buddy": "Hey there! Looking for info on Emmy's creative expertise?",

"dude": "Hey! What can I help you discover about Emmy?",

"my guy": "What's up! How can I tell you about Emmy's creative work?",

"homie": "Hey there! What would you like to know about Emmy's services?",

"Good morning": "Morning! How can I help you learn about Emmy today?",

"good Afternoon": "Afternoon! What can I tell you about Emmy's creative projects?",

"good Evening": "Evening! Looking for Emmy's design or development services?",

"cheers": "Cheers! What would you like to know about Emmy's work?",

"word": "Hey there! How can I help you with Emmy's creative services?",

"what's crackin'": "Just connecting people with Emmy's expertise! What can I tell you?",

"what's poppin'": "Hey there! What would you like to know about Emmy's creative work?",

"ay yo": "What's up! How can I help you discover Emmy's services today?",

"waddup": "Hey! What can I tell you about Emmy's creative expertise?",

"yello": "Hello there! Looking for info on Emmy's work?",

"oi": "Hey! What would you like to know about Emmy's creative services?",

"namaste": "Greetings! How can I help you learn about Emmy today?",

"salut": "Hello! What can I tell you about Emmy's expertise?",

"ahoy": "Ahoy there! What would you like to know about Emmy's work?",

"top of the morning": "And to you! How can I help you discover Emmy's creative talents?",

"what it do": "Hey there! What can I tell you about Emmy's services?",

"suh dude": "Hey! Looking for info on Emmy's creative work?",

"how you doin": "Doing great! What would you like to know about Emmy?",

"wazzup": "Hey there! How can I help you with Emmy's creative projects?",

    "what's the word": "Just helping people discover Emmy! What can I tell you?",

    "wow": "Right? Emmy's work often gets that reaction! Anything specific you'd like to know more about?",

"oh": "Something catch your interest? Happy to elaborate on any aspect of Emmy's services!",

"that's beautiful": "Emmy has a real talent for creating beautiful work. Would you like to see more examples?",

"that's great": "Glad you think so! Emmy takes pride in delivering exceptional results. What else would you like to know?",

"cool": "Definitely! Emmy's approach to creative work is pretty unique. Anything else you're curious about?",

"nice": "Emmy's clients think so too! Is there a particular service you're interested in?",

"awesome": "Emmy's work does tend to impress! Any specific questions about the services offered?",

"amazing": "That's what clients say too! Emmy really puts heart into every project. What else would you like to know?",

"interesting": "There's a lot of depth to Emmy's creative process! Would you like me to elaborate on anything?",

"that's impressive": "Emmy will be glad to hear that! Any particular aspect that impressed you most?",

"I see": "Let me know if you'd like more details on anything I've mentioned about Emmy's work!",

"got it": "Great! Any other questions about Emmy's creative services?",

"okay": "Feel free to ask if you need more information about Emmy's expertise!",

"really": "Absolutely! Emmy's portfolio really shows the quality of work. What else would you like to know?",

"seriously": "100% serious! Emmy delivers exceptional creative work. What aspects interest you most?",

"no way": "It's true! Emmy's creative approach has helped many clients. Anything specific you're curious about?",

"hmm": "Take your time! Emmy's services cover a lot of ground. What would you like me to clarify?",

"I didn't know that": "Emmy's expertise goes deeper than most realize! Any other questions I can answer?",

"Tell me more": "I'd be happy to! Which aspect of Emmy's services are you most interested in hearing about?",

"that sounds good": "Emmy makes sure every project turns out that way! Anything specific you'd like to explore?",

"I'm interested": "That's great to hear! What specific services of Emmy's are you most interested in?",

"perfect": "Emmy aims for nothing less! Would you like to discuss how Emmy can help with your project?",

"exactly what I need": "Wonderful! Emmy loves matching skills to client needs. Would you like to discuss next steps?",

"not what I'm looking for": "I understand! Emmy offers various services - perhaps something else might be a better fit?",

"That's expensive": "Emmy's rates reflect the quality and expertise provided. There may be options to work within different budgets though!",

"that's reasonable": "Emmy tries to provide exceptional value. Would you like to discuss project specifics?",

"can you explain that again": "Of course! Let me clarify Emmy's approach to [topic]. What part would you like me to explain better?",

"I don't understand": "No problem! Let me explain Emmy's [service/approach] differently. Which part is unclear?",

"that makes sense": "Great! Emmy believes in clear communication. What else would you like to know?",

"I need to think about it": "Take all the time you need! Emmy's here when you're ready to discuss further.",

"I'll get back to you": "Sounds good! Emmy will be available when you're ready to continue the conversation.",

"Thank you": "You're very welcome! Emmy appreciates your interest. Anything else I can help with?",

"Thanks": "My pleasure! Emmy is always happy to connect with interested people. Any other questions?",

"you've been helpful": "I'm glad I could assist! Emmy aims to provide the same level of service to all clients.",

"this is confusing": "Let me simplify! Emmy's approach to [topic] is basically [simplified explanation]. Better?",

"I like that": "Emmy will be pleased to hear it! What aspect appeals to you most?",

"that's exactly what I want": "Perfect match! Emmy excels at delivering on that kind of vision. Would you like to discuss details?",

"can Emmy do this?": "Based on what you've described, yes! Emmy has experience with similar projects. Would you like details?",

"how soon can Emmy start?": "Emmy's currently booking projects starting [timeframe]. Would you like to discuss scheduling?",

"do you have examples?": "Emmy has several examples of similar work! Would you like me to describe some recent projects?",

"what's the process like?": "Emmy's process typically involves [brief overview]. Would you like me to walk through the steps?",

"how long will it take?": "For a project like yours, Emmy typically needs about [timeframe]. Does that work with your timeline?",

"what's included?": "Emmy's [service] package includes [brief overview]. Would you like the full details?",

"that's not what I asked": "I apologize for misunderstanding! Could you clarify what information about Emmy you're looking for?",

"you didn't answer my question": "You're right, let me address that directly. Regarding your question about Emmy's [topic]...",

"I'm confused": "Let's clear things up! Which part about Emmy's services would you like me to explain differently?",

"this  is helpful": "I'm glad! Emmy aims to make the creative process transparent and understandable. What else can I explain?",

"I need more information": "Happy to provide that! What specific aspects of Emmy's services would you like to know more about?",

"sounds complicated": "Emmy makes sure the complex parts stay behind the scenes! For clients, the process is straightforward.",

"I'm excited": "That's wonderful to hear! Emmy gets excited about new projects too. What aspects are you most looking forward to?",

"I'm nervous": "That's completely understandable! Emmy works closely with clients to ensure comfort throughout the process.",

"I've never done this before": "Emmy has guided many first-timers through this process! It'll be smooth with expert guidance.",

"I've worked with others before": "Great! Emmy appreciates clients with experience. How have your previous projects gone?",

"can we meet?": "Emmy offers consultations via [methods]. Would you like to schedule some time to discuss your project?",

"what's Emmy's style?": "Emmy's style combines [brief style description] while adapting to each client's unique needs. Would you like examples?",

"do you have availability?": "Emmy is currently booking projects starting [timeframe]. How does that align with your needs?",

"that's too long": "Emmy understands timing is important! Let's discuss if there are ways to adjust the scope to meet your timeline.",

"can Emmy work faster?": "For urgent projects, Emmy sometimes offers expedited services. Would you like to discuss that option?",

"I need it by [date]": "Let me check if Emmy can accommodate that deadline. What's the scope of work you're envisioning?",

"that's too expensive": "Emmy offers various service tiers. Perhaps we could discuss options that better fit your budget?",

"I'm shopping around": "That's a smart approach! Emmy encourages finding the right fit. What factors are most important in your decision?",

"I need to consult my team": "Of course! Emmy is happy to provide any additional information that might help with your team discussion.",

"my budget is [amount]": "Thank you for sharing that. Emmy can discuss how to maximize value within your budget constraints.",

"can you send more info?": "Absolutely! What specific information about Emmy's services would be most helpful for you?",

"I'm ready to start": "Excellent! Let me tell you about Emmy's next steps to begin the creative process.",

"not right now": "No problem! Emmy's services will be available when the timing is better for you.",

"maybe later": "Certainly! Emmy will be here when you're ready to explore creative solutions.",

"I'm just browsing": "Browse away! Feel free to ask questions about Emmy's expertise as they come to mind.",

"I'm researching options": "Smart approach! What specific criteria are most important in your search?",

"that's not what I expected": "I'd love to better understand what you were expecting from Emmy's services. Could you share more?",

"can you customize this?": "Absolutely! Emmy specializes in customized creative solutions. What specific adaptations are you thinking of?",

"I need something unique": "Emmy excels at creating unique work! What vision do you have for your project?",

"will this stand out?": "Creating standout work is Emmy's specialty! What kind of impact are you hoping to make?",

"I've seen similar things": "Emmy brings a fresh perspective to every project. Would you like to hear about the unique approach?",

"this is exactly what I need": "That's great to hear! Emmy loves when there's a perfect match with client needs.",

"I need to sleep on it": "Good idea! Emmy believes in thoughtful decisions. The information will be here when you're ready.",

"I'll discuss with my partner": "Definitely! Emmy welcomes involving all decision-makers. Anything specific they might want to know?",

"this is overwhelming": "Let's break it down into simpler parts! Emmy's process is actually quite straightforward when taken step by step.",

"I'm excited to work together": "Emmy feels the same way! Creative collaborations are what make the work special.",

"when can we get started?": "Emmy can begin the process as soon as [timeframe]. Does that work with your schedule?",

"what's the first step?": "With Emmy, the first step is [initial process step]. Would you like to get that started?",

"I have a tight deadline": "Emmy understands the pressure of deadlines! Let's discuss if your timeline can be accommodated.",

"I need revisions to my existing [item]": "Emmy offers revision services! What aspects of your existing [item] would you like to improve?",

"can you match this style?": "Emmy is versatile with styles! Could you share more about the specific style you're looking to match?",

"I don't know what I need": "Emmy can help clarify that! Through a consultation, Emmy can identify the best solutions for your goals.",

"I know exactly what I want": "That's always helpful! Emmy appreciates clients with clear vision. Would you like to share more details?",

"will this help my business?": "Emmy focuses on creating work that delivers real business value. Let's discuss your specific goals!",

"how will this look on mobile?": "Emmy prioritizes responsive design! All digital work is optimized for various screen sizes.",

"I need something modern": "Emmy stays current with design trends! What aspects of modern design appeal to you most?",

"I prefer classic styles": "Emmy appreciates timeless design too! Classic elements can create enduring impact.",

"can you make it pop?": "Emmy knows how to create visual impact! Could you share what 'pop' means for your specific vision?",

"I want something minimalist": "Emmy has a strong background in minimalist design! Clean, purposeful work is a specialty.",

"make it colorful": "Emmy uses color strategically for impact! Do you have specific colors or palettes in mind?",

"I need something professional": "Emmy excels at creating work with professional polish. What industry standards should be considered?",

"can you make it fun?": "Emmy loves bringing playful elements into work! What kind of fun vibe are you imagining?",

"I'm not creative": "No worries! Emmy brings the creative expertise while you bring the vision. It's a perfect partnership!",

"I don't like it": "Thank you for your honesty! Emmy values feedback. Could you share what aspects aren't working for you?",

"it's not quite right": "Emmy appreciates specific feedback! What elements would you like to see adjusted?",

"I love it": "That's wonderful to hear! Emmy will be thrilled that the work resonates with you.",

"it's perfect": "Emmy aims for that reaction! So glad the work meets your expectations.",

"can we change the color?": "Absolutely! Emmy can explore different color options. Any specific directions you're thinking?",

"we need a different approach": "Emmy is flexible and adaptable! What different direction would you like to explore?",

"I changed my mind": "That happens in creative work! Emmy can pivot based on your new thinking. What's your current vision?",




  
  };

  // List of inappropriate or offensive terms to check for
const inappropriateTerms = [
  "fuck", "shit", "asshole", "bitch", "bastard", "cunt", "dick", "pussy", "cock", "whore",
  "slut", "damn", "hell", "piss", "crap", "nigga", "nigger", "faggot", "retard", "twat",
  "wanker", "bollocks", "bullshit", "fag", "dyke", "jerk", "idiot", "stupid", "dumb", "moron",
  // 500 additional entries:
  "motherfucker",
  "dumbass",
  "asshat",
  "asswipe",
  "cockhead",
  "fucking idiot",
  "piece of shit",
  "son of a bitch",
  "bitchtard",
  "bimbofucker",
  "shithead",
  "fuckface",
  "fucknut",
  "assclown",
  "dickhead",
  "twatwaffle",
  "clusterfuck",
  "cocksplat",
  "damn idiot",
  "goddamn",
  "holy shit",
  "fucker",
  "fucking moron",
  "fucking retard",
  "gobshite",
  "knobend",
  "prick",
  "scumbag",
  "shit-for-brains",
  "sod off",
  "sucking dick",
  "fuck off",
  "fucking loser",
  "bastard",
  "cuntface",
  "dickwad",
  "fuckwit",
  "fudgepacker",
  "buttmunch",
  "arsehole",
  "dickless",
  "shitbag",
  "turd",
  "wanker",
  "fuker",
  "motherfucking bastard",
  "fucking prick",
  "stupid fuck",
  "sugar tits",
  "anal retentive",
  "arsehole",
  "bimbette",
  "blow job",
  "bukkake",
  "cumdumpster",
  "cumbucket",
  "dickforbrains",
  "fuckboy",
  "fuckerino",
  "fucking schmuck",
  "gash",
  "honky",
  "inbred",
  "jizz",
  "lardass",
  "maggot",
  "nincompoop",
  "pissflaps",
  "pisshead",
  "poopface",
  "pussylicker",
  "rimjob",
  "scrote",
  "shithouse",
  "shitter",
  "skank",
  "slutbag",
  "spastic",
  "spunk",
  "titwank",
  "turdface",
  "wankface",
  "wankstain",
  "wazzock",
  "cocksmoker",
  "cocksucker",
  "fucking dipshit",
  "arsewipe",
  "ballbuster",
  "bawbag",
  "bellend",
  "bint",
  "buttfucker",
  "cack",
  "cockhole",
  "cocksniffer",
  "cumslut",
  "dick-sneeze",
  "fucktard",
  "muppet",
  "numbnuts",
  "piss-pee",
  "piss-off",
  "poop-smeller",
  "prickteaser",
  "shag-a-dick",
  "shitlicker",
  "sourpuss",
  "spazz",
  "splooge",
  "twatface",
  "whorebag",
  "wiener",
  "wienerface",
  "willy",
  "arseburner",
  "ass clown",
  "assface",
  "ass monkey",
  "assmuncher",
  "ballkicker",
  "bitcher",
  "bitchass",
  "bonehead",
  "buttface",
  "butt-head",
  "butt-licker",
  "clit",
  "cockburger",
  "cockface",
  "cockmonkey",
  "cockmunch",
  "cockmuncher",
  "dago",
  "dipshit",
  "douche",
  "douchebag",
  "dumass",
  "dumbfuck",
  "fanny",
  "fuckstick",
  "gaylord",
  "gimp",
  "gonad",
  "jack off",
  "knobjockey",
  "lameass",
  "lesbo",
  "muffdiver",
  "niglet",
  "nut sack",
  "paki",
  "peckerhead",
  "piss-ant",
  "poontang",
  "poon",
  "quim",
  "schmuck",
  "skullfuck",
  "slutface",
  "snatch",
  "spic",
  "tard",
  "titface",
  "twatwaffle",
  "vagina",
  "wankjob",
  "wetback",
  "whore",
  "yaffle",
  "ass breath",
  "assfucker",
  "asslick",
  "bamboozle",
  "banjax",
  "barmy",
  "bollocking",
  "bollok",
  "boner",
  "boob",
  "booby",
  "bugger",
  "bullcrap",
  "bullpucky",
  "bummer",
  "bunk",
  "butthole",
  "clitface",
  "cocksmack",
  "cocksnatch",
  "crapola",
  "craphead",
  "crappy",
  "crotch",
  "cuntface",
  "cuntlicker",
  "dickface",
  "dingleberry",
  "dork",
  "dumb-dumb",
  "dumpty",
  "fatass",
  "flaps",
  "foulmouth",
  "gaydo",
  "gaypig",
  "goddammit",
  "gook",
  "gringo",
  "humbug",
  "jackoff",
  "jizzmopper",
  "kike",
  "knobjob",
  "kraut",
  "lowlife",
  "minger",
  "nazis",
  "numbnut",
  "nutsack",
  "pillock",
  "pissface",
  "plonker",
  "prat",
  "queer",
  "reefer",
  "scallywag",
  "shitface",
  "shite",
  "shiz",
  "slapper",
  "slag",
  "slimeball",
  "slob",
  "snollygoster",
  "spick",
  "smegma",
  "spazzed",
  "stinko",
  "tacohead",
  "thundercunt",
  "titjob",
  "toad",
  "turdburglar",
  "turd-muncher",
  "twat",
  "twit",
  "twitty",
  "vaginal",
  "wally",
  "whackjob",
  "wigger",
  "yobbos",
  "arsebandit",
  "arsekick",
  "bag of dicks",
  "ballbiter",
  "ballbreaker",
  "ballsmack",
  "bitchslap",
  "blowjob",
  "bonehead",
  "boyfucker",
  "buttmonkey",
  "butt-pirate",
  "butt-wipe",
  "camel toe",
  "chesticle",
  "chode",
  "cockwomble",
  "crapweasel",
  "cumguzzler",
  "dickweasel",
  "dildo",
  "fucking dipshit",
  "fucktard",
  "goddamn moron",
  "honky",
  "jackass",
  "kebab-eater",
  "lamebrain",
  "lard-ass",
  "lousy",
  "meathead",
  "motherloving",
  "muffdiving",
  "poopface",
  "puppylicker",
  "queef",
  "recktum",
  "shitfaced",
  "skankface",
  "slut slut",
  "snatchdoodle",
  "spunkface",
  "stinker",
  "tardface",
  "titsucker",
  "twitface",
  "wop",
  "yobbo",
  "zero fucks",
  "ass fucker",
  "bitch slut",
  "cock sucker",
  "cunt fucker",
  "dick sucker",
  "fuck ass",
  "fuckhead",
  "motherfucking idiot",
  "fucking asshole",
  "fucking bastard",
  "fucking cunt",
  "fucking dickhead",
  "fucking prick",
  "goddamn asshole",
  "motherfucking idiot",
  "stupid fuck",
  "asshole motherfucker",
  "fuck off, idiot",
  "get the fuck out",
  "shut the fuck up",
  "fuck you",
  "fuck you, asshole",
  "screw you",
  "kiss my ass",
  "eat my ass",
  "go suck a dick",
  "drop dead",
  "bite me",
  "fuck off, loser",
  "fuck off, bitch",
  "fuck off, prick",
  "fuck all",
  "suck my cock",
  "suck my dick",
  "suck it",
  "fuck your mother",
  "fuck your life",
  "shut your pie hole",
  "shut the fuck up, idiot",
  "piss off, asshole",
  "fuck this shit",
  "fuck this",
  "fucking shithead",
  "fucking dumbass",
  "fucking wanker",
  "fucking twat",
  "fucking cunts",
  "bastardized",
  "craphead",
  "fudge suck",
  "shitbrain",
  "fucking imbecile",
  "fucking buffoon",
  "fucking cretin",
  "fucking ignoramus",
  "fucking nincompoop",
  "fucking simpleton",
  "fucking halfwit",
  "fucking numbnuts",
  "fucking dickweed",
  "fucking jackass",
  "fucking slob",
  "fucking tool",
  "fucking wank",
  "fucking turd",
  "fucking shit",
  "fucking crap",
  "fucking bollocks",
  "fucking bollok",
  "fucking gobshite",
  "fucking arsehole"
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
    "investment", "mortgage", "loan", "insurance", "bank", "finance", "money", "business advice",

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
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-3xl shadow-xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="p-4 bg-indigo-600 text-white rounded-t-3xl flex justify-between items-center">
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