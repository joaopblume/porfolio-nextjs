/**
 * Scroll to a specific element with smooth scrolling
 * 
 * @param {string} elementId - The ID of the element to scroll to (without #)
 * @param {number} offset - Offset from the top in pixels
 */
export function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  /**
   * Format a date into a human-readable string
   * 
   * @param {string} dateString - The date string to format
   * @returns {string} The formatted date
   */
  export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  /**
   * Set up the Intersection Observer for fade-in animations
   * 
   * @param {string} selector - CSS selector for elements to observe
   */
  export function setupFadeInObserver(selector = '.fade-in') {
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
  
    // Observe all elements matching the selector
    document.querySelectorAll(selector).forEach(element => {
      observer.observe(element);
    });
  
    return observer;
  }
  
  /**
   * Validate an email address
   * 
   * @param {string} email - The email to validate
   * @returns {boolean} True if valid, false otherwise
   */
  export function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }