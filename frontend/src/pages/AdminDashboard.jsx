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
  X,
  Clock,
  Filter,
  Search,
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  Briefcase,
  Settings,
  Plus,
  ChevronRight,
  ArrowRight,
  RefreshCcw,
  Pencil,
  Save
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');
  
  // Package Management States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    image: '',
    duration: '',
    description: '',
    category: 'Inbound',
    inclusions: [],
    itinerary: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, packagesRes] = await Promise.all([
        fetch(`${API_URL}/bookings`),
        fetch(`${API_URL}/packages`)
      ]);
      
      if (!bookingsRes.ok) throw new Error('Failed to fetch bookings');
      if (!packagesRes.ok) throw new Error('Failed to fetch packages');
      
      const bookingsData = await bookingsRes.json();
      const packagesData = await packagesRes.json();
      
      if (Array.isArray(bookingsData)) setBookings(bookingsData);
      if (Array.isArray(packagesData)) setPackages(packagesData);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update status');
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking forever?')) return;
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete booking');
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // PACKAGE MANAGEMENT FUNCTIONS
  const handleOpenModal = (pkg = null) => {
    if (pkg) {
      setCurrentPackage(pkg);
      setFormData({
        title: pkg.title || '',
        price: pkg.price || 0,
        image: pkg.image || '',
        duration: pkg.duration || '',
        description: pkg.description || '',
        category: pkg.category || 'Inbound',
        inclusions: pkg.inclusions || [],
        itinerary: pkg.itinerary || []
      });
    } else {
      setCurrentPackage(null);
      setFormData({
        title: '',
        price: 0,
        image: '',
        duration: '',
        description: '',
        category: 'Inbound',
        inclusions: [],
        itinerary: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = currentPackage ? 'PUT' : 'POST';
      const url = currentPackage 
        ? `${API_URL}/packages/${currentPackage._id}` 
        : `${API_URL}/packages`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save package');
      
      const savedPkg = await response.json();
      
      if (currentPackage) {
        setPackages(prev => prev.map(p => p._id === savedPkg._id ? savedPkg : p));
      } else {
        setPackages(prev => [...prev, savedPkg]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour package? This action cannot be undone.')) return;
    try {
      const response = await fetch(`${API_URL}/packages/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete package');
      setPackages(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const stats = {
    totalBookings: bookings.length,
    revenue: bookings.filter(b => b.status === 'confirmed').reduce((acc, b) => acc + (b.totalPrice || 0), 0),
    avgTourPrice: packages.length > 0 ? packages.reduce((acc, p) => acc + (p.price || 0), 0) / packages.length : 0,
    pendingBookings: bookings.filter(b => b.status === 'pending').length
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilter === 'all' || b.status === bookingFilter;
    const safeName = b.clientName?.toLowerCase() || '';
    const safeTitle = b.tourTitle?.toLowerCase() || '';
    const matchesSearch = safeName.includes(searchTerm.toLowerCase()) || 
                          safeTitle.includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{ padding: '0 0.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'hsl(var(--primary))' }}>Serendib Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavItem 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
          />
          <NavItem 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')} 
            icon={<Users size={20} />} 
            label="Bookings" 
          />
          <NavItem 
            active={activeTab === 'tours'} 
            onClick={() => setActiveTab('tours')} 
            icon={<Briefcase size={20} />} 
            label="Packages" 
          />
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button onClick={fetchData} className="nav-item">
            <RefreshCcw size={20} />
            <span>Sync Data</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>Welcome Back!</h1>
                <p style={{ opacity: 0.6 }}>Here's what's happening with your travel business today.</p>
              </div>

              <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<TrendingUp />} trend="+12.5%" />
                <StatCard label="Active Bookings" value={stats.totalBookings} icon={<Users />} trend="+4 this week" />
                <StatCard label="Pending Approval" value={stats.pendingBookings} icon={<Clock />} color="#f59e0b" />
                <StatCard label="Avg. Tour Price" value={`$${Math.round(stats.avgTourPrice)}`} icon={<Calendar />} />
              </div>

              <div className="grid-2">
                <div className="glass-card">
                  <h3 style={{ marginBottom: '1.5rem' }}>Recent Bookings</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {bookings.slice(0, 5).map(b => (
                      <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid hsl(var(--glass-border))' }}>
                        <div>
                          <div style={{ fontWeight: '700' }}>{b.clientName}</div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{b.tourTitle}</div>
                        </div>
                        <div className={`badge badge-${b.status}`}>{b.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card">
                  <h3 style={{ marginBottom: '1.5rem' }}>Popular Packages</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {packages.slice(0, 5).map(p => (
                      <div key={p._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                          <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{p.title}</div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{p.duration} • ${p.price}</div>
                        </div>
                        <ChevronRight size={16} style={{ opacity: 0.3 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>Manage Bookings</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} size={18} />
                    <input 
                      type="text" 
                      placeholder="Search customers..." 
                      className="form-control" 
                      style={{ paddingLeft: '3rem', borderRadius: '999px', width: '300px' }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setBookingFilter(f)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '999px',
                      backgroundColor: bookingFilter === f ? 'hsl(var(--primary))' : 'white',
                      color: bookingFilter === f ? 'white' : 'hsl(var(--primary))',
                      border: '1px solid hsl(var(--primary) / 0.1)',
                      fontWeight: '700',
                      textTransform: 'capitalize',
                      cursor: 'pointer'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AnimatePresence>
                  {filteredBookings.map(b => (
                    <motion.div 
                      key={b._id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card" 
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'center', padding: '1.5rem 2rem' }}
                    >
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{b.clientName}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.6, marginTop: '0.4rem' }}>
                          <Mail size={14} /> {b.email}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>{b.tourTitle}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.6, marginTop: '0.4rem' }}>
                          <Calendar size={14} /> {new Date(b.bookingDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className={`badge badge-${b.status}`}>{b.status}</div>
                        <div style={{ fontWeight: '800', marginTop: '0.5rem' }}>${b.totalPrice?.toLocaleString()}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {b.status === 'pending' && (
                          <button onClick={() => updateBookingStatus(b._id, 'confirmed')} className="btn" style={{ background: '#10b981', color: 'white', padding: '0.5rem' }}>
                            <CheckCircle2 size={18} />
                          </button>
                        )}
                        <button onClick={() => handleDeleteBooking(b._id)} className="btn" style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'tours' && (
            <motion.div
              key="tours"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>Tour Packages</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary">
                  <Plus size={20} /> Add Package
                </button>
              </div>

              <div className="grid-layout">
                {packages.map(p => (
                  <div key={p._id} className="glass-card" style={{ padding: '1rem' }}>
                    <div style={{ width: '100%', height: '180px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="badge badge-pending" style={{ marginBottom: '0.75rem', background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {p.category}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <div className="stat-value" style={{ fontSize: '1.25rem' }}>${p.price}</div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenModal(p)} className="btn" style={{ padding: '0.5rem', background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDeletePackage(p._id)} className="btn" style={{ padding: '0.5rem', background: '#fee2e2', color: '#ef4444' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit/Add Package Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card"
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '2.5rem',
                  position: 'relative'
                }}
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer', background: 'none', border: 'none', opacity: 0.5 }}
                >
                  <X size={24} />
                </button>

                <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem' }}>
                  {currentPackage ? 'Edit Package' : 'Add New Package'}
                </h2>

                <form onSubmit={handleSavePackage} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>Title</label>
                      <input 
                        required
                        className="form-control"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Premium Island Tour"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>Category</label>
                      <select 
                        className="form-control"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Inbound">Inbound</option>
                        <option value="Outbound">Outbound</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>Price ($)</label>
                      <input 
                        required
                        type="number"
                        className="form-control"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>Duration</label>
                      <input 
                        required
                        className="form-control"
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="7 Days / 6 Nights"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>Image URL</label>
                    <input 
                      required
                      className="form-control"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>Description</label>
                    <textarea 
                      required
                      className="form-control"
                      style={{ minHeight: '100px', resize: 'vertical' }}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>
                      Inclusions (Comma separated)
                    </label>
                    <textarea 
                      className="form-control"
                      style={{ minHeight: '60px', resize: 'vertical' }}
                      value={formData.inclusions.join(', ')}
                      onChange={e => setFormData({ ...formData, inclusions: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                      placeholder="Hotel breakfast, Private car, Tour guide..."
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.6 }}>
                      Itinerary JSON (Advanced)
                    </label>
                    <textarea 
                      className="form-control"
                      style={{ minHeight: '120px', fontSize: '0.8rem', fontFamily: 'monospace' }}
                      value={JSON.stringify(formData.itinerary, null, 2)}
                      onChange={e => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setFormData({ ...formData, itinerary: parsed });
                        } catch (err) {
                          // Allow typing invalid JSON temporarily
                          const newVal = e.target.value;
                          setFormData(prev => ({ ...prev, _rawItinerary: newVal }));
                        }
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn" 
                      style={{ flex: 1, background: 'hsl(var(--glass-border))' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary" 
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }) {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, icon, trend, color }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '0.75rem', 
          backgroundColor: color ? `${color}15` : 'hsl(var(--primary) / 0.1)', 
          color: color || 'hsl(var(--primary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        {trend && (
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {trend}
          </div>
        )}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
