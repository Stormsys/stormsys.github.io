import React, { useState } from "react";
import { projectGroups } from "../data/projects";

function ProjectCard({ project, index, group }) {
  return (
    <article className="project-card">
      <div className={`project-art ${group}`} aria-hidden="true">
        <span className="art-index">
          {String(index + 1).padStart(2, "0")} /{" "}
          {group === "badminton" ? "ON THE COURT" : "AT HOME"}
        </span>
        <div className="art-shape">
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="art-caption">{project.subtitle || project.name}</span>
      </div>
      <div className="project-body">
        <div className="project-kicker">
          {group === "badminton" ? "SPORT & COMMUNITY" : "EVERYDAY AUTOMATION"}
        </div>
        <h3>{project.name}</h3>
        <p>{project.problem}</p>
        <details>
          <summary>
            Inside the project <span aria-hidden="true">+</span>
          </summary>
          <div className="project-expanded">
            <p>{project.features}</p>
            {project.complexity && (
              <>
                <h4>Engineering</h4>
                <p>{project.complexity}</p>
              </>
            )}
            <ul className="tags">
              {(project.fullStack || project.tags.map((t) => t.label)).map(
                (t) => (
                  <li key={t}>{t}</li>
                ),
              )}
            </ul>
          </div>
        </details>
        <div className="project-links">
          {project.links.length ? (
            project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))
          ) : (
            <span className="private-project">
              Built for my club · Private project
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
export default function Projects() {
  const [filter, setFilter] = useState("all");
  const projects = projectGroups.flatMap((group) =>
    group.projects.map((project) => ({ ...project, group: group.id })),
  );
  return (
    <main id="projects" className="projects">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / SELECTED WORK</span>
          <h2>Built from real life.</h2>
        </div>
        <p>
          A sport I play. A home I automate.
          <br />
          Small frustrations turned into working software.
        </p>
      </div>
      <div className="filter-bar" aria-label="Filter projects">
        {[{ id: "all", name: "All projects" }, ...projectGroups].map(
          (group) => (
            <button
              key={group.id}
              aria-pressed={filter === group.id}
              onClick={() => setFilter(group.id)}
            >
              {group.name}
              <span>
                {group.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.group === group.id).length}
              </span>
            </button>
          ),
        )}
      </div>
      <div className="project-grid">
        {projects
          .filter((p) => filter === "all" || p.group === filter)
          .map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              group={project.group}
            />
          ))}
      </div>
    </main>
  );
}
