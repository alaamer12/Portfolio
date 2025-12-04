export const BLOGS_DATA = [
    {
        id: 1,
        title: "Building Scalable ETL Pipelines with Python and Airflow",
        excerpt: "Learn how to design and implement robust ETL pipelines that can handle terabytes of data using Python and Apache Airflow. I share my best practices for error handling and monitoring.",
        date: "2024-03-15",
        author: {
            name: "Amr Muhamed",
            avatar: "/images/hero.avif"
        },
        linkedinPostUrl: "https://www.linkedin.com/posts/amr-muhamed_dataengineering-python-airflow-activity-711234567890", // Replace with actual link
        tags: ["Data Engineering", "Python", "Airflow", "ETL"],
        readTime: "5 min read",
        // TODO: Add API integration to fetch real-time engagement stats (likes, comments)
        stats: {
            likes: 120,
            comments: 45
        }
    },
    {
        id: 2,
        title: "Optimizing SQL Queries for Big Data Analytics",
        excerpt: "A deep dive into SQL optimization techniques for large datasets. Discover how to speed up your queries by 10x using proper indexing, partitioning, and query restructuring.",
        date: "2024-02-28",
        author: {
            name: "Amr Muhamed",
            avatar: "/images/hero.avif"
        },
        linkedinPostUrl: "https://www.linkedin.com/posts/amr-muhamed_sql-bigdata-analytics-activity-710987654321", // Replace with actual link
        tags: ["SQL", "Big Data", "Analytics", "Optimization"],
        readTime: "8 min read",
        stats: {
            likes: 85,
            comments: 22
        }
    },
    {
        id: 3,
        title: "Introduction to Machine Learning Operations (MLOps)",
        excerpt: "Understanding the lifecycle of machine learning models from development to deployment. Why MLOps is crucial for successful AI projects in production environments.",
        date: "2024-01-10",
        author: {
            name: "Amr Muhamed",
            avatar: "/images/hero.avif"
        },
        linkedinPostUrl: "https://www.linkedin.com/posts/amr-muhamed_mlops-machinelearning-ai-activity-709876543210", // Replace with actual link
        tags: ["MLOps", "Machine Learning", "DevOps", "AI"],
        readTime: "6 min read",
        stats: {
            likes: 150,
            comments: 56
        }
    }
];

// TODO: In the future, implement a function to fetch blogs dynamically from LinkedIn API
// export const fetchBlogsFromLinkedIn = async () => { ... }
