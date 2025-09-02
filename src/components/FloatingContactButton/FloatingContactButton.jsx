import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FloatingContactButton.css';

const FloatingContactButton = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [currentBlobShape, setCurrentBlobShape] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const buttonRef = useRef(null);
    const messageTimeoutRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const messages = location.pathname === '/' ? [
        "Contact me!",
        "Let's work together!",
        "Got a project?",
        "Say hello! 👋",
        "Let's chat!"
    ] : [
        "Contact me!",
        "Let's discuss your project!",
        "Get in touch!",
        "Say hello! 👋",
        "Back to contact!"
    ];

    const blobShapes = [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '50% 60% 30% 60% / 30% 60% 70% 40%',
        '60% 40% 60% 30% / 70% 30% 60% 40%',
        '40% 60% 60% 40% / 60% 30% 40% 70%',
        '70% 30% 40% 60% / 40% 60% 50% 50%'
    ];

    useEffect(() => {
        // Message display logic
        const messageInterval = setInterval(() => {
            if (isVisible) {
                setShowMessage(true);
                
                // Clear any existing timeout
                if (messageTimeoutRef.current) {
                    clearTimeout(messageTimeoutRef.current);
                }
                
                messageTimeoutRef.current = setTimeout(() => {
                    setShowMessage(false);
                    // Change message for next time
                    setMessageIndex((prev) => (prev + 1) % messages.length);
                }, 2500); // Message shows for 2.5 seconds
            }
        }, 5000); // Repeats every 5 seconds

        return () => {
            clearInterval(messageInterval);
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
        };
    }, [messages.length, isVisible]);

    useEffect(() => {
        // Blob shape animation logic (separate from message logic)
        const shapeInterval = setInterval(() => {
            setCurrentBlobShape((prev) => {
                const nextShape = (prev + 1) % blobShapes.length;
                if (buttonRef.current) {
                    buttonRef.current.style.borderRadius = blobShapes[nextShape];
                }
                return nextShape;
            });
        }, 3000); // Change shape every 3 seconds

        return () => {
            clearInterval(shapeInterval);
        };
    }, [blobShapes.length]);

    // Handle visibility based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show button when not at the very top and not at the very bottom
            const shouldShow = scrollTop > 100 && (scrollTop + windowHeight) < (documentHeight - 100);
            setIsVisible(shouldShow);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle scroll to contact after navigation
    useEffect(() => {
        const shouldScrollToContact = sessionStorage.getItem('scrollToContact');
        
        if (shouldScrollToContact === 'true' && location.pathname === '/') {
            // Clear the flag
            sessionStorage.removeItem('scrollToContact');
            
            // Wait for the page to load and then scroll to contact
            const waitForContactSection = (attempts = 0) => {
                const maxAttempts = 50; // Maximum 5 seconds (50 * 100ms)
                const contactSection = document.getElementById('contact');
                
                if (contactSection) {
                    // Add a small delay to ensure smooth scrolling after page load
                    setTimeout(() => {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                } else if (attempts < maxAttempts) {
                    // If contact section still not found, try again after a short delay
                    setTimeout(() => waitForContactSection(attempts + 1), 100);
                } else {
                    // Fallback: scroll to bottom if contact section never appears
                    console.warn('Contact section not found after maximum attempts, scrolling to bottom');
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
            };
            
            // Start checking for contact section after a brief delay
            setTimeout(() => waitForContactSection(), 500);
        }
    }, [location.pathname]);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        const isOnLandingPage = location.pathname === '/';
        
        if (contactSection && isOnLandingPage) {
            // If contact section exists on landing page, scroll to it
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else if (isOnLandingPage) {
            // We're on landing page but contact section not found, scroll to bottom
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
            // Navigate to landing page and set up scroll listener
            // Store the intent to scroll to contact in sessionStorage
            sessionStorage.setItem('scrollToContact', 'true');
            navigate('/');
        }
    };

    const handleMouseEnter = () => {
        if (buttonRef.current) {
            buttonRef.current.style.borderRadius = '50%';
        }
    };

    const handleMouseLeave = () => {
        if (buttonRef.current) {
            buttonRef.current.style.borderRadius = blobShapes[currentBlobShape];
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="floating-contact-button">
            {showMessage && (
                <div className="contact-blob-message">
                    <div className="blob-content">
                        {messages[messageIndex]}
                    </div>
                    <div className="blob-arrow"></div>
                </div>
            )}
            <button
                ref={buttonRef}
                className="contact-arrow-btn"
                onClick={scrollToContact}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={location.pathname === '/' ? "Scroll to contact section" : "Go to contact page"}
                style={{ borderRadius: blobShapes[currentBlobShape] }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 4L12 20M12 20L18 14M12 20L6 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default FloatingContactButton;