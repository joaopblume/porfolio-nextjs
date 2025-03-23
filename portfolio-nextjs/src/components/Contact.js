'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all fade-in elements in this component
    document.querySelectorAll('#contact .fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      // The form action will handle the actual submission to Formspree
      // This is just for UX feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Form will be submitted normally through the form action
      // No need to reset the form as the page will refresh
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title fade-in">Get In Touch</h2>
        <form 
          className="contact-form fade-in" 
          action="https://formspree.io/f/mvgkkpbn" 
          method="POST" 
          id="contactForm"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input 
              type="text" 
              className={`form-control ${errors.name ? 'error' : ''}`} 
              id="name" 
              name="name" 
              placeholder="Your Name" 
              required
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'error' : ''}`} 
              id="email" 
              name="email" 
              placeholder="Your Email" 
              required
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className={`form-control ${errors.subject ? 'error' : ''}`} 
              id="subject" 
              name="subject" 
              placeholder="Subject" 
              required
              value={formState.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea 
              className={`form-control ${errors.message ? 'error' : ''}`} 
              id="message" 
              name="message" 
              placeholder="Your Message" 
              required
              value={formState.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <input type="hidden" name="_subject" value="New message from Portfolio" />
          <input type="text" name="_gotcha" style={{ display: 'none' }} />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}