import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, Calendar, Users, Phone, Mail, User, Info, CheckCircle2 } from 'lucide-react';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tour } = location.state || {};

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    bookingDate: '',
    guests: 1,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!tour) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Tour Selected</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tourId: tour._id,
          tourTitle: tour.title,
          totalPrice: tour.price * formData.guests
        })
      });

      if (!response.ok) throw new Error('Failed to submit booking');

      setIsSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ 
        padding: '8rem 2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          style={{ color: 'hsl(var(--primary))', marginBottom: '2rem' }}
        >
          <CheckCircle2 size={80} />
        </motion.div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'hsl(var(--secondary))' }}>
          Booking Confirmed!
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, textAlign: 'center', maxWidth: '500px', marginBottom: '2rem' }}>
          Thank you for choosing Serendib Travel. We have received your booking for <strong>{tour.title}</strong> and will contact you shortly.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary">Return Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '8rem 2rem', backgroundColor: 'hsl(var(--primary) / 0.02)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'none', 
            border: 'none', 
            color: 'hsl(var(--primary))',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          <ChevronLeft size={20} /> Back to Tour
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Summary Sidebar */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '2rem', 
            boxShadow: '0 15px 35px -10px rgba(0,0,0,0.05)',
            border: '1px solid hsl(var(--primary) / 0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))' }}>
              Booking Summary
            </h3>
            <img 
              src={tour.image} 
              alt={tour.title} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '1.5rem' }} 
            />
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem' }}>{tour.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Price per person</span>
                <span>${tour.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Number of guests</span>
                <span>x {formData.guests}</span>
              </div>
              <div style={{ borderTop: '1px dashed hsl(var(--border))', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: 'hsl(var(--primary))' }}>
                  <span>Total Amount</span>
                  <span>${tour.price * formData.guests}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '3rem', 
            borderRadius: '2rem', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' 
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem', color: 'hsl(var(--secondary))' }}>
              Confirm Your Trip
            </h2>
            <p style={{ opacity: 0.6, marginBottom: '2.5rem' }}>
              Please fill in your details to finalize your booking with Serendib Travel.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="grid-2">
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                    <User size={16} /> Full Name*
                  </label>
                  <input 
                    type="text" 
                    name="clientName" 
                    required 
                    value={formData.clientName} 
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                    <Mail size={16} /> Email Address*
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                    <Phone size={16} /> Phone Number*
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="+94 XX XXX XXXX"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                    <Calendar size={16} /> Preferred Date*
                  </label>
                  <input 
                    type="date" 
                    name="bookingDate" 
                    required 
                    value={formData.bookingDate} 
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                  <Users size={16} /> Number of Guests*
                </label>
                <input 
                  type="number" 
                  name="guests" 
                  min="1" 
                  required 
                  value={formData.guests} 
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                  <Info size={16} /> Special Requests
                </label>
                <textarea 
                  name="specialRequests" 
                  rows="4" 
                  value={formData.specialRequests} 
                  onChange={handleChange}
                  placeholder="Any dietary requirements, accessibility needs, or extra requests..."
                  className="form-control"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {error && (
                <div style={{ color: 'red', fontSize: '0.9rem', padding: '1rem', backgroundColor: 'rgba(255,0,0,0.05)', borderRadius: '1rem' }}>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '1.25rem', 
                  fontSize: '1.1rem', 
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem'
                }}
              >
                {isSubmitting ? 'Processing...' : 'Complete Booking'} <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
