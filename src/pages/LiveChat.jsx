import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  // getDocs, 
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
    const commentsQuery = query(commentsRef, orderBy("timestamp", "asc"));
    
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
        setError('Failed to load comments: ' + error.message);
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
      setError('Failed to post comment: ' + err.message);
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
      setError('Failed to like comment');
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
    <div className="w-full max-w-3xl mx-auto bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 mt-12">
      <div className="flex items-center mb-6">
        <MessageCircle className="text-indigo-400 mr-2" />
        <h2 className="text-xl font-bold text-white">Clients' Reviews</h2>
        <div className="ml-2 bg-indigo-500/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {comments.length}
        </div>
      </div>
      
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
            required
          />
          <div className="flex">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
              rows={2}
              required
            />
            <button
              type="submit"
              disabled={!newComment.trim() || !userName.trim()}
              className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-4 text-white/60">Loading comments...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-400">{error}</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-white/60">Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="bg-indigo-500/30 rounded-full p-2 mr-2">
                    <User size={16} className="text-indigo-300" />
                  </div>
                  <span className="font-medium text-white">{comment.user}</span>
                </div>
                <span className="text-xs text-white/40">{formatTimestamp(comment.timestamp)}</span>
              </div>
              <p className="text-white/80 mb-3">{comment.content}</p>
              <div className="flex items-center text-white/40 text-xs">
                <button 
                  className="flex items-center hover:text-indigo-400 transition"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveChat;