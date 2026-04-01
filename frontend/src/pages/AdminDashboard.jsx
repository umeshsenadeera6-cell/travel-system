import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../config';
import { 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter, 
  Search, 
  AlertCircle,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/bookings`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete booking');
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    revenue: bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0),
    guests: bookings.reduce((acc, b) => acc + (b.guests || 0), 0),
    pending: bookings.filter(b => b.status === 'pending').length
  };

  return (
    <div style={{ padding: '8rem 2rem', backgroundColor: 'hsl(var(--primary) / 0.02)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        
        {/* Dashboard Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'hsl(var(--secondary))', marginBottom: '0.5rem' }}>
              Admin Dashboard
            </h1>
            <p style={{ opacity: 0.6 }}>Manage all tour bookings and inquiries from here.</p>
          </div>
          <button onClick={fetchBookings} className="btn " style={{ backgroundColor: 'white', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {[
            { label: 'Total Bookings', value: stats.total, icon: Users, color: 'hsl(var(--primary))' },
            { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: '#10b981' },
            { label: 'Total Guests', value: stats.guests, icon: Calendar, color: '#3b82f6' },
            { label: 'Pending Action', value: stats.pending, icon: AlertCircle, color: '#f59e0b' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                border: `1px solid ${stat.color}15`
              }}
            >
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '1rem', 
                backgroundColor: `${stat.color}15`, 
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.6, fontWeight: '600' }}>{stat.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Search */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          backgroundColor: 'white',
          padding: '1.25rem 2rem',
          borderRadius: '1.25rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: filter === f ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.05)',
                  color: filter === f ? 'white' : 'hsl(var(--primary))',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: '0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '999px',
                border: '1px solid hsl(var(--border))',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Content Table/List */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>Loading bookings...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red', padding: '5rem' }}>Error: {error}</div>
        ) : filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'white', borderRadius: '2rem', opacity: 0.5 }}>
            No bookings found matching your criteria.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr auto',
                    alignItems: 'center',
                    gap: '2rem',
                    border: '1px solid hsl(var(--border))'
                  }}
                >
                  {/* Client Info */}
                  <div style={{ borderRight: '1px solid hsl(var(--border))', paddingRight: '2rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'hsl(var(--secondary))', marginBottom: '0.75rem' }}>
                      {booking.clientName}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.7 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={14} /> {booking.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={14} /> {booking.phone}
                      </div>
                    </div>
                  </div>

                  {/* Tour Info */}
                  <div style={{ borderRight: '1px solid hsl(var(--border))', paddingRight: '2rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'hsl(var(--primary))', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={18} /> {booking.tourTitle}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.7 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} /> Preferred: {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={14} /> Guests: {booking.guests}
                      </div>
                    </div>
                  </div>

                  {/* Booking Status & Price */}
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'hsl(var(--foreground))', marginBottom: '0.75rem' }}>
                      ${booking.totalPrice?.toLocaleString()}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '999px', backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
                      <Clock size={12} /> {booking.status}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      onClick={() => handleDelete(booking._id)}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        border: 'none', 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      style={{ 
                        padding: '0 1.25rem',
                        height: '40px',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Action
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
