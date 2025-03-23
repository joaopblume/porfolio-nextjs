'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeNav = () => {
    setNavActive(false);
  };

  // Handle clicking outside of nav to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navActive && 
          !e.target.closest('#navLinks') && 
          !e.target.closest('#menuToggle')) {
        setNavActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [navActive]);

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="container header-content">
        <div className="logo">PORTFOLIO</div>
        <div 
          className={`menu-toggle ${navActive ? 'active' : ''}`} 
          id="menuToggle"
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`nav-links ${navActive ? 'active' : ''}`} id="navLinks">
          <Link href="#hero" className="nav-link" onClick={closeNav}>Home</Link>
          <Link href="#about" className="nav-link" onClick={closeNav}>About</Link>
          <Link href="#projects" className="nav-link" onClick={closeNav}>Projects</Link>
          <Link href="#tools" className="nav-link" onClick={closeNav}>Skills</Link>
          <Link href="#contact" className="nav-link" onClick={closeNav}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}