import React, { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config';

const SiteContext = createContext(null);

const defaultSettings = {
  heroTitle: 'Discover Sri Lanka\'s Hidden Paradise',
  heroSubtitle: 'Your journey to the gem of the Indian Ocean starts here.',
  heroImages: [],
  aboutTitle: 'About Serendib Travel & Tours',
  aboutText: 'We are a premier travel agency specializing in both inbound and outbound tours.',
  contactEmail: 'info@serendibtravel.lk',
  contactPhone: '+94 77 123 4567',
  contactWhatsApp: '+94771234567',
  contactAddress: 'No. 123, Galle Road, Colombo 03, Sri Lanka',
  socialFacebook: '',
  socialInstagram: '',
  socialTwitter: '',
  socialYoutube: '',
  socialTripAdvisor: '',
  partnerLogos: [],
  announcementEnabled: false,
  announcementText: '',
  announcementLink: '',
  companyName: 'Serendib Travel & Tours',
  companyTagline: 'Your Gateway to Sri Lanka',
  companyLogo: '',
  footerText: '© 2024 Serendib Travel & Tours. All rights reserved.',
  seoTitle: 'Serendib Travel & Tours — Sri Lanka Tour Packages',
  seoDescription: 'Book premium inbound and outbound tours with Serendib Travel & Tours.',
};

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(async (r) => {
        if (!r.ok) return null;
        const ct = r.headers.get('content-type') || '';
        if (!ct.includes('application/json')) return null;
        return r.json();
      })
      .then((data) => {
        if (data && typeof data === 'object') setSettings({ ...defaultSettings, ...data });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteContext.Provider value={{ settings, setSettings, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}

export default SiteContext;
