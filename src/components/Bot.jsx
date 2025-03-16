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

  // Your knowledge base about yourself
  // Expanded knowledge base
const knowledgeBase = {
  // Basic info
  "who are you": "I'm Bella, a virtual assistant for Emmy. He is a web developer and designer specializing in React and brand design.",
  "what do you do": "I help answer questions about Emmy's skills, experience, and services. Emmy is a Web developer with over 3 years of experience building web applications.",
  "contact": "You can contact Emmy at eayeni185@gmail.com or through the contact form on this website.",
  
  // Skills
  "skills": "Emmy specializes in React, JavaScript, Node.js, and UI/UX design. He's also experienced with TypeScript, Next.js, and various CSS frameworks.",
  "experience": "Emmy has over 3 years of professional experience working with startups and agencies. He's built everything from e-commerce platforms to SaaS applications.",
  
  // Projects
  "portfolio": "You can check out Emmy's portfolio by clicking on the 'Works' section in the navigation menu. He's worked on projects for clients in construction, tech, education, and e-commerce.",
  
  // Services
  "services": "Emmy offers web development, logo & brand design, consulting, and maintenance services for existing websites.",
  "pricing": "Emmy's rates vary based on project scope. For a custom quote, you can contact him through the contact section on this website to describe your project needs.",

  // Personality traits
  "personality": "Emmy is known for being incredibly talented, gifted, and gentle. He approaches every project with creativity and a positive attitude. He's patient with clients and takes time to understand their vision before bringing it to life.",
  "what is he like": "Emmy is a creative, gentle soul with a passion for design and technology. He's known for his patience, attention to detail, and ability to transform complex ideas into beautiful, functional websites.",
  
  // Personal background
  "background": "Emmy discovered his passion for web development and design early on, and has continuously honed his skills through both formal education and self-directed learning. His unique approach combines technical expertise with an artistic sensibility.",
  "education": "Emmy has a strong educational background in computer science and designing, complemented by continuous self-learning and staying updated with the latest web technologies and design trends.",
  
  // Work approach
  "work style": "Emmy takes a collaborative approach to his work, ensuring clients are involved throughout the development process. He values clear communication and makes complex technical concepts easy to understand.",
  "process": "Emmy's design and development process starts with understanding your goals, followed by research, wireframing, design, development, and thorough testing. He ensures clients are kept in the loop at every stage.",
  
  // Social life
  "social life": "Outside of work, Emmy enjoys spending his time alone, attending tech meetups, and participating in design communities. He believes in balancing work with social activities that inspire creativity.",
  "hobbies": "When not coding or designing, Emmy enjoys photography, Fashion, exploring nature, reading books on design and innovation, and occasionally volunteering for community projects.",
  
  // Strengths
  "strengths": "Emmy's greatest strengths are his creativity, technical problem-solving abilities, attention to detail, and genuine care for delivering high-quality work that exceeds client expectations.",
  "unique qualities": "What makes Emmy stand out is his ability to bridge the gap between technical functionality and beautiful design. He's not just a developer or designer – he excels at both.",
  
  // Values
  "values": "Emmy values honesty, quality craftsmanship, continuous learning, and building lasting relationships with clients. He believes that the best digital products come from understanding both user needs and business goals.",
  
  // Communication
  "communication": "Emmy is an excellent communicator who keeps clients informed throughout the project lifecycle. He's responsive to messages and always open to feedback and collaboration.",
  
  // Client relationships
  "clients": "Emmy builds strong relationships with his clients, many of whom return for additional projects. He treats each client as a partner and is committed to helping them achieve their digital goals. and solve thier problems",
  
  // Personal mission
  "mission": "Emmy's mission is to create digital experiences that are not only visually stunning but also intuitive, accessible, and effective at achieving business objectives."
};

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simple response logic - match input against knowledge base
    setTimeout(() => {
      let botResponse = "I don't have information about that yet. You can contact Emmy directly for more details!";
      
      // Check for matches in knowledge base (case insensitive)
      const userQuestion = input.toLowerCase();
      for (const [key, value] of Object.entries(knowledgeBase)) {
        if (userQuestion.includes(key)) {
          botResponse = value;
          break;
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