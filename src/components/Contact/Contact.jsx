import {memo, useCallback, useState} from "react";
import {motion} from "framer-motion";
import {
    FaCheckCircle,
    FaDownload,
    FaEnvelope,
    FaExclamationTriangle,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaSpinner,
    FaEdit
} from "react-icons/fa";
import Select from 'react-select';
import {OptimizedBlock} from "../OptimizedMillion";
import {USER_CONFIG} from "../../data/user.js";
import Checkpoint from "../Checkpoint/Checkpoint.jsx";
import {sendContactEmail} from "../../services/emailService.js";
import {dismissToast, showErrorToast, showLoadingToast, showSuccessToast} from "../../utils/toast.js";

// Email validation utility
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Form validation utility
const validateForm = (formData, isDetailed) => {
    const errors = {};
    
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    }
    
    if (isDetailed && !formData.service) {
        errors.service = 'Please select a service';
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

// Contact Form Component
const ContactForm = memo(({isDetailed, onToggleMode}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        company: '',
        service: null,
        budget: null,
        customService: ''
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [showMailtoFallback, setShowMailtoFallback] = useState(false);

    // Service options
    const serviceOptions = [
        { value: 'data-engineering', label: 'Data Engineering & ETL Pipelines' },
        { value: 'machine-learning', label: 'Machine Learning & AI Solutions' },
        { value: 'data-analytics', label: 'Data Analytics & Visualization' },
        { value: 'web-development', label: 'Full-Stack Web Development' },
        { value: 'data-processing', label: 'Data Processing & Automation' },
        { value: 'consulting', label: 'Technical Consulting' },
        { value: 'other', label: 'Other (please specify below)' }
    ];

    // Budget options
    const budgetOptions = [
        { value: '0-200', label: '$0 - $200' },
        { value: '200-500', label: '$200 - $500' },
        { value: '500-1000', label: '$500 - $1,000' },
        { value: 'lets-talk', label: "Let's discuss" }
    ];

    // Input change handler with validation
    const handleInputChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        
        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [validationErrors]);

    // Select change handler
    const handleSelectChange = useCallback((field, selectedOption) => {
        setFormData(prev => ({...prev, [field]: selectedOption}));
        
        // Clear validation error for service field
        if (field === 'service' && validationErrors.service) {
            setValidationErrors(prev => {
                const newErrors = {...prev};
                delete newErrors.service;
                return newErrors;
            });
        }
    }, [validationErrors]);

    // Mailto fallback handler
    const handleMailtoFallback = useCallback(() => {
        try {
            const subject = encodeURIComponent(`Contact from ${formData.name}`);
            let body = `Name: ${formData.name}\nEmail: ${formData.email}`;
            
            if (isDetailed) {
                if (formData.company) body += `\nCompany: ${formData.company}`;
                if (formData.service) {
                    body += `\nService: ${formData.service.label}`;
                    if (formData.service.value === 'other' && formData.customService) {
                        body += `\nCustom Service: ${formData.customService}`;
                    }
                }
                if (formData.budget) body += `\nBudget: ${formData.budget.label}`;
            }
            
            body += `\n\nMessage:\n${formData.message}`;
            
            const mailtoLink = `mailto:${USER_CONFIG.contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            window.dispatchEvent(new CustomEvent('messageSent'));
            showSuccessToast('Opening your email client. Please send the message from your email app.');
        } catch (error) {
            console.error('Mailto fallback failed:', error);
            showErrorToast('Failed to open email client. Please try copying the email address manually.');
        }
    }, [formData, isDetailed]);

    // Form submission handler
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        const validation = validateForm(formData, isDetailed);
        
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            showErrorToast('Please fix the errors before submitting.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setShowMailtoFallback(false);
        setValidationErrors({});

        const loadingToastId = showLoadingToast('Sending your message...');

        try {
            // Prepare form data with custom service if applicable
            const submissionData = {...formData};
            if (isDetailed && formData.service?.value === 'other' && formData.customService) {
                submissionData.customService = formData.customService;
            }

            const emailResult = await sendContactEmail(submissionData);

            if (emailResult.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '', 
                    email: '', 
                    message: '',
                    company: '',
                    service: null,
                    budget: null,
                    customService: ''
                });

                window.dispatchEvent(new CustomEvent('messageSent'));
                dismissToast(loadingToastId);
                showSuccessToast('Message sent successfully! I\'ll get back to you soon.');
            } else {
                throw new Error(emailResult.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setShowMailtoFallback(true);
            dismissToast(loadingToastId);

            if (error.message.includes('npx vercel dev')) {
                showErrorToast('Development Mode: API not available with Vite dev server. Use "npx vercel dev" to test the contact form, or use the "Send via Email Client" button below.');
            } else if (error.message.includes('Email service is not properly configured')) {
                showErrorToast('Email service configuration issue. Please use the "Send via Email Client" button below.');
            } else {
                showErrorToast('Failed to send message via our email service. Please try the "Send via Email Client" button below.');
            }
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setSubmitStatus(null);
                setShowMailtoFallback(false);
            }, 10000);
        }
    }, [formData, isDetailed]);

    // Custom styles for react-select
    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: state.isFocused 
                ? '2px solid rgba(59, 130, 246, 0.5)' 
                : '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '8px 4px',
            boxShadow: 'none',
            minHeight: '48px',
            '&:hover': {
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            zIndex: 9999
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? 'rgba(59, 130, 246, 0.2)' 
                : state.isFocused 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#ffffff'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgba(156, 163, 175, 1)'
        }),
        input: (provided) => ({
            ...provided,
            color: '#ffffff'
        })
    };

    // Input field component for consistency
    const InputField = ({ label, name, type = "text", required = false, placeholder, rows }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {rows ? (
                <textarea
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required={required}
                    rows={rows}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                        validationErrors[name] 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-white/20 dark:border-gray-700 focus:ring-blue-500/50 focus:border-blue-500'
                    }`}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        validationErrors[name] 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-white/20 dark:border-gray-700 focus:ring-blue-500/50 focus:border-blue-500'
                    }`}
                />
            )}
            {validationErrors[name] && (
                <p className="mt-1 text-sm text-red-500">{validationErrors[name]}</p>
            )}
        </div>
    );

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="space-y-6"
        >
            {/* Form Type Toggle */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-blue-100 dark:border-gray-600">
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isDetailed ? 'Detailed Contact Form' : 'Quick Contact Form'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isDetailed ? 'Complete project information' : 'Simple message'}
                    </p>
                </div>
                <motion.button
                    type="button"
                    onClick={onToggleMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isDetailed ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isDetailed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </motion.button>
            </div>

            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                    label="Name" 
                    name="name" 
                    required 
                    placeholder="Your full name" 
                />
                <InputField 
                    label="Email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="your.email@example.com" 
                />
            </div>

            {/* Detailed Form Fields */}
            {isDetailed && (
                <>
                    <InputField 
                        label="Company/Organization" 
                        name="company" 
                        placeholder="Your company or organization" 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Service of Interest <span className="text-red-500">*</span>
                            </label>
                            <Select
                                options={serviceOptions}
                                value={formData.service}
                                onChange={(selectedOption) => handleSelectChange('service', selectedOption)}
                                styles={selectStyles}
                                placeholder="Select a service..."
                                isSearchable={false}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                            {validationErrors.service && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.service}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Project Budget
                            </label>
                            <Select
                                options={budgetOptions}
                                value={formData.budget}
                                onChange={(selectedOption) => handleSelectChange('budget', selectedOption)}
                                styles={selectStyles}
                                placeholder="Select budget range..."
                                isSearchable={false}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>

                    {/* Custom Service Field */}
                    {formData.service?.value === 'other' && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: 'auto'}}
                            exit={{opacity: 0, height: 0}}
                            transition={{duration: 0.3}}
                        >
                            <InputField 
                                label="Please specify your service requirements" 
                                name="customService" 
                                placeholder="Describe the specific service you need..." 
                            />
                        </motion.div>
                    )}
                </>
            )}

            <InputField 
                label="Message" 
                name="message" 
                required 
                rows={isDetailed ? 4 : 6}
                placeholder={isDetailed ? "Additional details about your project..." : "Tell me about your project or how I can help you..."}
            />

            <div className="flex flex-col gap-4">
                {/* Main Submit Button */}
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 relative ${
                        !isSubmitting
                            ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={!isSubmitting ? {scale: 1.02} : {}}
                    whileTap={!isSubmitting ? {scale: 0.98} : {}}
                >
                    {isSubmitting ? (
                        <>
                            <FaSpinner className="mr-2 w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <FaPaperPlane className="mr-2 w-4 h-4" />
                            <span>Send Message</span>
                        </>
                    )}
                </motion.button>

                {/* Mailto Fallback Button */}
                {showMailtoFallback && (
                    <motion.button
                        type="button"
                        onClick={handleMailtoFallback}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        className="inline-flex items-center justify-center px-6 py-2 rounded-lg border-2 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                    >
                        <FaEnvelope className="mr-2 w-4 h-4" />
                        <span>Send via Email Client</span>
                    </motion.button>
                )}

                {/* Status Messages */}
                {submitStatus && (
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        className={`flex items-center space-x-2 p-3 rounded-lg ${submitStatus === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                        }`}
                    >
                        {submitStatus === 'success' ? (
                            <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium">
                            {submitStatus === 'success'
                                ? 'Message sent successfully! I\'ll get back to you soon.'
                                : 'Email service temporarily unavailable. Please use the "Send via Email Client" button above.'
                            }
                        </span>
                    </motion.div>
                )}
            </div>
        </motion.form>
    );
});

// Download CV Button Component
const DownloadCVButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        window.dispatchEvent(new CustomEvent('cvDownloaded'));
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    return (
        <motion.a
            href={USER_CONFIG.professional.resumeUrl}
            download="Amr Muhamed Data Engineer Resume.pdf"
            onClick={handleClick}
            className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-xl text-base font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            style={{textDecoration: "none"}}
            whileHover={{scale: 1.02, y: -2}}
            whileTap={{scale: 0.98}}
        >
            {isLoading ? (
                <FaSpinner className="mr-2 w-4 h-4 animate-spin" />
            ) : (
                <FaDownload className="mr-2 w-4 h-4" />
            )}
            {isLoading ? "Loading..." : "Download CV"}
        </motion.a>
    );
});

// Contact Info Component
const ContactInfo = memo(() => {
    const contactLinks = [
        {
            icon: FaEnvelope,
            label: "Email",
            value: USER_CONFIG.contact.email,
            href: `mailto:${USER_CONFIG.contact.email}`
        },
        {
            icon: FaGithub,
            label: "GitHub",
            value: "@alaamer12",
            href: USER_CONFIG.social.github.url
        },
        {
            icon: FaLinkedin,
            label: "LinkedIn",
            value: "Connect with me",
            href: USER_CONFIG.social.linkedin.url
        },
        {
            icon: FaMapMarkerAlt,
            label: "Location",
            value: `${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`,
            href: `https://www.google.com/maps?q=${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Let's Work Together
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Ready to bring your ideas to life? I'm here to help you build amazing web applications
                    with modern technologies. Let's discuss your project and create something extraordinary together.
                </p>
            </div>

            <div className="space-y-4">
                {contactLinks.map((link, index) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{delay: index * 0.1}}
                        className="flex items-center space-x-4 p-4 bg-white/5 dark:bg-gray-800/30 backdrop-blur-md rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                            <link.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {link.label}
                            </div>
                            <div className="text-gray-900 dark:text-white font-medium">
                                {link.value}
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: 0.5}}
                className="pt-6 border-t border-white/10 dark:border-gray-700/50"
            >
                <DownloadCVButton />
            </motion.div>
        </div>
    );
});

// Main Contact Component
const Contact = () => {
    const [isDetailedForm, setIsDetailedForm] = useState(false);

    const handleToggleForm = useCallback(() => {
        setIsDetailedForm(prev => !prev);
    }, []);

    return (
        <section id="contact" className="py-32 md:py-48">
            <div className="container px-4 mx-auto">
                <OptimizedBlock className="mb-16">
                    <div className="text-center">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Get In Touch
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Ready to start your next project? Let's collaborate to build innovative solutions that
                                drive results and exceed expectations.
                            </p>
                        </motion.div>
                    </div>
                </OptimizedBlock>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <OptimizedBlock>
                        <ContactInfo />
                    </OptimizedBlock>

                    <OptimizedBlock>
                        <div className="bg-white/5 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 dark:border-gray-700/50">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Send Me a Message
                            </h3>
                            <ContactForm isDetailed={isDetailedForm} onToggleMode={handleToggleForm} />
                        </div>
                    </OptimizedBlock>
                </div>

                <OptimizedBlock className="mt-16">
                    <div className="flex justify-center">
                        <Checkpoint />
                    </div>
                </OptimizedBlock>
            </div>
        </section>
    );
};

export default memo(Contact);