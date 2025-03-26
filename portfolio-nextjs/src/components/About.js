"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function About() {
  // Este useEffect configura um observer para efeitos de fade-in
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observa todos os elementos fade-in neste componente
    document.querySelectorAll("#about .fade-in").forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title fade-in">About Me</h2>
        
        <div className="about-content fade-in">
          <div className="about-image">
            <div className="profile-image">
              <img 
                src="/images/jp-photo.jpeg" 
                alt="João Paulo Blume" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/api/placeholder/400/400"; 
                  e.target.alt = "João Paulo Blume";
                }}
              />
            </div>
            <div className="experience-badge">5+ Years Experience</div>
          </div>
          
          <div className="about-text">
            <h3>Hey there, I'm <span className="highlight">João Paulo Blume</span></h3>
            
            <p>I'm currently working as an <strong>Oracle Database Administrator</strong>, but in practice, I've been a <strong>Backend Developer</strong> for over 5 years, specializing in database integrations and APIs.</p>
            
            <p>My background as a DBA has been invaluable, teaching me the lowest levels of software: operating systems, hardware resources, virtualization, and more. This foundation gives me a unique perspective when developing solutions.</p>
            
            <p>I also work as a <strong>Software Developer</strong> and <strong>Data Engineer</strong>, planning, deploying, and developing integration solutions between various systems and data sources.</p>
            
            <p>I'm passionate about technology, and each challenge inspires me to learn new skills. I'd love to share my journey through this portfolio and perhaps find partners to collaborate on new ideas.</p>
            
            <div className="about-cta">
              <Link href="#contact" className="btn about-btn">Let's Talk</Link>
              <Link href="#projects" className="btn about-btn-outline">View My Work</Link>
            </div>
          </div>
        </div>
        
        <div className="key-skills fade-in">
          <div className="key-skill">
            <div className="skill-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-4V4h-4v6H6l6 6 6-6z"></path>
                <path d="M6 20h12"></path>
              </svg>
            </div>
            <h4>Backend Development</h4>
            <p>Building robust APIs and server-side applications</p>
          </div>
          
          <div className="key-skill">
            <div className="skill-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <h4>Database Administration</h4>
            <p>Expert in Oracle and NoSQL database solutions</p>
          </div>
          
          <div className="key-skill">
            <div className="skill-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h4>Data Engineering</h4>
            <p>Creating pipelines and integration solutions</p>
          </div>
          
          <div className="key-skill">
            <div className="skill-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </div>
            <h4>System Architecture</h4>
            <p>Designing infrastructures from OS to application</p>
          </div>
        </div>
      </div>
    </section>
  );
}