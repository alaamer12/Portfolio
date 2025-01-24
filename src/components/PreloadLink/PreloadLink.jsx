import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PreloadLink = ({ to, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Preload the module when hovering
    if (to === '/') {
      import('../pages/LandingPage');
    } else if (to === '/more') {
      import('../pages/More');
    }
  };

  return (
    <>
      {isHovered && (
        <link
          rel="prefetch"
          href={`${to}`}
          as="document"
        />
      )}
      <Link
        to={to}
        className={className}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </Link>
    </>
  );
};

export default PreloadLink;
