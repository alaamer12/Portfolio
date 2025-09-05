import {memo, useCallback, useState, useMemo, useEffect} from "react";
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
    FaToggleOff,
    FaToggleOn
} from "react-icons/fa";
import Select from 'react-select';
import {OptimizedBlock} from "../OptimizedMillion";
import {USER_CONFIG} from "../../data/user.js";
import Checkpoint from "../Checkpoint/Checkpoint.jsx";
import {sendContactEmail} from "../../services/emailService.js";
import {dismissToast, showErrorToast, showLoadingToast, showSuccessToast} from "../../utils/toast.js";

// Validation utilities
const ValidationUtils = {
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!email.trim()) return 'Email is required';
        if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
        return '';
    },
    
    name: (name) => {
        if (!name.trim()) return 'Name is required';
        if (name.trim().length < 2) return 'Name must be at least 2 characters';
        if (name.trim().length > 50) return 'Name must be less than 50 characters';
        return '';
    },
    
    message: (message) => {
        if (!message.trim()) return 'Message is required';
        if (message.trim().length < 10) return 'Message must be at least 10 characters';
        if (message.trim().length > 1000) return 'Message must be less than 1000 characters';
        return '';
    },
    
    company: (company) => {
        if (company && company.length > 100) return 'Company name must be less than 100 characters';
        return '';
    },
    
    service: (service, isAdvanced) => {
        if (isAdvanced && !service) return 'Please select a service';
        return '';
    },
    
    otherService: (otherService, service) => {
        if (service?.value === 'other' && !otherService.trim()) return 'Please specify the service';
        return '';
    }
};

const FormToggle = memo(({ isAdvanced, onToggle }) => {
    const labelTexts = [
        "Want a business message?",
        "Are you a real deal?",
        "Ready for something serious?",
        "Need the full experience?",
        "Time to get professional?"
    ];

    const motivationalMessages = [
        "That's What I'm Talking About!",
        "You're Killing It!",
        "Now We're Cooking!",
        "Unleash the Power!",
        "Go Big or Go Home!"
    ];
    
    const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
    const [motivationalMessage, setMotivationalMessage] = useState('');
    
    // Cycle through label texts
    const cycleLabel = useCallback(() => {
        setCurrentLabelIndex(prev => (prev + 1) % labelTexts.length);
    }, [labelTexts.length]);
    
    // Auto-cycle labels every 3 seconds when not checked
    useEffect(() => {
        if (!isAdvanced) {
            const interval = setInterval(cycleLabel, 3000);
            return () => clearInterval(interval);
        } else {
            // Set random motivational message when checked
            const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
            setMotivationalMessage(motivationalMessages[randomIndex]);
        }
    }, [isAdvanced, cycleLabel, motivationalMessages]);
    
    return (
        <motion.div 
            className="mb-8 p-6 bg-gradient-to-r from-white/5 to-white/10 dark:from-gray-800/30 dark:to-gray-700/20 backdrop-blur-md rounded-2xl border border-white/10 dark:border-gray-700/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Section */}
            <motion.div
                key={isAdvanced ? 'detailed' : 'quick'}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4"
            >
                <h4 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {isAdvanced ? 'Detailed Form' : 'Quick Form'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {isAdvanced ? 'Complete project information with all details' : 'Send a quick message instantly'}
                </p>
            </motion.div>
            
            {/* Toggle Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <motion.div
                    key={isAdvanced ? motivationalMessage : currentLabelIndex}
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25,
                        duration: 0.6 
                    }}
                    className="relative flex-1 max-w-xs"
                >
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl px-4 py-2 relative">
                        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-blue-100 dark:border-l-blue-900/30 border-t-4 border-t-transparent border-b-4 border-b-transparent sm:block hidden"></div>
                        <label
                            className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                            htmlFor="advanced-toggle"
                        >
                            {isAdvanced ? motivationalMessage : labelTexts[currentLabelIndex]}
                        </label>
                    </div>
                </motion.div>
                
                <motion.div className="relative flex-shrink-0">
                    <input
                        id="advanced-toggle"
                        type="checkbox"
                        checked={isAdvanced}
                        onChange={onToggle}
                        className="sr-only"
                    />
                    <motion.div
                        className="w-8 h-8 rounded-full border-2 cursor-pointer flex items-center justify-center"
                        style={{
                            borderColor: isAdvanced ? '#3b82f6' : '#d1d5db',
                            background: isAdvanced 
                                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)'
                                : 'transparent'
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onToggle}
                        animate={{
                            boxShadow: isAdvanced 
                                ? '0 0 15px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)'
                                : '0 0 5px rgba(156, 163, 175, 0.2)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                scale: isAdvanced ? 1 : 0,
                                rotate: isAdvanced ? 0 : 180
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 500, 
                                damping: 30 
                            }}
                        >
                            <FaCheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
});

// Form Input Component
const FormInput = memo(({ 
    id, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    label, 
    placeholder, 
    required = false, 
    error = '',
    className = ''
}) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && '*'}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                    error 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-white/20 dark:border-gray-700'
                }`}
                placeholder={placeholder}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

// Form Textarea Component
const FormTextarea = memo(({ 
    id, 
    name, 
    value, 
    onChange, 
    label, 
    placeholder, 
    required = false, 
    error = '',
    rows = 4,
    className = ''
}) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && '*'}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none ${
                    error 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-white/20 dark:border-gray-700'
                }`}
                placeholder={placeholder}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

// Form Select Component
const FormSelect = memo(({ 
    label, 
    options, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error = '',
    className = ''
}) => {
    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: state.isFocused 
                ? '2px solid rgba(var(--primary), 0.5)' 
                : error 
                ? '1px solid #ef4444' 
                : '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '8px 4px',
            boxShadow: 'none',
            '&:hover': {
                border: error 
                    ? '1px solid #ef4444' 
                    : '1px solid rgba(var(--primary), 0.3)'
            }
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(31, 41, 55)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            zIndex: 9999
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? 'rgba(var(--primary), 0.2)' 
                : state.isFocused 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'inherit'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'inherit'
        }),
        input: (provided) => ({
            ...provided,
            color: 'inherit'
        })
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && '*'}
            </label>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                styles={selectStyles}
                placeholder={placeholder}
                isSearchable={false}
                className="react-select-container"
                classNamePrefix="react-select"
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

// Status Message Component
const StatusMessage = memo(({ status, message }) => {
    if (!status) return null;

    const isSuccess = status === 'success';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center space-x-2 p-3 rounded-lg ${
                isSuccess
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}
        >
            {isSuccess ? (
                <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
                <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{message}</span>
        </motion.div>
    );
});

// Submit Button Component
const SubmitButton = memo(({ 
    isValid, 
    isSubmitting, 
    showMailtoFallback, 
    onSubmit, 
    onMailtoFallback 
}) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Main Submit Button */}
            <motion.button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`inline-flex items-center justify-center px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 relative ${
                    (isValid && !isSubmitting)
                        ? 'bg-primary dark:bg-primary-light hover:bg-primary/90 dark:hover:bg-primary-light/90 hover:shadow-lg'
                        : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                }`}
                whileHover={(isValid && !isSubmitting) ? {scale: 1.02} : {}}
                whileTap={(isValid && !isSubmitting) ? {scale: 0.98} : {}}
            >
                {isSubmitting ? (
                    <>
                        <div className="mr-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <FaPaperPlane className="mr-2 w-4 h-4"/>
                        <span>Send Message</span>
                    </>
                )}
            </motion.button>

            {/* Mailto Fallback Button */}
            {showMailtoFallback && (
                <motion.button
                    type="button"
                    onClick={onMailtoFallback}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-lg border-2 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                >
                    <FaEnvelope className="mr-2 w-4 h-4"/>
                    <span>Send via Email Client</span>
                </motion.button>
            )}
        </div>
    );
});

