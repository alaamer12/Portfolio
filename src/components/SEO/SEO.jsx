import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

// Constants extracted outside component to prevent recreation on each render
const BASE_URL = 'https://amrmuhamed.com';
const DEFAULT_TITLE = 'Amr Muhamed | Full Stack Developer';
const DEFAULT_DESCRIPTION = 'Experienced Full Stack Developer specializing in React, Django, and modern web technologies.';
const DEFAULT_KEYWORDS = 'full stack developer, react developer, django developer, web development, javascript, python';
const DEFAULT_AUTHOR = 'Amr Muhamed';
const DEFAULT_TYPE = 'website';
const DEFAULT_IMAGE = '/og-image.png';
const DEFAULT_LANGUAGE = 'en';

// Helper function to sanitize HTML from descriptions
const sanitizeDescription = (text) => text?.replace(/<[^>]*>?/gm, '') || '';

// Default website schema - defined outside to prevent recreation
const DEFAULT_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Amr Muhamed Portfolio",
    "url": BASE_URL,
    "description": DEFAULT_DESCRIPTION,
    "author": {
        "@type": "Person",
        "name": "Amr Muhamed"
    },
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
};

// Hook to compute and memoize SEO data
const useSEOData = ({
    title,
    description,
    keywords,
    image,
    canonical,
    pathname,
    noindex
}) => {
    return useMemo(() => {
        // Calculate final URL
        const url = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${pathname}`;
        
        // Calculate final title, description, and keywords
        const finalTitle = title || DEFAULT_TITLE;
        const finalDescription = description || DEFAULT_DESCRIPTION;
        const finalKeywords = keywords || DEFAULT_KEYWORDS;
        
        // Get clean description for meta tags
        const cleanDescription = sanitizeDescription(finalDescription);
        
        // Calculate image URL
        const imageUrl = image?.startsWith('http') ? image : `${BASE_URL}${image || DEFAULT_IMAGE}`;
        
        // Calculate robots content
        const robotsContent = noindex 
            ? "noindex, nofollow" 
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
        
        return {
            url,
            finalTitle,
            cleanDescription,
            finalKeywords,
            imageUrl,
            robotsContent
        };
    }, [title, description, keywords, image, canonical, pathname, noindex]);
};

// Hook to memoize structured data
const useStructuredData = (schema) => {
    // Deep equality check for schema to prevent unnecessary re-renders
    const schemaKey = useMemo(() => JSON.stringify(schema || {}), [schema]);
    
    return useMemo(() => {
        return JSON.stringify(schema || DEFAULT_SCHEMA);
    }, [schemaKey]); // Only depends on stringified schema
};

// Function to create article meta tags
const getArticleMetaTags = ({
    article,
    publishedTime,
    modifiedTime,
    tags
}) => {
    if (!article) return [];
    
    const metaTags = [];
    
    if (publishedTime) {
        metaTags.push(<meta key="article:published_time" property="article:published_time" content={publishedTime} />);
    }
    
    if (modifiedTime) {
        metaTags.push(<meta key="article:modified_time" property="article:modified_time" content={modifiedTime} />);
    }
    
    if (tags && Array.isArray(tags)) {
        tags.forEach((tag, index) => {
            metaTags.push(<meta key={`article:tag-${index}-${tag}`} property="article:tag" content={tag} />);
        });
    }
    
    return metaTags;
};

// Function to generate basic meta tags
const getBasicMetaTags = ({
    language,
    title,
    description,
    url,
    keywords,
    author,
    robotsContent,
    noindex
}) => [
    <html key="html" lang={language} />,
    <title key="title">{title}</title>,
    <meta key="description" name="description" content={description} />,
    <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />,
    <link key="canonical" rel="canonical" href={url} />,
    <meta key="keywords" name="keywords" content={keywords} />,
    <meta key="author" name="author" content={author} />,
    <meta key="robots" name="robots" content={robotsContent} />,
    <meta key="googlebot" name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
];

// Function to generate open graph tags
const getOpenGraphTags = ({
    language,
    title,
    description,
    url,
    type,
    imageUrl
}) => [
    <meta key="og:locale" property="og:locale" content={language === 'en' ? 'en_US' : language} />,
    <meta key="og:title" property="og:title" content={title} />,
    <meta key="og:description" property="og:description" content={description} />,
    <meta key="og:url" property="og:url" content={url} />,
    <meta key="og:type" property="og:type" content={type} />,
    <meta key="og:site_name" property="og:site_name" content="Amr Muhamed Portfolio" />,
    <meta key="og:image" property="og:image" content={imageUrl} />,
    <meta key="og:image:width" property="og:image:width" content="1200" />,
    <meta key="og:image:height" property="og:image:height" content="630" />,
    <meta key="og:image:alt" property="og:image:alt" content={`${title} thumbnail`} />
];

// Function to generate twitter card tags
const getTwitterCardTags = ({
    title,
    description,
    imageUrl
}) => [
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
    <meta key="twitter:title" name="twitter:title" content={title} />,
    <meta key="twitter:description" name="twitter:description" content={description} />,
    <meta key="twitter:image" name="twitter:image" content={imageUrl} />,
    <meta key="twitter:creator" name="twitter:creator" content="@amrmuhamed" />,
    <meta key="twitter:site" name="twitter:site" content="@amrmuhamed" />
];

// Function to generate mobile specific tags
const getMobileSpecificTags = ({ title }) => [
    <meta key="theme-color" name="theme-color" content="#ffffff" />,
    <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />,
    <meta key="apple-mobile-web-app-status-bar-style" name="apple-mobile-web-app-status-bar-style" content="default" />,
    <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content={title} />,
    <meta key="format-detection" name="format-detection" content="telephone=no" />
];

// Main SEO component
const SEO = ({
    title,
    description,
    type = DEFAULT_TYPE,
    image = DEFAULT_IMAGE,
    article = false,
    publishedTime,
    modifiedTime,
    tags,
    schema,
    keywords,
    language = DEFAULT_LANGUAGE,
    author = DEFAULT_AUTHOR,
    noindex = false,
    canonical
}) => {
    const { pathname } = useLocation();
    
    // Memoize computed values to prevent recalculation on every render
    const seoData = useSEOData({
        title,
        description,
        keywords,
        image,
        canonical,
        pathname,
        noindex
    });
    
    // Memoize structured data to prevent stringification on every render
    const structuredData = useStructuredData(schema);
    
    const { url, finalTitle, cleanDescription, finalKeywords, imageUrl, robotsContent } = seoData;
    
    // Memoize props for meta tag functions
    const basicMetaTagsProps = useMemo(() => ({
        language,
        title: finalTitle,
        description: cleanDescription,
        url,
        keywords: finalKeywords,
        author,
        robotsContent,
        noindex
    }), [language, finalTitle, cleanDescription, url, finalKeywords, author, robotsContent, noindex]);
    
    const openGraphTagsProps = useMemo(() => ({
        language,
        title: finalTitle,
        description: cleanDescription,
        url,
        type,
        imageUrl
    }), [language, finalTitle, cleanDescription, url, type, imageUrl]);
    
    const twitterCardTagsProps = useMemo(() => ({
        title: finalTitle,
        description: cleanDescription,
        imageUrl
    }), [finalTitle, cleanDescription, imageUrl]);
    
    const mobileSpecificTagsProps = useMemo(() => ({
        title: finalTitle
    }), [finalTitle]);
    
    const articleTagsProps = useMemo(() => ({
        article,
        publishedTime,
        modifiedTime,
        tags
    }), [article, publishedTime, modifiedTime, tags]);
    
    // Memoize all meta tags to prevent unnecessary recreation
    const allMetaTags = useMemo(() => {
        // Create arrays with each tag having a unique namespaced key
        const basicTags = getBasicMetaTags(basicMetaTagsProps).map((tag, i) => 
            React.cloneElement(tag, { key: `basic-${tag.key || i}` }));
        
        const openGraphTags = getOpenGraphTags(openGraphTagsProps).map((tag, i) => 
            React.cloneElement(tag, { key: `og-${tag.key || i}` }));
        
        const twitterTags = getTwitterCardTags(twitterCardTagsProps).map((tag, i) => 
            React.cloneElement(tag, { key: `twitter-${tag.key || i}` }));
        
        const articleTags = getArticleMetaTags(articleTagsProps).map((tag, i) => 
            React.cloneElement(tag, { key: `article-${tag.key || i}` }));
        
        const mobileTags = getMobileSpecificTags(mobileSpecificTagsProps).map((tag, i) => 
            React.cloneElement(tag, { key: `mobile-${tag.key || i}` }));
        
        return [
            ...basicTags,
            ...openGraphTags,
            ...twitterTags,
            ...articleTags,
            ...mobileTags
        ];
    }, [
        basicMetaTagsProps, 
        openGraphTagsProps, 
        twitterCardTagsProps, 
        articleTagsProps, 
        mobileSpecificTagsProps
    ]);
    
    return (
        <Helmet>
            {allMetaTags}
            <script type="application/ld+json">{structuredData}</script>
        </Helmet>
    );
};

export default SEO;
