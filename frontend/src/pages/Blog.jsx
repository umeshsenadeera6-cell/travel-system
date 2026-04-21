import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, BookOpen } from 'lucide-react';
import API_URL from '../config';
import SubHero from '../components/SubHero';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then(async (r) => {
        if (!r.ok) return [];
        const ct = r.headers.get('content-type') || '';
        if (!ct.includes('application/json')) return [];
        const data = await r.json();
        return Array.isArray(data) ? data : [];
      })
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

  const filtered = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <SubHero
        title="Travel Blog"
        subtitle="Stories, tips, and guides to inspire your next adventure"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.85rem 1rem 0.85rem 3rem',
                border: '2px solid #e2e8f0', borderRadius: '1rem',
                fontSize: '0.95rem', outline: 'none', background: 'white',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '2rem',
                  border: '2px solid',
                  borderColor: selectedCategory === cat ? 'hsl(var(--primary))' : '#e2e8f0',
                  background: selectedCategory === cat ? 'hsl(var(--primary))' : 'white',
                  color: selectedCategory === cat ? 'white' : '#64748b',
                  fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#94a3b8' }}>
            <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Loading articles...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <BookOpen size={64} style={{ marginBottom: '1.5rem', color: '#cbd5e1' }} />
            <h3 style={{ color: '#64748b', fontWeight: '700', marginBottom: '0.5rem' }}>
              {search || selectedCategory !== 'All' ? 'No articles match your search' : 'No articles yet'}
            </h3>
            <p style={{ color: '#94a3b8' }}>
              {search || selectedCategory !== 'All' ? 'Try a different search term or category.' : 'Check back soon for travel stories and tips!'}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {filtered.length > 0 && !search && selectedCategory === 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '3rem' }}
              >
                <FeaturedCard blog={filtered[0]} />
              </motion.div>
            )}

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {(search || selectedCategory !== 'All' ? filtered : filtered.slice(1)).map((blog, i) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function FeaturedCard({ blog }) {
  return (
    <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        borderRadius: '1.5rem',
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '380px',
        transition: 'transform 0.3s, box-shadow 0.3s'
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'; }}
      >
        <div style={{
          background: blog.coverImage ? `url(${blog.coverImage}) center/cover` : 'linear-gradient(135deg, hsl(var(--primary)), #6366f1)',
          minHeight: '300px'
        }} />
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', padding: '0.3rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '800' }}>
              ⭐ FEATURED
            </span>
            {blog.category && (
              <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.3rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '700' }}>
                {blog.category}
              </span>
            )}
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.3 }}>
            {blog.title}
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.5rem' }}>{blog.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.82rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={14} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
            </span>
            {blog.readTime && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {blog.readTime}</span>}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--primary))', fontWeight: '800', fontSize: '0.9rem' }}>
            Read Article <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        borderRadius: '1.25rem', overflow: 'hidden', background: 'white',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)', height: '100%',
        transition: 'transform 0.3s, box-shadow 0.3s', display: 'flex', flexDirection: 'column'
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}
      >
        <div style={{
          height: '220px',
          background: blog.coverImage ? `url(${blog.coverImage}) center/cover` : 'linear-gradient(135deg, hsl(var(--primary)), #6366f1)',
          position: 'relative'
        }}>
          {blog.category && (
            <span style={{
              position: 'absolute', top: '1rem', left: '1rem',
              background: 'white', color: '#0f172a', padding: '0.3rem 0.75rem',
              borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '800'
            }}>
              {blog.category}
            </span>
          )}
        </div>
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
            </span>
            {blog.readTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={13} /> {blog.readTime}
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.6rem', lineHeight: 1.4 }}>
            {blog.title}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
            {blog.excerpt}
          </p>
          {blog.tags && blog.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {blog.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{ background: '#f8fafc', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: '700' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--primary))', fontWeight: '800', fontSize: '0.85rem' }}>
            Read More <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
