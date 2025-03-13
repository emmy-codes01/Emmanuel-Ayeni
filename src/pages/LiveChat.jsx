import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, ThumbsUp, User } from 'lucide-react';

// In a real implementation, you would use a database/backend service
// like Firebase, Supabase, or your own custom backend
// This example demonstrates the UI and structure

const LiveChat = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching comments from an API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        // In a real app, replace with actual API call
        // const response = await fetch('https://your-api.com/comments');
        // const data = await response.json();
        
        // Simulated response data
        const data = [
          { id: 1, user: 'Sarah Johnson', content: 'Love your website design! The dark theme with indigo accents looks amazing.', timestamp: new Date(Date.now() - 840000000), likes: 12 },
          { id: 2, user: 'Michael Chen', content: 'Your portfolio projects are impressive. Would love to collaborate sometime!', timestamp: new Date(Date.now() - 420000000), likes: 8 },
          { id: 3, user: 'Olivia Rodriguez', content: 'Just reached out via WhatsApp. Looking forward to discussing my project with you.', timestamp: new Date(Date.now() - 120000000), likes: 5 }
        ];
        
        setComments(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load comments');
        setIsLoading(false);
      }
    };
    
    fetchComments();
    
    // For live updates, you would use a real-time connection
    // Example with WebSockets or Firebase:
    // const unsubscribe = onCommentsUpdate(newComments => {
    //   setComments(newComments);
    // });
    // return () => unsubscribe();
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;
    
    // Optimistically add comment to UI
    const newCommentObj = {
      id: Date.now(),
      user: userName,
      content: newComment,
      timestamp: new Date(),
      likes: 0
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    
    try {
      // In a real app, send to backend
      // await fetch('https://your-api.com/comments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user: userName,
      //     content: newComment
      //   }),
      // });
      
      // If failed, you could revert the optimistic update
    } catch (err) {
      setError('Failed to post comment');
      // Remove the optimistically added comment
      setComments(comments.filter(comment => comment.id !== newCommentObj.id));
    }
  };

  const formatTimestamp = (timestamp) => {
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
        <h2 className="text-xl font-bold text-white">Comments</h2>
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
                <button className="flex items-center hover:text-indigo-400 transition">
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{comment.likes}</span>
                </button>
                {/* Additional actions could go here */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveChat;