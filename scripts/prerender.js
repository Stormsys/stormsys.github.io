// Writes the page's real content into build/index.html, so a reader that does
// not run JavaScript (search and AI crawlers, link previewers) gets the text.
//
// It renders the same <App /> the browser renders, on the server, with React's
// own renderToString. Effects do not run there, so nothing that depends on a
// viewport, a clock or a browser API is baked in. The browser then hydrates
// this markup instead of rebuilding it (see src/index.js).
//
// Runs after every build: `npm run build` calls it through "postbuild".
process.env.NODE_ENV = "production";
process.env.BROWSERSLIST_IGNORE_OLD_DATA = "1";

const fs = require("fs");
const path = require("path");
const Module = require("module");
const babel = require("@babel/core");

const root = path.join(__dirname, "..");
const source = path.join(root, "src") + path.sep;

// Source files are compiled on the way in; styles are not needed for markup.
const compileJs = Module._extensions[".js"];
Module._extensions[".js"] = (module, filename) => {
  if (!filename.startsWith(source)) return compileJs(module, filename);
  const { code } = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [
      [require.resolve("@babel/preset-env"), { targets: { node: "current" }, modules: "commonjs" }],
      [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
    ],
  });
  module._compile(code, filename);
};
Module._extensions[".scss"] = () => {};

const React = require("react");
const { renderToString } = require("react-dom/server");
const App = require(path.join(source, "App.js")).default;

const file = path.join(root, "build", "index.html");
const empty = '<div id="root"></div>';
const page = fs.readFileSync(file, "utf8");
if (page.split(empty).length !== 2) {
  throw new Error(`prerender: expected exactly one ${empty} in build/index.html`);
}

const markup = renderToString(React.createElement(App));
if (!markup.includes("<h1") || markup.length < 5000) {
  throw new Error("prerender: the rendered page is missing its content");
}
// A reader of the static page must never be handed a contact address.
if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(markup)) {
  throw new Error("prerender: the rendered page contains an email address");
}

fs.writeFileSync(file, page.replace(empty, () => `<div id="root">${markup}</div>`));
console.log(`prerender: wrote ${markup.length} characters of content into build/index.html`);