// Main Contact Form Component
const ContactForm = memo(({ isAdvanced, onToggleMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        company: '',
        service: null,
        budget: null,
        otherService: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [showMailtoFallback, setShowMailtoFallback] = useState(false);

    // Service options for dropdown
    const serviceOptions = [
        { value: 'data-engineering', label: 'Data Engineering & ETL Pipelines' },
        { value: 'machine-learning', label: 'Machine Learning & AI Solutions' },
        { value: 'data-analytics', label: 'Data Analytics & Visualization' },
        { value: 'web-development', label: 'Full-Stack Web Development' },
        { value: 'data-processing', label: 'Data Processing & Automation' },
        { value: 'consulting', label: 'Technical Consulting' },
        { value: 'other', label: 'Other' }
    ];

    // Budget options for dropdown
    const budgetOptions = [
        { value: '0-200', label: '$0 - $200' },
        { value: '200-500', label: '$200 - $500' },
        { value: '500-1000', label: '$500 - $1,000' },
        { value: 'lets-talk', label: "Let's discuss" }
    ];

    // Validate single field
    const validateField = useCallback((name, value) => {
        switch (name) {
            case 'name':
                return ValidationUtils.name(value);
            case 'email':
                return ValidationUtils.email(value);
            case 'message':
                return ValidationUtils.message(value);
            case 'company':
                return ValidationUtils.company(value);
            case 'service':
                return ValidationUtils.service(value, isAdvanced);
            case 'otherService':
                return ValidationUtils.otherService(value, formData.service);
            default:
                return '';
        }
    }, [isAdvanced, formData.service]);

    // Validate entire form
    const validateForm = useCallback(() => {
        const newErrors = {};
        
        newErrors.name = ValidationUtils.name(formData.name);
        newErrors.email = ValidationUtils.email(formData.email);
        newErrors.message = ValidationUtils.message(formData.message);
        newErrors.company = ValidationUtils.company(formData.company);
        
        if (isAdvanced) {
            newErrors.service = ValidationUtils.service(formData.service, isAdvanced);
            if (formData.service?.value === 'other') {
                newErrors.otherService = ValidationUtils.otherService(formData.otherService, formData.service);
            }
        }

        // Remove empty error messages
        Object.keys(newErrors).forEach(key => {
            if (!newErrors[key]) {
                delete newErrors[key];
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, isAdvanced]);

    // Handle input change with validation
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Real-time validation
        const fieldError = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: fieldError || undefined
        }));
    }, [validateField]);

    // Handle select change with validation
    const handleSelectChange = useCallback((field, selectedOption) => {
        setFormData(prev => ({
            ...prev,
            [field]: selectedOption
        }));

        // Real-time validation for select fields
        const fieldError = validateField(field, selectedOption);
        setErrors(prev => ({
            ...prev,
            [field]: fieldError || undefined
        }));
    }, [validateField]);

    // Handle mailto fallback
    const handleMailtoFallback = useCallback(() => {
        try {
            const subject = encodeURIComponent(`Contact from ${formData.name}`);
            let body = `Name: ${formData.name}\nEmail: ${formData.email}`;
            
            if (isAdvanced) {
                if (formData.company) body += `\nCompany: ${formData.company}`;
                if (formData.service) {
                    if (formData.service.value === 'other' && formData.otherService) {
                        body += `\nService: ${formData.otherService}`;
                    } else {
                        body += `\nService: ${formData.service.label}`;
                    }
                }
                if (formData.budget) body += `\nBudget: ${formData.budget.label}`;
            }
            
            body += `\n\nMessage:\n${formData.message}`;
            
            const mailtoLink = `mailto:${USER_CONFIG.contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // Dispatch custom event for checkpoint tracking
            window.dispatchEvent(new CustomEvent('messageSent'));

            // Show success toast for mailto
            showSuccessToast('Opening your email client. Please send the message from your email app.');
        } catch (error) {
            console.error('Mailto fallback failed:', error);
            showErrorToast('Failed to open email client. Please try copying the email address manually.');
        }
    }, [formData, isAdvanced]);

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setShowMailtoFallback(false);

        // Show loading toast
        const loadingToastId = showLoadingToast('Sending your message...');

        try {
            // Try to send email via Resend API
            const emailResult = await sendContactEmail(formData);

            if (emailResult.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '', 
                    email: '', 
                    message: '',
                    company: '',
                    service: null,
                    budget: null,
                    otherService: ''
                });
                setErrors({});

                // Dispatch custom event for checkpoint tracking
                window.dispatchEvent(new CustomEvent('messageSent'));

                // Dismiss loading toast and show success
                dismissToast(loadingToastId);
                showSuccessToast('Message sent successfully! I\'ll get back to you soon.');
            } else {
                throw new Error(emailResult.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setShowMailtoFallback(true);

            // Dismiss loading toast
            dismissToast(loadingToastId);

            // Check if it's a development mode issue
            if (error.message.includes('npx vercel dev')) {
                showErrorToast('Development Mode: API not available with Vite dev server. Use "npx vercel dev" to test the contact form, or use the "Send via Email Client" button below.');
            } else if (error.message.includes('Email service is not properly configured')) {
                showErrorToast('Email service configuration issue. Please use the "Send via Email Client" button below.');
            } else {
                showErrorToast('Failed to send message via our email service. Please try the "Send via Email Client" button below.');
            }
        } finally {
            setIsSubmitting(false);
            // Clear status after 10 seconds
            setTimeout(() => {
                setSubmitStatus(null);
                setShowMailtoFallback(false);
            }, 10000);
        }
    }, [formData, validateForm]);

    // Check if form is valid
    const isFormValid = useMemo(() => {
        // Check if there are any validation errors
        const hasErrors = Object.keys(errors).some(key => errors[key]);
        
        // Check required fields
        const hasRequiredFields = formData.name.trim() && 
                                 formData.email.trim() && 
                                 formData.message.trim();
        
        // Check advanced form requirements
        const advancedValid = !isAdvanced || (formData.service && 
                             (formData.service.value !== 'other' || formData.otherService.trim()));
        
        return !hasErrors && hasRequiredFields && advancedValid;
    }, [errors, formData, isAdvanced]);

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="space-y-6"
        >
            <FormToggle isAdvanced={isAdvanced} onToggle={onToggleMode} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    label="Name"
                    placeholder="Your full name"
                    required
                    error={errors.name}
                />
                
                <FormInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Email"
                    placeholder="your.email@example.com"
                    required
                    error={errors.email}
                />
            </div>

            {/* Advanced Form Fields */}
            {isAdvanced && (
                <div className="space-y-6 mb-6">
                    <FormInput
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        label="Company/Organization"
                        placeholder="Your company or organization"
                        error={errors.company}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormSelect
                            label="Service of Interest"
                            options={serviceOptions}
                            value={formData.service}
                            onChange={(selectedOption) => handleSelectChange('service', selectedOption)}
                            placeholder="Select a service..."
                            required
                            error={errors.service}
                        />

                        <FormSelect
                            label="Project Budget"
                            options={budgetOptions}
                            value={formData.budget}
                            onChange={(selectedOption) => handleSelectChange('budget', selectedOption)}
                            placeholder="Select budget range..."
                            error={errors.budget}
                        />
                    </div>

                    {/* Other Service Input - Show when 'Other' is selected */}
                    {formData.service?.value === 'other' && (
                        <div className="mt-4">
                            <FormInput
                                id="otherService"
                                name="otherService"
                                type="text"
                                value={formData.otherService}
                                onChange={handleInputChange}
                                label="Please specify the service"
                                placeholder="Describe the service you're interested in..."
                                required
                                error={errors.otherService}
                            />
                        </div>
                    )}
                </div>
            )}

            <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                label="Message"
                placeholder={isAdvanced ? "Additional details about your project..." : "Tell me about your project or how I can help you..."}
                required
                rows={isAdvanced ? 4 : 6}
                error={errors.message}
            />

            <SubmitButton
                isValid={isFormValid}
                isSubmitting={isSubmitting}
                showMailtoFallback={showMailtoFallback}
                onSubmit={handleSubmit}
                onMailtoFallback={handleMailtoFallback}
            />

            <StatusMessage
                status={submitStatus}
                message={submitStatus === 'success'
                    ? 'Message sent successfully! I\'ll get back to you soon.'
                    : 'Email service temporarily unavailable. Please use the "Send via Email Client" button above.'
                }
            />
        </motion.form>
    );
});

// Download CV Button Component
const DownloadCVButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        // Dispatch custom event for checkpoint tracking
        window.dispatchEvent(new CustomEvent('cvDownloaded'));

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <motion.a
            href={USER_CONFIG.professional.resumeUrl}
            download="Amr Muhamed Data Engineer Resume.pdf"
            onClick={handleClick}
            className="flex items-center justify-center w-full px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-xl text-base font-medium hover:bg-primary/90 dark:hover:bg-primary-light/90 hover:shadow-lg transition-all duration-300"
            style={{textDecoration: "none"}}
            whileHover={{scale: 1.02, y: -2}}
            whileTap={{scale: 0.98}}
        >
            {isLoading ? (
                <FaSpinner className="mr-2 w-4 h-4 animate-spin"/>
            ) : (
                <FaDownload className="mr-2 w-4 h-4"/>
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
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary-light/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary-light/20 transition-colors">
                            <link.icon className="w-5 h-5 text-primary dark:text-primary-light"/>
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
                <DownloadCVButton/>
            </motion.div>
        </div>
    );
});

// Main Contact Component
const Contact = () => {
    const [isAdvancedForm, setIsAdvancedForm] = useState(false);

    const handleToggleForm = useCallback(() => {
        setIsAdvancedForm(prev => !prev);
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
                        <ContactInfo/>
                    </OptimizedBlock>

                    <OptimizedBlock>
                        <div className="bg-white/5 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 dark:border-gray-700/50">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Send Me a Message
                            </h3>
                            <ContactForm isAdvanced={isAdvancedForm} onToggleMode={handleToggleForm}/>
                        </div>
                    </OptimizedBlock>
                </div>

                {/* Checkpoint Component - Below Contact Form */}
                <OptimizedBlock className="mt-16">
                    <div className="flex justify-center">
                        <Checkpoint/>
                    </div>
                </OptimizedBlock>
            </div>
        </section>
    );
};

export default memo(Contact);