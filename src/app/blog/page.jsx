"use client"
import './blog.css'
import { useEffect } from 'react';

export default function BlogPage() {
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

    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active className from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active className to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        blogCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      categoryButtons.forEach(button => {
        button.removeEventListener('click', () => { });
      });
    };
  }, []);
  return <main style={{ fontFamily: "georgia" }} className="main-content">
    <section className="blog-header">
      <h2 className='section__title'>My Blog</h2>
      <p>Thoughts, tutorials, and insights about web development, design, and technology</p>
    </section>

    <section className="categories-filter">
      <button style={{ fontFamily: "fantasy" }} className="category-btn active" data-category="all">All Posts</button>
      <button style={{ fontFamily: "fantasy" }} className="category-btn" data-category="web">Web</button>
      <button style={{ fontFamily: "fantasy" }} className="category-btn" data-category="tech">Technology</button>
    </section>

    <section className="blog-grid">
      <article className="blog-card" data-category="web">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Web</span>
            <span>•</span>
            <span>Jun 19, 2025</span>
            <span>•</span>
            <span>35 min read</span>
          </div>
          <h2 className="blog-title">Prepare DBMS for Interviews</h2>
          <p className="blog-excerpt">Whether you&apos;re a budding developer, a curious learner, or someone brushing up on the fundamentals — understanding databases is essential in today&apos;s software-driven world..</p>
          <a target='_blank' href="https://sypnops.hashnode.dev/series/important-database-concepts" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="web">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Web</span>
            <span>•</span>
            <span>Jun 16, 2025</span>
            <span>•</span>
            <span>9 min read</span>
          </div>
          <h2 className="blog-title">Mastering Software Architecture Patterns</h2>
          <p className="blog-excerpt">Whether you&apos;re building a side project, a startup MVP, or a planet-scale system, choosing the right architecture can be the game-changer.</p>
          <a target='_blank' href="https://medium.com/@pratyushpragyey/tech-behind-the-scenes-mastering-software-architecture-patterns-b0c53c04b809" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="web">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Web</span>
            <span>•</span>
            <span>Apr 26, 2025</span>
            <span>•</span>
            <span>3 min read</span>
          </div>
          <h2 className="blog-title">MCP Server (Model Context Protocol) — The Future of AI Automation!</h2>
          <p className="blog-excerpt">Welcome to the world of MCP — yes, that magical acronym that&apos;s been buzzing around like crazy lately.</p>
          <a target="_blank" href="https://medium.com/@pratyushpragyey/mcp-server-model-context-protocol-the-future-of-ai-automation-8d259d569602" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="web">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Web</span>
            <span>•</span>
            <span>Feb 2, 2025</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <h2 className="blog-title">Mastering CI/CD on Digital Ocean with Jenkins</h2>
          <p className="blog-excerpt">we will explore the complete CI/CD pipeline using Jenkins on Digital Ocean, covering everything from setting up cloud infrastructure with Terraform .</p>
          <a target='_blank' href="https://medium.com/@pratyushpragyey/complete-ci-cd-via-jenkins-on-digital-ocean-part-1-9359ad201ef4" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="web">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Web</span>
            <span>•</span>
            <span>Dec 28, 2024</span>
            <span>•</span>
            <span>6 min read</span>
          </div>
          <h2 className="blog-title">Setting Up Your Kubernetes Cluster with EC2 Instances or DigitalOcean Droplets</h2>
          <p className="blog-excerpt">If you&aspo;re venturing into Kubernetes land, the first step is setting up a virtual machine (VM) in the cloud. You can use either AWS EC2 Instances or DigitalOcean Droplets.</p>
          <a target='_blank' href="https://medium.com/@pratyushpragyey/setting-up-your-kubernetes-cluster-with-ec2-instances-or-digitalocean-droplets-c327e207c490" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="web">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Web</span>
            <span>•</span>
            <span>Dec 20, 2024</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
          <h2 className="blog-title">Understanding Kubernetes: Basics of K8s and it&apos;s Architecture</h2>
          <p className="blog-excerpt">Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications.</p>
          <a target='_blank' href="https://medium.com/@pratyushpragyey/understanding-kubernetes-basics-of-k8s-and-its-components-part-1-4936b37fbeb5" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="tech">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Technology</span>
            <span>•</span>
            <span>Nov 30, 2024</span>
            <span>•</span>
            <span>4 min read</span>
          </div>
          <h2 className="blog-title">Tired of Manually Setting Up GitHub Repositories? Let&apos;s Automate It Like A Pro!</h2>
          <p className="blog-excerpt">Let me guess:
            You&apos;ve got an idea for the next big project, your fingers are itching to code, but wait — ugh, you need to.</p>
          <a target='_blank' href="https://medium.com/@pratyushpragyey/tired-of-manually-setting-up-github-repositories-lets-automate-it-like-a-pro-a960c29be385" className="read-more">Read More</a>
        </div>
      </article>

      <article className="blog-card" data-category="tech">
        <div className="blog-image"></div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-category">Technology</span>
            <span>•</span>
            <span>Nov 29, 2024</span>
            <span>•</span>
            <span>3 min read</span>
          </div>
          <h2 className="blog-title">Unlock the Secret to Downloading YouTube Videos Like a Pro</h2>
          <p className="blog-excerpt">Let&apos;s be honest — at some point, we&apos;ve all wanted to download YouTube videos directly to our devices. Whether it&apos;s a tutorial, a music video, or just a favorite clip, the idea of having it locally stored is tempting.</p>
          <a target='_blank' href="https://medium.com/@pratyushpragyey/unlock-the-secret-to-downloading-youtube-videos-like-a-pro-no-third-party-apps-required-3155e9a89009" className="read-more">Read More</a>
        </div>
      </article>
    </section>

  </main>
}
