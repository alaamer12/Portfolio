import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  type = 'website',
  image = '/og-image.png',
  article = false,
  publishedTime,
  modifiedTime,
  tags
}) => {
  const { pathname } = useLocation();
  const baseUrl = 'https://amrmuhamed.com';
  const url = `${baseUrl}${pathname}`;
  const defaultTitle = 'Amr Muhamed | Full Stack Developer';
  const defaultDescription = 'Experienced Full Stack Developer specializing in React, Django, and modern web technologies.';

  const finalTitle = title ? `${title} | Amr Muhamed` : defaultTitle;
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Amr Muhamed Portfolio" />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Article Specific Meta Tags */}
      {article && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="author" content="Amr Muhamed" />
    </Helmet>
  );
};

export default SEO;
