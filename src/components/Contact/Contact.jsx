import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaSpinner,
    FaCheckCircle,
    FaExclamationTriangle,
    FaDownload
} from "react-icons/fa";
import { OptimizedBlock } from "../OptimizedMillion";
import { USER_CONFIG } from "../../data/user.js";

const ContactForm = memo(() => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate form submission - replace with your actual form handling
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For now, we'll just show success. In real implementation, you'd send to your backend
            console.log('Form submitted:', formData);
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Clear status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    }, [formData]);

    const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                        placeholder="Your full name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                        placeholder="your.email@example.com"
                    />
                </div>
            </div>
            
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <motion.button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`inline-flex items-center px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                        isFormValid && !isSubmitting
                            ? 'bg-primary dark:bg-primary-light hover:bg-primary/90 dark:hover:bg-primary-light/90 hover:shadow-lg'
                            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    }`}
                    whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                >
                    {isSubmitting ? (
                        <FaSpinner className="mr-2 w-4 h-4 animate-spin" />
                    ) : (
                        <FaPaperPlane className="mr-2 w-4 h-4" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitStatus && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center space-x-2 ${
                            submitStatus === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                    >
                        {submitStatus === 'success' ? (
                            <FaCheckCircle className="w-5 h-5" />
                        ) : (
                            <FaExclamationTriangle className="w-5 h-5" />
                        )}
                        <span className="text-sm font-medium">
                            {submitStatus === 'success' 
                                ? 'Message sent successfully!' 
                                : 'Failed to send message. Please try again.'
                            }
                        </span>
                    </motion.div>
                )}
            </div>
        </motion.form>
    );
});

const DownloadCVButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);
    
    return (
        <motion.a
            href={USER_CONFIG.professional.resumeUrl}
            download="resume.pdf"
            onClick={handleClick}
            className="flex items-center justify-center w-full px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-xl text-base font-medium hover:bg-primary/90 dark:hover:bg-primary-light/90 hover:shadow-lg transition-all duration-300"
            style={{ textDecoration: "none" }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
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
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white/5 dark:bg-gray-800/30 backdrop-blur-md rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary-light/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary-light/20 transition-colors">
                            <link.icon className="w-5 h-5 text-primary dark:text-primary-light" />
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-white/10 dark:border-gray-700/50"
            >
                <DownloadCVButton />
            </motion.div>
        </div>
    );
});

const Contact = () => {
    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="container px-4 mx-auto">
                <OptimizedBlock className="mb-16">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Get In Touch
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Have a project in mind? Let's discuss how we can work together to bring your vision to life.
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
                            <ContactForm />
                        </div>
                    </OptimizedBlock>
                </div>
            </div>
        </section>
    );
};

export default memo(Contact);