import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} keywords - Meta keywords
 * @param {string} ogImage - Open Graph image URL
 * @param {string} ogUrl - Open Graph URL
 * @param {string} canonicalUrl - Canonical link URL
 */
const SEO = ({ 
  title = "Serendib Travel & Tours | Luxury Sri Lankan Adventures",
  description = "Crafting unforgettable journeys across Sri Lanka and beyond. Experience luxury, culture, and nature with Serendib Travel & Tours.",
  keywords = "travel, tours, Sri Lanka, luxury travel, adventure, inbound tours, outbound tours, Serendib",
  ogImage = "/og-image.jpg",
  ogUrl = window.location.href,
  canonicalUrl = window.location.href
}) => {
  const siteTitle = "Serendib Travel & Tours";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Standard Language tags */}
      <meta http-equiv="content-language" content="en" />
    </Helmet>
  );
};

export default SEO;
