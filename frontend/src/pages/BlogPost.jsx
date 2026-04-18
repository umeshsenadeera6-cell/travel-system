import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2, User, BookOpen } from 'lucide-react';
import API_URL from '../config';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch(`${API_URL}/blogs/${slug}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then(data => {
        if (data) {
          setBlog(data);
          // Fetch related by category
          return fetch(`${API_URL}/blogs`).then(r => r.json());
        }
      })
      .then(all => {
        if (all && blog) {
          setRelated(all.filter(b => b._id !== blog._id && b.category === blog.category).slice(0, 3));
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: blog.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div className="loader" />
        <p style={{ color: '#94a3b8' }}>Loading article...</p>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
        <BookOpen size={64} style={{ color: '#cbd5e1' }} />
        <h2 style={{ color: '#0f172a', fontWeight: '900' }}>Article not found</h2>
        <p style={{ color: '#64748b' }}>This article may have been removed or the link is incorrect.</p>
        <Link to="/blog" style={{ color: 'hsl(var(--primary))', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        width: '100%',
        height: '480px',
        background: blog.coverImage
          ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.65)), url(${blog.coverImage}) center/cover`
          : 'linear-gradient(135deg, hsl(var(--primary)), #6366f1)',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '4rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {blog.category && (
              <span style={{ background: 'hsl(var(--primary))', color: 'white', padding: '0.35rem 1rem', borderRadius: '2rem', fontSize: '0.78rem', fontWeight: '800' }}>
                {blog.category}
              </span>
            )}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: '900', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}
          >
            {blog.title}
          </motion.h1>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} /> {blog.author || 'Serendib Travel'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </span>
            {blog.readTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} /> {blog.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Share Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', border: '2px solid #e2e8f0', background: 'white', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: '700', color: '#64748b', fontSize: '0.85rem' }}>
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* Excerpt */}
        <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.8, fontWeight: '500', borderLeft: '4px solid hsl(var(--primary))', paddingLeft: '1.5rem', marginBottom: '3rem', fontStyle: 'italic' }}>
          {blog.excerpt}
        </p>

        {/* Main Content */}
        <div
          className="blog-content"
          style={{ color: '#334155', lineHeight: 1.9, fontSize: '1.05rem' }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ color: '#94a3b8', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={14} /> Tags
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {blog.tags.map(tag => (
                <Link key={tag} to={`/blog?tag=${tag}`} style={{ background: '#f1f5f9', color: '#475569', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}>
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--primary))', fontWeight: '800', textDecoration: 'none', fontSize: '1rem' }}>
            <ArrowLeft size={20} /> Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
