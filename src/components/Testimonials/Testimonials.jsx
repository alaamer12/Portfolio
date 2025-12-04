import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { TESTIMONIALS_DATA } from '../../data/testimonials';
import './Testimonials.css';

const TestimonialCard = ({ testimonial, index }) => {
    return (
        <motion.li
            className="testimonials-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            <div className="testimonial-content-card">
                {/* Decorative Quote Icon */}
                <div className="testimonials-quote-icon" aria-hidden="true">"</div>

                {/* Avatar - Half Circle Outside */}
                <figure className="testimonials-avatar-box">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        width="90"
                        height="90"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3b82f6&color=fff&size=90`;
                        }}
                    />
                </figure>

                {/* Name */}
                <h4 className="testimonials-item-title">
                    {testimonial.name}
                </h4>

                {/* Job Title and LinkedIn */}
                <div className="testimonials-info">
                    <p className="testimonials-job-title">
                        {testimonial.title}
                        {testimonial.company && (
                            <> at <strong>{testimonial.company}</strong></>
                        )}
                    </p>

                    {testimonial.linkedinUrl && testimonial.linkedinUrl !== '#' && (
                        <a
                            href={testimonial.linkedinUrl}
                            className="testimonials-linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${testimonial.name}'s LinkedIn profile`}
                        >
                            <FaLinkedin size={14} />
                            <span>LinkedIn</span>
                        </a>
                    )}
                </div>

                {/* Testimonial Text */}
                <div className="testimonials-text">
                    <p>
                        "{testimonial.text}"
                    </p>
                </div>
            </div>
        </motion.li>
    );
};

const Testimonials = () => {
    return (
        <section className="testimonials-section py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                            Testimonials
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        What <span className="text-blue-600">People Say</span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
                    </p>
                </motion.div>

                {/* Testimonials Grid - 2 Columns */}
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 list-none max-w-6xl mx-auto">
                    {TESTIMONIALS_DATA.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default memo(Testimonials);
