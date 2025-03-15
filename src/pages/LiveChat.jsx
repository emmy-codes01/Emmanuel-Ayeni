import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, ThumbsUp, User, Home } from 'lucide-react';
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
  increment
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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          timestamp: doc.data().timestamp?.toDate() || new Date()
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
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;
    
    try {
      // Add new comment to Firestore
      await addDoc(collection(db, "comments"), {
        user: userName,
        content: newComment,
        timestamp: serverTimestamp(), // Use server timestamp for consistency
        likes: 0
      });
      
      // Clear input field after successful submission
      setNewComment('');
    } catch (err) {
      console.error("Error adding comment:", err);
      setError('Failed to post review: ' + err.message);
    }
  };
  
  const handleLikeComment = async (commentId) => {
    try {
      const commentRef = doc(db, "comments", commentId);
      await updateDoc(commentRef, {
        likes: increment(1)
      });
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

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-indigo-500/20 rounded-2xl p-6 mt-12 shadow-xl shadow-indigo-500/10">
      {/* Header with glow effect */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center">
          <div className="absolute -left-2 -top-2 w-10 h-10 bg-indigo-500 rounded-full blur-xl opacity-30"></div>
          <MessageCircle className="text-indigo-400 mr-3" size={22} />
          <h2 className="text-2xl font-bold text-white tracking-tight">Reviews & Recommendations</h2>
        </div>
        <div className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {comments.length}
        </div>
      </div>
      
      {/* Comment form with glassmorphism */}
      <form onSubmit={handleSubmitComment} className="mb-8 space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
          required
        />
        <div className="flex relative">
          <textarea
            placeholder="Add a review or recommendation..."
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
      
      {/* Comments list with improved cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-6">
            <div className="w-8 h-8 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-white/60">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400">{error}</p>
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
                  <div className="bg-gradient-to-br from-indigo-500 to-to-indigo-700 rounded-full p-2 mr-3">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-white">{comment.user}</span>
                </div>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{formatTimestamp(comment.timestamp)}</span>
              </div>
              <p className="text-white/80 mb-4 pl-2 border-l-2 border-indigo-500/30 ml-2">{comment.content}</p>
              <div className="flex items-center text-white/60 text-sm">
                <button 
                  className="flex items-center hover:text-indigo-400 transition-colors"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <ThumbsUp size={18} className="mr-1.5" />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Floating action button */}
      <div className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full p-3 shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-110 transition-transform duration-200">
        <Link to='/'>
           <Home size={30} className="text-white" />
        </Link>
      </div>



      
    </div>
  );
};

export default LiveChat;