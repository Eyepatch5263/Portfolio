"use client"
import { LoaderIcon } from 'lucide-react';
import './blog.css'
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog data from JSON file
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/blog.json');
        const data = await response.json();
        setBlogs(data.Blog || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on current category
  const filteredBlogs = currentCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.category === currentCategory);

  // Get visible blogs based on current limit
  const blogsToShow = filteredBlogs.slice(0, visibleBlogs);

  // Handle category change
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setVisibleBlogs(6); // Reset to show only 6 blogs when changing category
  };

  // Handle show more
  const handleShowMore = () => {
    setVisibleBlogs(prev => prev + 6);
  };

  useEffect(() => {
    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  if (loading) {
    return (
      <main style={{ fontFamily: "georgia" }} className="main-content">
        <div className="loading-container">
          <p className="flex">
            Loading blogs...
            <LoaderIcon className='animate-spin' />
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "georgia" }} className="main-content">
      <section className="blog-header">
        <h2 className='section__title'>My Blog</h2>
        <p>Thoughts, tutorials, and insights about web development, design, and technology</p>
      </section>

      <section className="categories-filter">
        <button
          style={{ fontFamily: "fantasy" }}
          className={`category-btn ${currentCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          All Posts
        </button>
        <button
          style={{ fontFamily: "fantasy" }}
          className={`category-btn ${currentCategory === 'web' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('web')}
        >
          Web
        </button>
        <button
          style={{ fontFamily: "fantasy" }}
          className={`category-btn ${currentCategory === 'tech' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('tech')}
        >
          Technology
        </button>
      </section>

      <section className="blog-grid">
        {blogsToShow.map((blog, index) => (
          <article
            key={blog.id || index}
            className="blog-card"
            style={{
              animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s both`
            }}
          >
            <div className="blog-image"></div>
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-category">
                  {blog.category === 'web' ? 'Web' : 'Technology'}
                </span>
                {blog.date && (
                  <>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </>
                )}
                {blog.readTime && (
                  <>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </>
                )}
              </div>
              <h2 className="blog-title">{blog.title || 'Untitled Post'}</h2>
              <p className="blog-excerpt">{blog.excerpt || 'No excerpt available.'}</p>
              <a target='_blank' href={blog.url} className="read-more">Read More</a>
            </div>
          </article>
        ))}
      </section>

      {/* Show More Button */}
      {visibleBlogs < filteredBlogs.length && (
        <div
          className='flex'
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '2rem'
          }}
        >
          <button
            onClick={handleShowMore}
            style={{ fontFamily: "inherit" }}
            className="button button--flex"
          >
            Show More ({Math.max(filteredBlogs.length - visibleBlogs, 0)} more)
          </button>
        </div>
      )}

    </main>
  )
}
