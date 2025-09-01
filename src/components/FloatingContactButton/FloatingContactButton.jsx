import { useState, useEffect, useRef } from 'react';
import './FloatingContactButton.css';

const FloatingContactButton = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [currentBlobShape, setCurrentBlobShape] = useState(0);
    const buttonRef = useRef(null);

    const messages = [
        "Contact me!",
        "Let's work together!",
        "Got a project?",
        "Say hello! 👋",
        "Let's chat!"
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
        const messageInterval = setInterval(() => {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                // Change message for next time
                setMessageIndex((prev) => (prev + 1) % messages.length);
            }, 2000); // Message shows for 2 seconds
        }, 3000); // Repeats every 3 seconds

        // Random blob shape changes
        const shapeInterval = setInterval(() => {
            setCurrentBlobShape((prev) => (prev + 1) % blobShapes.length);
            if (buttonRef.current) {
                buttonRef.current.style.borderRadius = blobShapes[currentBlobShape];
            }
        }, 2000); // Change shape every 2 seconds

        return () => {
            clearInterval(messageInterval);
            clearInterval(shapeInterval);
        };
    }, [messages.length, blobShapes, currentBlobShape]);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
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
                aria-label="Scroll to contact section"
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