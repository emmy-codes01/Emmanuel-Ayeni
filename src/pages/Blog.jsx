import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, User, Home, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  updateDoc,
  doc,
  increment,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';

// Firebase configuration - using your existing config
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

const Blog = () => {
  React.useEffect(() => {
    // Set page title when component mounts
    document.title = "Emmanuel's Blog";
    
    // Reset title when component unmounts
    return () => {
      document.title = "Emmanuel Ayeni";
    };
  }, []);

  const currentYear = new Date().getFullYear();

  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for user ID
  const [userId, setUserId] = useState('');

  // Generate a unique user ID for the current session if not already set
  useEffect(() => {
    const storedUserId = localStorage.getItem('blogUserId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('blogUserId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  // Fetch all blog posts
  useEffect(() => {
    const postsRef = collection(db, "blogPosts");
    const postsQuery = query(postsRef, orderBy("timestamp", "desc"));
    
    try {
      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
          likedByCurrentUser: doc.data().likedBy?.includes(userId) || false
        }));
        
        setBlogPosts(postsData);
        setIsLoading(false);
      }, (error) => {
        console.error("Error listening to posts:", error);
        setError('Failed to load blog posts: ' + error.message);
        setIsLoading(false);
      });
      
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up blog posts listener:", err);
      setError('Failed to connect to database');
      setIsLoading(false);
    }
  }, [userId]);
    
    const handleLikePost = async (postId) => {
    try {
      // Get the post document
      const postRef = doc(db, "blogPosts", postId);
      const postSnap = await getDoc(postRef);
      
      // Check if user already liked this post
      if (postSnap.exists() && postSnap.data().likedBy?.includes(userId)) {
        setError('You have already liked this post');
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      // Update the post with new like count and add user to likedBy array
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId)
      });
      
      // Update local state to reflect the change
      setBlogPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? {...post, likes: post.likes + 1, likedByCurrentUser: true} 
            : post
        )
      );
      
      // If this is the selected post, update it too
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(prev => ({
          ...prev, 
          likes: prev.likes + 1,
          likedByCurrentUser: true
        }));
      }
    } catch (err) {
      console.error("Error liking post:", err);
      setError('Failed to like post');
      setTimeout(() => setError(null), 3000);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
    
  // Truncate text for blog previews
  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Content with Markdown-like rendering for simple formatting
  const renderContent = (content) => {
    if (!content) return '';

    // Replace URLs with clickable links
    let formatted = content.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">$1</a>'
    );
    
    // Replace **bold** with <strong>
    formatted = formatted.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong>$1</strong>'
    );
    
    // Replace *italic* with <em>
    formatted = formatted.replace(
      /\*(.*?)\*/g, 
      '<em>$1</em>'
    );
    
    // Replace newlines with <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  const BlogPostsList = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Latest Posts</h2>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-white/60">Loading blog posts...</p>
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <MessageCircle className="mx-auto text-white/30 mb-3" size={28} />
          <p className="text-white/60">No blog posts available yet.</p>
        </div>
      ) : (
        blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
            
            <div className="flex items-center text-[8px] text-white/60 text-sm mb-3">
              <Calendar size={14} className="mr-1" />
              <span className="mr-3">{formatDate(post.timestamp)}</span>
              <User size={14} className="mr-1" />
              <span>Emmy</span>
            </div>
            
            <div className="prose prose-sm prose-invert max-w-none mb-4 text-white/80">
              {renderContent(truncateText(post.content))}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <button 
                  className={`flex items-center transition-colors ${
                    post.likedByCurrentUser 
                      ? 'text-indigo-400 cursor-default' 
                      : 'text-white/60 hover:text-indigo-400'
                  }`}
                  onClick={() => !post.likedByCurrentUser && handleLikePost(post.id)}
                  disabled={post.likedByCurrentUser}
                >
                  <ThumbsUp 
                    size={18} 
                    className={`mr-1.5 ${post.likedByCurrentUser ? 'fill-indigo-400' : ''}`} 
                  />
                  <span>{post.likes || 0}</span>
                </button>
              </div>
              
              <button 
                onClick={() => setSelectedPost(post)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full px-4 py-2 transition"
              >
                Read More
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    );
    
    const BlogPostDetail = () => {
    if (!selectedPost) return null;
    
    return (
      <div className="w-full">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center text-white/60 hover:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to posts
        </button>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">{selectedPost.title}</h2>
          
          <div className="flex items-center text-white/60 text-sm mb-6">
            <Calendar size={16} className="mr-1" />
            <span className="mr-4">{formatDate(selectedPost.timestamp)}</span>
            <Clock size={16} className="mr-1" />
            <span>{selectedPost.readTime || '5 min read'}</span>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-none mb-8 text-white/90">
            {renderContent(selectedPost.content)}
          </div>
          
          <div className="flex items-center space-x-4 mb-8">
            <button 
              className={`flex items-center transition-colors ${
                selectedPost.likedByCurrentUser 
                  ? 'text-indigo-400 cursor-default' 
                  : 'text-white/60 hover:text-indigo-400'
              }`}
              onClick={() => !selectedPost.likedByCurrentUser && handleLikePost(selectedPost.id)}
              disabled={selectedPost.likedByCurrentUser}
            >
              <ThumbsUp 
                size={20} 
                className={`mr-1.5 ${selectedPost.likedByCurrentUser ? 'fill-indigo-400' : ''}`} 
              />
              <span>{selectedPost.likes || 0} likes</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-indigo-500/20 rounded-2xl p-6 mt-12 shadow-xl shadow-indigo-500/10">
      {/* Header with glow effect */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center">
          <div className="absolute -left-2 -top-2 w-10 h-10 bg-indigo-500 rounded-full blur-xl opacity-30"></div>
          <MessageCircle className="text-indigo-400 mr-3" size={22} />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Emmanuel's Blog</h1>
            <p className="text-white/60 text-sm">Thoughts, ideas, and tech insights</p>
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-6 text-center py-3 bg-red-500/10 border border-red-500/20 rounded-xl transition-all">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      {/* Main content - either post list or single post */}
      {selectedPost ? <BlogPostDetail /> : <BlogPostsList />}
      
      {/* Floating action button */}
      <div className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full p-3 shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-110 transition-transform duration-200">
        <Link to='/'>
          <Home size={30} className="text-white" />
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full bg-transparent py-6 border-t border-gray-800 mt-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left side - Copyright and name */}
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-400 text-sm">
                <span className="font-medium text-white">Emmanuel Ayeni</span> © {currentYear} All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;