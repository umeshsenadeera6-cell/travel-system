const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  // Key identifier — we always upsert on this
  siteId: { type: String, default: 'main', unique: true },

  // Hero Section
  heroTitle: { type: String, default: 'Discover Sri Lanka\'s Hidden Paradise' },
  heroSubtitle: { type: String, default: 'Your journey to the gem of the Indian Ocean starts here. Explore breathtaking landscapes, ancient culture, and unforgettable adventures.' },
  heroImages: [{ type: String }],

  // About
  aboutTitle: { type: String, default: 'About Serendib Travel & Tours' },
  aboutText: { type: String, default: 'We are a premier travel agency specializing in both inbound and outbound tours, crafting unforgettable journeys tailored to your dreams.' },

  // Contact
  contactEmail: { type: String, default: 'info@serendibtravel.lk' },
  contactPhone: { type: String, default: '+94 77 123 4567' },
  contactWhatsApp: { type: String, default: '+94771234567' },
  contactAddress: { type: String, default: 'No. 123, Galle Road, Colombo 03, Sri Lanka' },

  // Social Links
  socialFacebook: { type: String, default: '' },
  socialInstagram: { type: String, default: '' },
  socialTwitter: { type: String, default: '' },
  socialYoutube: { type: String, default: '' },
  socialTripAdvisor: { type: String, default: '' },

  // Partner Logos
  partnerLogos: [{
    name: String,
    logoUrl: String,
    website: String
  }],

  // Featured Tour IDs (pinned to homepage)
  featuredTourIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],

  // Announcement Banner
  announcementEnabled: { type: Boolean, default: false },
  announcementText: { type: String, default: '' },
  announcementLink: { type: String, default: '' },

  // Company Info
  companyName: { type: String, default: 'Serendib Travel & Tours' },
  companyTagline: { type: String, default: 'Your Gateway to Sri Lanka' },
  companyLogo: { type: String, default: '' },

  // Footer
  footerText: { type: String, default: '© 2024 Serendib Travel & Tours. All rights reserved.' },

  // SEO Defaults
  seoTitle: { type: String, default: 'Serendib Travel & Tours — Sri Lanka Tour Packages' },
  seoDescription: { type: String, default: 'Book premium inbound and outbound tours with Serendib Travel & Tours. Discover Sri Lanka\'s beauty with our tailored holiday packages.' }

}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
