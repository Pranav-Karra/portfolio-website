import React, { useState, useEffect, useRef } from "react";
import { Github, X, BookOpen } from "lucide-react";

const awardBadgeClassName =
  "px-3 py-1 rounded-full text-sm font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] border border-[#D4AF37]/70 shadow-[0_0_10px_rgba(255,215,0,0.45),0_0_20px_rgba(212,175,55,0.35)] ring-1 ring-yellow-200/30";

const projects = [
  {
    title: "Phantom",
    image: "/images/glasses.jpg",
    blurb: "A home-made Jarvis for your smart glasses that makes decisions for you.",
    skills: ["Python", "Gemini Live API", "Meta Glasses", "WebSockets", "OpenClaw", "Asyncio", "REST APIs", "Agentic AI", "Multimodal Input"],
    githubUrl: "https://github.com/Pranav-Karra",
    badge: "VentureHacks 2026 Winner 🏆",
    detailedDescription: "A confidence-aware AI agent built for smart glasses, designed to act on what you see and say without needing a phone or screen in the loop. Audio and video from Meta Ray-Ban glasses stream into the pipeline through the companion app, where the Gemini Live API interprets both modalities together and proposes an action in response, whether that's saving a contact from a business card, queuing a song, or looking something up mid-conversation. Rather than treating every action the same way, a policy layer sits between Gemini's output and execution: Gemini attaches a confidence estimate to each proposed action, and a set of deterministic rules decides whether it runs immediately, asks for a quick confirmation first, or waits for an explicit prompt from the user. Everything is built in Python, with FastAPI, asyncio, and WebSockets handling the streaming input so the pipeline never blocks while waiting on a model response. Execution itself runs through a self-hosted OpenClaw Gateway, extended with a custom skill that intercepts every action before it fires, giving the policy layer a single checkpoint to enforce across more than half a dozen integrated tools, spanning messaging, media, contacts, and search. In testing across dozens of real conversations, the system consistently caught the right moments to act on its own versus the moments that called for a human check-in. The project was as much about designing that judgment layer as it was about the multimodal pipeline underneath it, since the harder problem was never getting an AI to take actions, but teaching it when it shouldn't."
  },
  {
    title: "swiftER",
    image: "/images/swiftER Demo.gif",
    blurb: "An AI-powered ambulance & multi-hospital management system for faster (swifter), smarter care.",
    skills: ["Python", "FastAPI", "TypeScript", "PostgreSQL", "Supabase", "Wispr Flow", "Wood Wide AI", "OSRM", "Gemini API", "Agentic AI", "NLP"],
    githubUrl: "https://github.com/NishnathPolav/SwiftER",
    badge: "NexHacks 2026 Winner 🏆",
    detailedDescription: "A real-time system that matches ambulances to hospitals automatically, replacing manual radio dispatch with data-driven routing decisions. On the ambulance side, Wispr Flow transcribes spoken patient symptoms into text, which a reasoning agent parses into structured data and matches against live hospital information; once a match is found, the ambulance's navigation is automatically updated to route there. On the hospital side, the system tracks incoming ambulances alongside real-time bed capacity and specialist availability, so every new match reflects the hospital's actual current state. The front-end is built with React, TypeScript, Vite, and TailwindCSS, and includes a tablet-based Ambulance App, individual Hospital Dashboards, and a centralized Maps Dashboard built with MapLibre GL JS that tracks every ambulance and hospital on a live map. The backend runs on Python (FastAPI) agents, including a Reasoning Agent for NLP extraction and a routing agent (built on Wood Wide AI) that scores hospital fit using OSRM for real road-based ETAs. Supabase (PostgreSQL) serves as the central source of truth for patient incidents and hospital data, keeping every connected dashboard synchronized as new information arrives. The project demonstrates coordination of several concurrently updating services into one cohesive real-time system, applying speech-to-text, NLP, and decision-model logic to a problem where both speed and accuracy directly affect patient outcomes."
  },
  {
    title: "Story.0",
    image: "/images/Story0 Demo.gif",
    blurb: "A modern way to present stories through visuals enhanced with AI.",
    skills: ["Python", "OpenAI API", "DALL-E", "Javascript", "HTML", "CSS", "React", "Vite"],
    githubUrl: "https://github.com/Rishith18/Story.0",
    detailedDescription: "A full-stack web application that transforms novels into children's books with consistent AI-generated imagery. The project uses OpenAI's API and DALL-E to generate contextual visual elements that enhance the storytelling experience. The front-end design is built with React and Vite to provide a modern, responsive design that allows users to input PDF formatted files. A Python backend is used to extract text from the PDF and sent it to the OpenAI API to generate kid-friendly captions and prompt-engineered image descriptions for DALL-E. The project demonstrates advanced integration of AI services with web technologies, creating an immersive storytelling environment."
  },
  {
    title: "NFL Predictor ML Model",
    image: "/images/MLModel.jpg",
    blurb: "Predicting NFL outcomes using machine learning from large player and team datasets.",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter Notebook", "Google Colab"],
    githubUrl: "https://github.com/Pranav-Karra/NFLPredictor",
    detailedDescription: "A machine learning model that analyzes extensive NFL datasets to predict game outcomes with high accuracy. This is a Logistic Regression model that processes over 10000+ rows of player statistics, team performance metrics, and historical data that are directly web-scraped into CSV files. Using pandas and numpy libraries, data is further extracted and trained into the model via scikit-learn. Further fine-tuning techniques like 10-fold cross-validation are applied to achieve an overall average of 72% accurary. Additional visualizations are created with Matplotlib to provide insights into the factors influencing game outcomes, making complex data accessible and understandable to users."
  },
  {
    title: "Carbon-Sim",
    image: "/images/Carbon-Sim Demo.gif",
    blurb: "Data-driven simulation of future CO2 metrics from potential policy changes.",
    skills: ["React", "Node.js", "CSS", "Javascript","Chart.js", "Web-Scraping", "Real-Time Data"],
    githubUrl: "https://github.com/Pranav-Karra/Carbon-Sim",
    detailedDescription: "An interactive web application that simulates the environmental impact of various policy changes on CO2 emissions. Built with React and Node.js, it features real-time data visualization web-scraped from published research and credible environmental agencies. The user can adjust various policies (EV incentives, gas prices, energy rebates, carbon tax, etc) via sliders. This data is sent to a complex mathematical model that projects future CO2 emissions through visuals using Chart.js. This application makes environmental policy analysis accessible to policymakers and the public alike."
  },
  {
    title: "Personal Portfolio Website",
    image: "/images/PersonalPortfolioWebsite.png",
    blurb: "A modern, responsive portfolio to showcase my work and skills.",
    skills: ["React", "TailwindCSS", "Vite", "Vercel"],
    githubUrl: "https://github.com/yourusername/personal-portfolio",
    detailedDescription: "A modern, responsive portfolio website that showcases my work, education, and interests. This website is built with React and TailwindCSS and features smooth animations, interactive components, and a clean design that showcases my projects and experience. Built with Vite for fast development and deployed on Vercel for optimal performance. The portfolio demonstrates proficiency in modern web development technologies and best practices for creating engaging user experiences."
  }
];

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-2 bg-secondary/30">
      <div className="container mx-auto max-w-none px-30">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          My <span className="text-primary">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col gradient-border card-hover rounded-lg overflow-hidden bg-background shadow-lg transition-all duration-1000 ease-out delay-${idx * 200} ${
                project.badge ? "hover:ring-1 hover:ring-[#D4AF37]/50 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]" : ""
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {project.badge && (
                <span className={`absolute top-3 right-3 z-10 ${awardBadgeClassName}`}>
                  {project.badge}
                </span>
              )}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="flex-1 flex flex-col p-8">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {project.blurb}
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skill, key) => (
                      <span key={key} className="skill-button">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cosmic-button inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Github size={18} />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <button
                      onClick={() => openModal(project)}
                      className="reverse-cosmic-button inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-muted to-muted/80 text-muted-foreground font-medium border border-muted-foreground/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
                    >
                      <BookOpen size={18} />
                      <span className="text-sm">Learn More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div 
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-500 ease-out ${
            isModalOpen 
              ? 'bg-black/50 opacity-100' 
              : 'bg-black/0 opacity-0'
          }`}
        >
          <div 
            className={`bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 ease-out transform ${
              isModalOpen 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-4'
            }`}
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-primary/20 hover:bg-primary/40 transition-all duration-300 hover:scale-110 border border-primary/30"
              >
                <X size={20} className="text-primary" />
              </button>

              {selectedProject.badge && (
                <span className={`absolute top-16 right-4 z-10 ${awardBadgeClassName}`}>
                  {selectedProject.badge}
                </span>
              )}
              
              {/* Project image */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              
              {/* Project content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {selectedProject.title}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.skills.map((skill, key) => (
                    <span key={key} className="skill-button">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedProject.detailedDescription}
                </p>
                
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cosmic-button inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 