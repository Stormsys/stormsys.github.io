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
        {group === "badminton" ? (
          <svg
            className="project-drawing court-drawing"
            viewBox="0 0 400 220"
            fill="none"
          >
            <rect x="72" y="14" width="256" height="192" />
            <path d="M88 14v192M312 14v192M72 36h256M72 184h256M72 82h256M72 138h256M200 14v68M200 138v68" />
            <path className="court-net" d="M60 110h280" />
            <circle className="court-player" cx="155" cy="56" r="8" />
            <circle className="court-player" cx="244" cy="167" r="8" />
            <path className="court-trail" d="M160 60q120 12 81 96" />
          </svg>
        ) : (
          <svg
            className="project-drawing home-drawing"
            viewBox="0 0 400 220"
            fill="none"
          >
            <path d="M120 190V95l80-67 80 67v95zM105 106l95-80 95 80" />
            <rect x="176" y="128" width="48" height="62" rx="3" />
            <path
              className="home-circuit"
              d="M120 130H65V65h-25M280 130h55V70h25M200 28V8M200 190v24M145 160H90v43M255 160h55v43"
            />
            <circle cx="40" cy="65" r="6" />
            <circle cx="360" cy="70" r="6" />
            <circle className="home-light" cx="200" cy="86" r="12" />
          </svg>
        )}
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
            How I built it <span aria-hidden="true">+</span>
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
          <span className="eyebrow">01 / THINGS I WANTED TO EXIST</span>
          <h2>It started with “surely there’s a better way”.</h2>
        </div>
        <p>
          A sport I play. A home I automate.
          <br />
          These are the rabbit holes I ended up in.
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
