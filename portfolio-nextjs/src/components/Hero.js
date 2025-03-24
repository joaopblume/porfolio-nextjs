import Link from "next/link";

export default function Hero({ name = "Joao Paulo" }) {
  return (
    <section id="hero" className="hero">
      <div className="container hero-content">
        <h1>Hello, Im <span id="yourName">{name}</span></h1>
        <p className="hero-subtitle">Software Developer & Problem Solver</p>
        <Link href="#about" className="btn">Who am I?</Link>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </section>
  );
}