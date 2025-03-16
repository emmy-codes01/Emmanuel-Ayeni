import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, ThumbsUp, User, Home, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  updateDoc,
  doc,
  increment,
  arrayUnion,
  getDoc
} from 'firebase/firestore';

// Firebase configuration - replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxzSXt3KkWBT7mAhq-EeVDRNz9Gmh39xg",
  authDomain: "emmy-codes.firebaseapp.com",
  projectId: "emmy-codes",
  storageBucket: "emmy-codes.firebasestorage.app",
  messagingSenderId: "266870836039",
  appId: "1:266870836039:web:c5b8919bf492cc4f471a62",
  measurementId: "G-X2D2RQ06F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LiveChat = () => {

   React.useEffect(() => {
      // Set page title when component mounts
      document.title = "Reviews & Recommendations";
      
      // Optional: Reset title when component unmounts
      return () => {
        document.title = "Emmanuel Ayeni";
      };
    }, []);
  

  const currentYear = new Date().getFullYear();


  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userPosition, setUserPosition] = useState(''); // New state for user position
  const [rating, setRating] = useState(0); // Changed to 0 to make stars unchecked by default
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');

  // Generate a unique user ID for the current session if not already set
  useEffect(() => {
    const storedUserId = localStorage.getItem('reviewUserId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('reviewUserId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  // Fetch and listen to comments in real-time
  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, orderBy("timestamp", "desc")); // Changed to desc to show newest first
    
    try {
      // Set up real-time listener
      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
          likedByCurrentUser: doc.data().likedBy?.includes(userId) || false
        }));
        
        setComments(commentsData);
        setIsLoading(false);
      }, (error) => {
        console.error("Error listening to comments:", error);
        setError('Failed to load reviews: ' + error.message);
        setIsLoading(false);
      });
      
      // Clean up listener on component unmount
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up listener:", err);
      setError('Failed to connect to database');
      setIsLoading(false);
    }
  }, [userId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;
    
    // Validation for rating
    if (rating === 0) {
      setError('Please select a star rating');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    try {
      // Add new comment to Firestore
      await addDoc(collection(db, "comments"), {
        user: userName,
        position: userPosition, // Add position to the document
        content: newComment,
        timestamp: serverTimestamp(), // Use server timestamp for consistency
        likes: 0,
        likedBy: [], // Array to track users who liked this comment
        rating: rating, // Add star rating
        userId: userId // Associate the comment with the current user
      });
      
      // Clear input fields after successful submission
      setNewComment('');
      // Reset rating after submission
      setRating(0);
      // Optionally reset other fields if you want users to submit multiple reviews
      // setUserName('');
      // setUserPosition('');
    } catch (err) {
      console.error("Error adding comment:", err);
      setError('Failed to post review: ' + err.message);
    }
  };
  
  const handleLikeComment = async (commentId) => {
    try {
      // Get the comment document
      const commentRef = doc(db, "comments", commentId);
      const commentSnap = await getDoc(commentRef);
      
      // Check if user already liked this comment
      if (commentSnap.exists() && commentSnap.data().likedBy?.includes(userId)) {
        // User already liked this comment, show a notification or handle as needed
        setError('You have already liked this review');
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      // Update the comment with new like count and add user to likedBy array
      await updateDoc(commentRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId)
      });
      
      // Update local state to reflect the change
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId 
            ? {...comment, likes: comment.likes + 1, likedByCurrentUser: true} 
            : comment
        )
      );
    } catch (err) {
      console.error("Error liking comment:", err);
      setError('Failed to like review');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'just now';
    
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentTime) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Render star rating component - updated to handle 0 value
  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center mb-3">
        <span className="text-white/60 mr-2 text-sm">Your rating:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              onClick={() => onChange?.(star)}
              className={`cursor-pointer transition-colors ${
                star <= value && value > 0
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-white/20'
              }`}
            />
          ))}
        </div>
        {value > 0 && (
          <span className="text-white/60 text-xs ml-2">({value}/5)</span>
        )}
      </div>
    );
  };

  // Render stars for a comment
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-white/20'
            }`}
          />
        ))}
        <span className="text-white/60 text-xs ml-1">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-indigo-500/20 rounded-2xl p-6 mt-12 shadow-xl shadow-indigo-500/10">
      {/* Header with glow effect */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center">
          <div className="absolute -left-2 -top-2 w-10 h-10 bg-indigo-500 rounded-full blur-xl opacity-30"></div>
          <MessageCircle className="text-indigo-400 mr-3" size={22} />
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Reviews & Recommendations</h2>
            <p className="text-white/60 text-sm">Share your experience working with me</p>
          </div>
        </div>
        <div className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {comments.length}
        </div>
      </div>
      
      {/* Comment form with glassmorphism */}
      <form onSubmit={handleSubmitComment} className="mb-8 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
            required
          />
          <input
            type="text"
            placeholder="Your position (e.g. CEO, Manager)"
            value={userPosition}
            onChange={(e) => setUserPosition(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
          />
        </div>
        
        <StarRating value={rating} onChange={setRating} />
        
        <div className="flex relative">
          <textarea
            placeholder="Share your experience or recommendation..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
            rows={2}
            required
          />
          <button
            type="submit"
            disabled={!newComment.trim() || !userName.trim()}
            className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3.5 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={25} />
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && (
        <div className="mb-4 text-center py-3 bg-red-500/10 border border-red-500/20 rounded-xl transition-all">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      {/* Comments list with improved cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-6">
            <div className="w-8 h-8 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-white/60">Loading reviews...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 bg-white/5 rounded-xl border border-white/10">
            <MessageCircle className="mx-auto text-white/30 mb-2" size={24} />
            <p className="text-white/60">Be the first to leave a review!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full p-2 mr-3">
                    <User size={16} className="text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-white">{comment.user}</span>
                    {comment.position && (
                      <div className="flex items-center text-white/50 text-xs mt-1">
                        <Briefcase size={12} className="mr-1" />
                        <span>{comment.position}</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{formatTimestamp(comment.timestamp)}</span>
              </div>
              
              {/* Star rating display */}
              {comment.rating && <RatingStars rating={comment.rating} />}
              
              <p className="text-white/80 mb-4 pl-2 border-l-2 border-indigo-500/30 ml-2">{comment.content}</p>
              <div className="flex items-center text-white/60 text-sm">
                <button 
                  className={`flex items-center transition-colors ${
                    comment.likedByCurrentUser 
                      ? 'text-indigo-400 cursor-default' 
                      : 'hover:text-indigo-400'
                  }`}
                  onClick={() => !comment.likedByCurrentUser && handleLikeComment(comment.id)}
                  disabled={comment.likedByCurrentUser}
                >
                  <ThumbsUp 
                    size={18} 
                    className={`mr-1.5 ${comment.likedByCurrentUser ? 'fill-indigo-400' : ''}`} 
                  />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Floating action button */}
      <div className="fixed bottom-22 right-6 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full p-3 shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-110 transition-transform duration-200">
        <Link to='/'>
           <Home size={30} className="text-white" />
        </Link>
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


    </div>
  );
};

export default LiveChat;