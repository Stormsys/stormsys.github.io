import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projectGroups } from "../data/projects";

function ProjectCard({ project }) {
  const [showStack, setShowStack] = useState(false);
  return (
    <div className="project-card reveal-child">
      <div className="project-top">
        <div>
          <div className="project-name">{project.name}</div>
          {project.subtitle && (
            <div className="project-subtitle">{project.subtitle}</div>
          )}
        </div>
        <div className="project-tags-wrap">
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag.label} className={`tag ${tag.color}`}>
                {tag.label}
              </span>
            ))}
            {project.fullStack && (
              <button
                className="tag tag-more"
                onClick={() => setShowStack(!showStack)}
              >
                {showStack ? "less" : `+${project.fullStack.length - project.tags.length} more`}
              </button>
            )}
          </div>
          {showStack && project.fullStack && (
            <div className="full-stack">
              {project.fullStack.map((item) => (
                <span key={item} className="tag stack-tag">{item}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {project.problem && (
        <div className="project-detail">
          <span className="detail-label">Problem</span>
          <span className="detail-text">{project.problem}</span>
        </div>
      )}
      {project.features && (
        <div className="project-detail">
          <span className="detail-label">Solution</span>
          <span className="detail-text">{project.features}</span>
        </div>
      )}
      {project.complexity && (
        <div className="project-detail">
          <span className="detail-label">Complexity</span>
          <span className="detail-text">{project.complexity}</span>
        </div>
      )}
      {project.links.length > 0 && (
        <div className="project-links">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectGroup({ group }) {
  return (
    <div className="project-group">
      <ScrollReveal>
        <div className="group-header">
          <div className={`group-icon ${group.colorClass}`}>{group.icon}</div>
          <div className="group-name">{group.name}</div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="group-desc">{group.description}</div>
      </ScrollReveal>
      <ScrollReveal stagger>
        <div className="project-cards">
          {group.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

function Projects() {
  const sectionRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const offset = window.scrollY - sectionTop;

      orbsRef.current.forEach((orb) => {
        if (!orb) return;
        const speed = parseFloat(orb.dataset.speed) || 0.03;
        orb.style.transform = `translateY(${offset * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="projects" ref={sectionRef}>
      <div className="floating-accents">
        <div
          className="accent-orb a"
          data-speed="0.03"
          ref={(el) => (orbsRef.current[0] = el)}
        />
        <div
          className="accent-orb b"
          data-speed="0.05"
          ref={(el) => (orbsRef.current[1] = el)}
        />
        <div
          className="accent-orb c"
          data-speed="0.02"
          ref={(el) => (orbsRef.current[2] = el)}
        />
      </div>

      <ScrollReveal>
        <div className="section-label">What I Build</div>
      </ScrollReveal>

      {projectGroups.map((group) => (
        <ProjectGroup key={group.id} group={group} />
      ))}
    </main>
  );
}

export default Projects;
