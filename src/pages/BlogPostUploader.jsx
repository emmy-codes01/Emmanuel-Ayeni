import React, { useState } from 'react';
import { Upload, Check, AlertCircle, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BlogPostUploader = () => {
  // State for form inputs
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // State for image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setNotification({
        type: 'error',
        message: 'Please select an image file.'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        type: 'error',
        message: 'Image must be smaller than 5MB.'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUploadProgress(0);
  };

  // Function to handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setNotification({
        type: 'error',
        message: 'Content is required.'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `blog-images/${Date.now()}_${imageFile.name}`);
        
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Add post to Firestore
      const db = getFirestore();
      await addDoc(collection(db, "blogPosts"), {
        content,
        readTime,
        imageUrl,
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: []
      });

      setNotification({
        type: 'success',
        message: 'Post published successfully!'
      });

      // Reset form
      setContent('');
      setReadTime('5 min read');
      setImageFile(null);
      setImagePreview(null);
      setImageUploadProgress(0);
      
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error publishing post:", error);
      setNotification({
        type: 'error',
        message: 'Failed to publish post: ' + error.message
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderNotification = () => {
    if (!notification) return null;

    const { type, message } = notification;
    const bgColor = type === 'success' ? 'bg-green-500/10' : 'bg-red-500/10';
    const borderColor = type === 'success' ? 'border-green-500/20' : 'border-red-500/20';
    const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';
    const Icon = type === 'success' ? Check : AlertCircle;

    return (
      <div className={`mb-6 flex items-center justify-center py-3 ${bgColor} border ${borderColor} rounded-xl transition-all`}>
        <Icon size={18} className={`${textColor} mr-2`} />
        <p className={textColor}>{message}</p>
      </div>
    );
  };

  // Render content with simple formatting
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-indigo-500/20 rounded-2xl p-6 mt-12 shadow-xl shadow-indigo-500/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center">
          <div className="absolute -left-2 -top-2 w-10 h-10 bg-indigo-500 rounded-full blur-xl opacity-30"></div>
          <Upload className="text-indigo-400 mr-3" size={22} />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Create New Post</h1>
            <p className="text-white/60 text-sm">Share your thoughts with the world</p>
          </div>
        </div>
        
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-white/60 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>

      {renderNotification()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="content" className="block text-white mb-2">Post Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-56"
                placeholder="Write your post content..."
              ></textarea>
              <p className="text-white/60 text-xs mt-2">
                Formatting: Use *text* for italic, **text** for bold, and URLs will be auto-linked
              </p>
            </div>
            
            {/* Image upload section */}
            <div>
              <label className="block text-white mb-2">Image (optional)</label>
              <div className="flex items-center">
                <div className="flex-grow">
                  {imageFile ? (
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded overflow-hidden mr-3">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-sm truncate">{imageFile.name}</p>
                        <p className="text-white/60 text-xs">
                          {(imageFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="text-white/60 hover:text-red-400 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full bg-white/5 border border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:border-indigo-500/40 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                      <ImageIcon size={22} className="text-indigo-400 mr-3" />
                      <span className="text-white/80">Click to upload an image</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="readTime" className="block text-white mb-2">Read Time</label>
              <select
                id="readTime"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="1 min read">1 min read</option>
                <option value="3 min read">3 min read</option>
                <option value="5 min read">5 min read</option>
                <option value="10 min read">10 min read</option>
                <option value="15+ min read">15+ min read</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:bg-indigo-800/50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Upload size={18} className="mr-2" />
                  Publish Post
                </>
              )}
            </button>
          </form>
        </div>
        
        {/* Preview Section */}
        <div className="lg:block">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Preview</h3>
            <div className="mt-4">
              {imagePreview && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Post image" className="w-full h-auto" />
                </div>
              )}
              <div className="prose prose-lg prose-invert max-w-none text-white/90">
                {content ? (
                  renderContent(content)
                ) : (
                  <p className="text-white/50 italic">Post content will appear here...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostUploader;