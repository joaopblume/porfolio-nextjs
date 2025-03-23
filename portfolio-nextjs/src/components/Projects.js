'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGitHubRepositories, filterRepositoriesByTag, timeAgo, FEATURED_REPOS } from '@/lib/github';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const repos = await fetchGitHubRepositories();
        setProjects(repos);
        setFilteredProjects(repos);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Could not load projects. Please check your GitHub username or try again later.');
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  function handleFilterChange(tag) {
    setActiveFilter(tag);
    const filtered = filterRepositoriesByTag(projects, tag);
    setFilteredProjects(filtered);
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title fade-in">Projects</h2>
        
        {/* Filtering Controls */}
        <div className="project-filters fade-in">
          <div className="filter-label">Filter by:</div>
          <div className="filter-tags">
            <button 
              className={`filter-tag ${activeFilter === 'all' ? 'active' : ''}`} 
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button 
              className={`filter-tag ${activeFilter === 'featured' ? 'active' : ''}`} 
              onClick={() => handleFilterChange('featured')}
            >
              Featured
            </button>
            <button 
              className={`filter-tag ${activeFilter === 'frontend' ? 'active' : ''}`} 
              onClick={() => handleFilterChange('frontend')}
            >
              Frontend
            </button>
            <button 
              className={`filter-tag ${activeFilter === 'backend' ? 'active' : ''}`} 
              onClick={() => handleFilterChange('backend')}
            >
              Backend
            </button>
          </div>
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div id="projects-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div id="projects-error" style={{ display: 'block' }}>
            <p>{error}</p>
          </div>
        )}
        
        {/* Projects grid */}
        {!loading && !error && (
          <div className="projects-grid" style={{ display: 'grid' }}>
            {filteredProjects.map((repo) => (
              <div key={repo.id} className={`project-card fade-in ${FEATURED_REPOS.includes(repo.name) ? 'featured' : ''}`}>
                <div className="project-image">
                  <img 
                    src={`/images/${repo.name}.webp`}
                    alt={repo.name}
                    className="contain-fit"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/api/placeholder/600/400';
                      e.target.alt = `${repo.name} (placeholder)`;
                      e.target.classList.remove('contain-fit');
                    }}
                  />
                  {FEATURED_REPOS.includes(repo.name) && <div className="featured-badge">Featured</div>}
                </div>
                <div className="project-details">
                  <h3 className="project-title">{repo.name}</h3>
                  <p className="project-description">{repo.description || 'No description available'}</p>
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="project-topics">
                      {repo.topics.map(topic => (
                        <span key={topic} className="topic-tag">{topic}</span>
                      ))}
                    </div>
                  )}
                  
                  <div className="project-meta">
                    <span className="project-date">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>
                  
                  <div className="project-links">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Repository
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="project-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div id="projects-empty" style={{ display: 'block' }}>
            <p>No projects match the current filter. Try another filter.</p>
          </div>
        )}

        {/* Warning Bar */}
        <div className="elegant-warning fade-in">
          <div className="warning-content">
            <div className="warning-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p className="warning-text">Some projects may appear limited, outdated or require access due to code proprietary rights or security considerations.</p>
          </div>
        </div>
        
        {/* CTA to create new project */}
        <div className="create-project-cta fade-in">
          <div className="cta-content">
            <div className="plus-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <h3>Didn't find a project that fits your needs?</h3>
            <p>Let's create something new together and add it to this list.</p>
            <a href="#contact" className="cta-button">Let's talk</a>
          </div>
        </div>
      </div>
    </section>
  );
}