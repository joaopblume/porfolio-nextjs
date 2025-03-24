"use client";

import { useEffect } from "react";
import Image from "next/image";

// Define tools data array
const tools = [
  {
    name: "Python",
    image: "/images/python.png",
    tooltip: "Scripting and automation in general",
    bgClass: "white-bg"
  },
  {
    name: "Oracle",
    image: "/images/oracle.jpg",
    tooltip: "I'm Oracle Database Administrator",
    bgClass: "white-bg"
  },
  {
    name: "MongoDB",
    image: "/images/mongo.png",
    tooltip: "No relational databases? No problem!",
    bgClass: "white-bg"
  },
  {
    name: "Django",
    image: "/images/django.png",
    tooltip: "My favorite python rest framework",
    bgClass: "white-bg"
  },
  {
    name: "Airflow",
    image: "/images/airflow.webp",
    tooltip: "Orchestrating complex data pipelines with ease",
    bgClass: "white-bg"
  },
  {
    name: "Spark",
    image: "/images/spark.webp",
    tooltip: "Processing big data at lightning speed",
    bgClass: "white-bg"
  },
  {
    name: "Flask",
    image: "/images/flask.png",
    tooltip: "For short problems and quick API solutions",
    bgClass: "white-bg"
  },
  {
    name: "Zabbix",
    image: "/images/zabbix.png",
    tooltip: "Do you monitor your environment?",
    bgClass: "white-bg"
  },
  {
    name: "Next.js",
    image: "/images/nextjs.png",
    tooltip: "Building modern, fast web applications",
    bgClass: "white-bg"
  },
  {
    name: "Oracle Apex",
    image: "/images/oracle_apex.jpg",
    tooltip: "Rapid application development on Oracle",
    bgClass: "white-bg"
  }
];

export default function Tools() {
  // Setup intersection observer for fade-in effect
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

    // Observe all fade-in elements in this component
    document.querySelectorAll("#tools .fade-in").forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tools" className="tools">
      <div className="container">
        <h2 className="section-title fade-in">Skills & Tools</h2>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-item fade-in">
              <div className="tool-tooltip">{tool.tooltip}</div>
              <div className={`tool-icon ${tool.bgClass}`}>
                <img 
                  src={tool.image} 
                  alt={tool.name} 
                  className="tool-image" 
                />
              </div>
              <div className="tool-name">{tool.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}