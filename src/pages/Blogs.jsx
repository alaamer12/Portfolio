import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import BlogCard from '../components/BlogCard/BlogCard';
import { BLOGS_DATA } from '../data/blogs';
import { OptimizedBlock } from '../components/OptimizedMillion';

const Blogs = () => {
    const [filter, setFilter] = useState('All');

    // Extract unique tags for filter
    const allTags = ['All', ...new Set(BLOGS_DATA.flatMap(blog => blog.tags))];

    const filteredBlogs = filter === 'All'
        ? BLOGS_DATA
        : BLOGS_DATA.filter(blog => blog.tags.includes(filter));

    return (
        <>
            <Helmet>
                <title>Blogs & Insights | Amr Muhamed</title>
                <meta name="description" content="Read my latest thoughts on Data Engineering, Machine Learning, and Software Development. Insights from real-world projects and technical deep dives." />
            </Helmet>

            <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            Technical <span className="text-blue-600">Insights</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Sharing knowledge and experiences from the world of Data Engineering and AI.
                        </p>
                    </motion.div>

                    {/* Filter Tags */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {allTags.map((tag, index) => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === tag
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>

                    {/* Blogs Grid */}
                    <OptimizedBlock>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <BlogCard key={blog.id} blog={blog} index={index} />
                            ))}
                        </div>
                    </OptimizedBlock>

                    {/* Empty State */}
                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                No blogs found for this category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Blogs);
