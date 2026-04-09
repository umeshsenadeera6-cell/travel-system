import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../config';
import AdminLogin from '../components/AdminLogin';
import { RevenueChart, CategoryDistribution } from '../components/DashboardCharts';
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
  Save,
  LogOut,
  ExternalLink,
  DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_session') === 'active');
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
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('admin_session', 'active');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_session');
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

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

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
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Premium Sidebar */}
      <aside className="admin-sidebar" style={{ width: '280px', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <div style={{ padding: '0 0.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'hsl(var(--primary))', borderRadius: '0.5rem' }}></div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a' }}>Serendib</h2>
          </div>
          <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Management Portal</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavItem 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
          />
          <NavItem 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')} 
            icon={<Calendar size={20} />} 
            label="Bookings" 
          />
          <NavItem 
            active={activeTab === 'tours'} 
            onClick={() => setActiveTab('tours')} 
            icon={<Briefcase size={20} />} 
            label="Tour Packages" 
          />
          <NavItem 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            icon={<Settings size={20} />} 
            label="Configuration" 
          />
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
          <button onClick={handleLogout} className="admin-nav-item" style={{ color: '#ef4444' }}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '3rem', marginLeft: '280px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p style={{ color: '#64748b' }}>
              Welcome back, Admin. Here's your business performance today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={fetchData} className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b' }}>
              <RefreshCcw size={18} /> Sync
            </button>
            <button onClick={() => window.open('/', '_blank')} className="btn btn-primary" style={{ gap: '0.75rem' }}>
              View Site <ExternalLink size={18} />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard 
                  label="Total Revenue" 
                  value={`$${stats.revenue.toLocaleString()}`} 
                  icon={<DollarSign size={24} />} 
                  trend="+12.5%" 
                  className="stat-gradient-1"
                />
                <StatCard 
                  label="Total Bookings" 
                  value={stats.totalBookings} 
                  icon={<Users size={24} />} 
                  trend="+4 this week" 
                  className="stat-gradient-2"
                />
                <StatCard 
                  label="Pending Confirmation" 
                  value={stats.pendingBookings} 
                  icon={<Clock size={24} />} 
                  className="stat-gradient-3"
                />
                <StatCard 
                  label="Average Package" 
                  value={`$${Math.round(stats.avgTourPrice)}`} 
                  icon={<Briefcase size={24} />} 
                  className="stat-gradient-4"
                />
              </div>

              {/* Charts Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontWeight: '800' }}>Revenue Trend</h3>
                    <select style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: '600' }}>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <RevenueChart data={[
                    { label: 'Mon', value: 1200 },
                    { label: 'Tue', value: 1900 },
                    { label: 'Wed', value: 1500 },
                    { label: 'Thu', value: 2500 },
                    { label: 'Fri', value: 2200 },
                    { label: 'Sat', value: 3800 },
                    { label: 'Sun', value: 4200 },
                  ]} />
                </div>
                <div className="admin-card">
                  <h3 style={{ fontWeight: '800', marginBottom: '2rem' }}>Tour Categories</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                    <CategoryDistribution data={[
                      { label: 'Inbound', value: packages.filter(p => p.category === 'Inbound').length, color: 'hsl(var(--primary))' },
                      { label: 'Outbound', value: packages.filter(p => p.category === 'Outbound').length, color: '#6366f1' },
                    ]} />
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="admin-card">
                  <h3 style={{ fontWeight: '800', marginBottom: '1.5rem' }}>Recent Activity</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {bookings.slice(0, 5).map(b => (
                      <div key={b._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                          👤
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>{b.clientName} booked {b.tourTitle}</p>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(b.bookingDate).toLocaleDateString()}</p>
                        </div>
                        <div className={`badge badge-${b.status}`} style={{ fontSize: '0.65rem' }}>{b.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="admin-card">
                  <h3 style={{ fontWeight: '800', marginBottom: '1.5rem' }}>Top Packages</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {packages.slice(0, 5).map(p => (
                      <div key={p._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', overflow: 'hidden' }}>
                          <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>{p.title}</p>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.duration} • ${p.price}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '0.9rem', fontWeight: '800' }}>$12.4k</p>
                          <p style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '700' }}>↑ 4.2%</p>
                        </div>
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
              <div className="admin-card" style={{ padding: '0' }}>
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                      <button 
                        key={f} 
                        onClick={() => setBookingFilter(f)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.75rem',
                          backgroundColor: bookingFilter === f ? '#0f172a' : '#f1f5f9',
                          color: bookingFilter === f ? 'white' : '#64748b',
                          border: 'none',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          textTransform: 'capitalize',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div style={{ position: 'relative', width: '300px' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input 
                      type="text" 
                      placeholder="Search customers..." 
                      className="form-control" 
                      style={{ paddingLeft: '3rem', borderRadius: '0.75rem', background: '#f8fafc' }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-table-container" style={{ border: 'none', borderRadius: '0' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Tour Package</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map(b => (
                        <tr key={b._id}>
                          <td>
                            <div style={{ fontWeight: '800', color: '#0f172a' }}>{b.clientName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.email}</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>{b.tourTitle}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{new Date(b.bookingDate).toLocaleDateString()}</div>
                          </td>
                          <td>
                            <div className={`badge badge-${b.status}`}>{b.status}</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: '800' }}>${b.totalPrice?.toLocaleString()}</div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              {b.status === 'pending' && (
                                <button onClick={() => updateBookingStatus(b._id, 'confirmed')} className="btn" style={{ background: '#f0fdf4', color: '#15803d', padding: '0.5rem' }}>
                                  <CheckCircle2 size={18} />
                                </button>
                              )}
                              <button onClick={() => handleDeleteBooking(b._id)} className="btn" style={{ background: '#fef2f2', color: '#ef4444', padding: '0.5rem' }}>
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ gap: '0.75rem' }}>
                  <Plus size={20} /> Create New Package
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {packages.map(p => (
                  <div key={p._id} className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                      <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }} className="badge badge-pending">
                        {p.category}
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>{p.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {p.duration}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> Sri Lanka</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>${p.price}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleOpenModal(p)} className="btn" style={{ padding: '0.6rem', background: '#f1f5f9', color: '#64748b' }}>
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDeletePackage(p._id)} className="btn" style={{ padding: '0.6rem', background: '#fef2f2', color: '#ef4444' }}>
                            <Trash2 size={18} />
                          </button>
                        </div>
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
                padding: '2rem',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="admin-card"
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '3rem',
                  position: 'relative'
                }}
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ position: 'absolute', top: '2rem', right: '2rem', cursor: 'pointer', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}
                >
                  <X size={20} />
                </button>

                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '2.5rem', color: '#0f172a' }}>
                  {currentPackage ? 'Update Package' : 'Create New Package'}
                </h2>

                <form onSubmit={handleSavePackage} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '0.5rem' }}>Service Title</label>
                      <input 
                        required
                        className="form-control"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Cultural Triangle Experience"
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '0.5rem' }}>Category</label>
                      <select 
                        className="form-control"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Inbound">Inbound (Local)</option>
                        <option value="Outbound">Outbound (International)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '0.5rem' }}>Pricing (USD)</label>
                      <div style={{ position: 'relative' }}>
                        <DollarSign size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input 
                          required
                          type="number"
                          className="form-control"
                          style={{ paddingLeft: '2.5rem' }}
                          value={formData.price}
                          onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '0.5rem' }}>Duration</label>
                      <input 
                        required
                        className="form-control"
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g. 10 Days"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '0.5rem' }}>Cover Image URL</label>
                    <input 
                      required
                      className="form-control"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '0.5rem' }}>Description Summary</label>
                    <textarea 
                      required
                      className="form-control"
                      style={{ minHeight: '100px', resize: 'vertical' }}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn" 
                      style={{ flex: 1, background: '#f1f5f9', color: '#64748b' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary" 
                      style={{ flex: 1, gap: '0.75rem' }}
                    >
                      {isSaving ? 'Processing...' : <><Save size={18} /> Update Service</>}
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
    <button className={`admin-nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          style={{ 
            marginLeft: 'auto', 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            background: 'hsl(var(--primary))' 
          }} 
        />
      )}
    </button>
  );
}

function StatCard({ label, value, icon, trend, className }) {
  return (
    <div className={`admin-card ${className}`} style={{ color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute', 
        right: '-20px', 
        top: '-20px', 
        opacity: 0.1, 
        transform: 'rotate(-15deg)' 
      }}>
        {React.cloneElement(icon, { size: 120 })}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '0.75rem', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {icon}
          </div>
          {trend && (
            <div style={{ fontSize: '0.75rem', fontWeight: '800', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.6rem', borderRadius: '1rem' }}>
              {trend}
            </div>
          )}
        </div>
        <p style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.8, marginBottom: '0.25rem' }}>{label}</p>
        <p style={{ fontSize: '2rem', fontWeight: '900' }}>{value}</p>
      </div>
    </div>
  );
}
