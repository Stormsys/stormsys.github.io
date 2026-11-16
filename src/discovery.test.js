import fs from "fs";
import path from "path";
import { projectGroups } from "./data/projects";

const pub = (file) =>
  fs.readFileSync(path.join(__dirname, "..", "public", file), "utf8");

function graph() {
  const html = pub("index.html");
  const block = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  return JSON.parse(block[1])["@graph"];
}

test("structured data names one person and every project on the page", () => {
  const nodes = graph();
  const people = nodes.filter((node) => node["@type"] === "Person");
  expect(people).toHaveLength(1);
  expect(people[0].name).toBe("Diogo Moura");
  expect(people[0].sameAs).toEqual([
    "https://www.linkedin.com/in/diogomoura1",
    "https://github.com/Stormsys",
  ]);

  const projects = projectGroups.flatMap((group) => group.projects);
  const named = nodes.map((node) => node.name);
  projects.forEach((project) => expect(named).toContain(project.name));

  // Every outbound project link on the page is the one the data declares.
  projects
    .filter((project) => project.links.length)
    .forEach((project) => {
      const node = nodes.find((item) => item.name === project.name);
      expect([node.url, node.codeRepository]).toContain(project.links[0].url);
    });
});

test("discovery files point at the canonical site", () => {
  expect(pub("robots.txt")).toMatch(
    /^Sitemap: https:\/\/stormsys\.net\/sitemap\.xml$/m,
  );
  expect(pub("robots.txt")).not.toMatch(/^Disallow: \/./m);
  const locs = [...pub("sitemap.xml").matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(locs).toEqual(["https://stormsys.net/", "https://stormsys.net/cv/"]);
  expect(pub("index.html")).toMatch(
    /<link rel="canonical" href="https:\/\/stormsys\.net\/" \/>/,
  );
});

test("no email address is published in any static file", () => {
  const address = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  // Known-positive control: the pattern does find an address when one exists.
  expect("write to someone@example.com").toMatch(address);
  ["index.html", "404.html", "llms.txt", "robots.txt", "sitemap.xml", "manifest.json"].forEach(
    (file) => expect(pub(file)).not.toMatch(address),
  );
});
