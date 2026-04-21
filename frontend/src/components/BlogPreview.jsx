import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, BookOpen } from 'lucide-react';
import SectionHeader from './SectionHeader';
import API_URL from '../config';

const BlogPreview = ({ title, accentColor = 'hsl(var(--primary))' }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/blogs`)
      .then(async (r) => {
        if (!r.ok) return [];
        const ct = r.headers.get('content-type') || '';
        if (!ct.includes('application/json')) return [];
        const data = await r.json();
        return Array.isArray(data) ? data : [];
      })
      .then((list) => {
        if (!cancelled) setBlogs(list.filter((b) => b.status === 'published').slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setBlogs([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section style={{ padding: '80px 0' }}>
        <SectionHeader title={title} center accentColor={accentColor} />
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <p>Loading stories…</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section style={{ padding: '80px 0' }}>
        <SectionHeader title={title} center accentColor={accentColor} />
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <p>No published posts yet. Add some in the admin Blog tab.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '80px 0' }}>
      <SectionHeader title={title} center={true} accentColor={accentColor} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginTop: '3rem',
        }}
      >
        {blogs.map((blog, i) => (
          <Link key={blog._id} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '2.5rem',
                borderRadius: '2rem',
                backgroundColor: 'hsl(var(--primary) / 0.02)',
                border: '1px solid hsl(var(--glass-border))',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                  opacity: 0.5,
                  fontWeight: 700,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} />
                  <span>
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : '—'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} />
                  <span>{blog.author || 'Serendib'}</span>
                </div>
              </div>
              <h4
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  marginBottom: '1rem',
                  color: 'hsl(var(--secondary))',
                  lineHeight: 1.3,
                }}
              >
                {blog.title}
              </h4>
              <p style={{ fontSize: '1rem', opacity: 0.6, lineHeight: 1.6, marginBottom: '2rem' }}>
                {blog.excerpt}
              </p>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: accentColor,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Read on blog <ArrowUpRight size={18} />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
