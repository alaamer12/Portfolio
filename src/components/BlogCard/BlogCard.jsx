import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaExternalLinkAlt, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import './BlogCard.css';

const BlogCard = ({ blog, index }) => {
    // TODO: Implement load post functionality to fetch full content or open modal
    const handleLoadPost = () => {
        window.open(blog.linkedinPostUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            className="blog-card flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="p-6 flex flex-col flex-grow">
                {/* Header: Date and Read Time */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                        <FaRegCalendarAlt />
                        <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaRegClock />
                        <span>{blog.readTime}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
                    {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-md"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer: Author and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    <div className="flex items-center gap-2">
                        <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {blog.author.name}
                        </span>
                    </div>

                    <button
                        onClick={handleLoadPost}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0077b5] hover:bg-[#006396] rounded-lg transition-colors shadow-md hover:shadow-lg"
                        aria-label="Read on LinkedIn"
                    >
                        <FaLinkedin className="text-lg" />
                        <span>Load Post</span>
                        {/* <FaExternalLinkAlt className="text-xs opacity-70" /> */}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default memo(BlogCard);
