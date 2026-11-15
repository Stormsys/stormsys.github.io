import React, { useState } from "react";
import GitHubIcon from "./GitHubIcon";
import Icon from "./Icon";
import ShuttleSpotlight from "./ShuttleSpotlight";
import { projectGroups } from "../data/projects";

function ProjectDetails({ project }) {
  if (!project.detail) return null;
  return (
    <details className="project-details">
      <summary>
        Behind the build <span className="sr-only">: {project.name}</span>
        <span className="details-icon" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="project-expanded">
        <p>{project.detail}</p>
        <ul className="tags" aria-label="Technologies">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
function ProjectLinks({ project }) {
  return project.links.length > 0 ? (
    <div className="project-links">
      {project.links.map((link) => (
        <a
          className="inline-link"
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          {link.url.startsWith("https://github.com/") && <GitHubIcon />}
          {link.label}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  ) : null;
}
function ProjectCard({ project }) {
  if (project.id === "shuttlestats")
    return <ShuttleSpotlight project={project} />;
  if (project.featured)
    return (
      <article className="featured-project" aria-labelledby="project-scores">
        <div className="featured-copy">
          <p className="eyebrow">
            SELECTED BUILD <span aria-hidden="true">/</span> {project.category}
          </p>
          <h3 id="project-scores">{project.name}</h3>
          <p className="project-lead">{project.problem}</p>
          <p className="project-description">{project.features}</p>
          <ProjectLinks project={project} />
          <ProjectDetails project={project} />
        </div>
        <figure className="product-figure">
          <div className="product-devices">
            <img
              className="phone-screen"
              src="/images/match-summary.webp"
              width="1320"
              height="2868"
              alt="Badminton Scores iPhone match summary, with game results and a point-by-point progress chart."
              loading="lazy"
              decoding="async"
            />
            <img
              className="watch-screen"
              src="/images/watch-scoring.webp"
              width="422"
              height="474"
              alt="Apple Watch scoring view showing a singles match at 12–15."
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            Badminton Scores App
            <span className="device-badges">
              <span><svg viewBox="0 0 20 24" aria-hidden="true"><rect x="4" y="1" width="12" height="22" rx="3"/><path d="M8 4h4M8 20h4"/></svg>iPhone</span>
              <span><svg viewBox="0 0 20 24" aria-hidden="true"><rect x="3" y="6" width="14" height="12" rx="4"/><path d="M6 6l1-5h6l1 5M6 18l1 5h6l1-5M17 10h1"/></svg>Apple Watch</span>
            </span>
          </figcaption>
        </figure>
      </article>
    );
  return (
    <article
      className={`project-card ${project.id === "shuttlestats" ? "project-quiet" : ""}`}
      aria-labelledby={`project-${project.id}`}
    >
      <div className="project-topline">
        <span className="project-number">{project.number}</span>
        <span className="eyebrow">{project.category}</span>
      </div>
      <h3 id={`project-${project.id}`}>{project.name}</h3>
      <p className="project-lead">{project.problem}</p>
      {project.features && (
        <p className="project-description">{project.features}</p>
      )}
      <div className="project-bottom">
        {project.stack?.length > 0 && (
          <ul className="project-inline-tags" aria-label="Technologies">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
export default function Projects() {
  const [filter, setFilter] = useState("all");
  const projects = projectGroups
    .flatMap((group) =>
      group.projects.map((project) => ({ ...project, group: group.id })),
    )
    .map((project, index) => ({
      ...project,
      number: String(index + 1).padStart(2, "0"),
    }));
  const visible = projects
    .filter((project) => filter === "all" || project.group === filter)
    .sort(
      (a, b) =>
        Number(b.id === "shuttlestats") - Number(a.id === "shuttlestats"),
    );
  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / BUILT WITH INTENT</p>
          <h2 id="projects-title">
            Ideas become real
            <br />
            when you build them.
          </h2>
        </div>
        <p>
          Personal projects, everyday problems.
          <br />
          Built to be used. Improved by using them.
        </p>
      </div>
      <div className="project-controls">
        <div className="filter-bar" aria-label="Filter projects">
          {[{ id: "all", name: "All work" }, ...projectGroups].map((group) => (
            <button
              key={group.id}
              aria-pressed={filter === group.id}
              onClick={() => setFilter(group.id)}
            >
              <Icon
                name={
                  group.id === "all"
                    ? "grid"
                    : group.id === "badminton"
                      ? "shuttle"
                      : "home"
                }
              />
              {group.name}
              <span aria-hidden="true">
                {group.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.group === group.id).length}
              </span>
            </button>
          ))}
        </div>
        <span className="project-count" role="status" aria-live="polite">
          {visible.length} projects
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
}
