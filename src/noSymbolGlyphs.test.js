import fs from "fs";
import path from "path";

// No emoji, and no text character standing in for an icon: arrows, dingbats,
// box drawing, geometric shapes, miscellaneous symbols and the emoji planes.
// Icons are inline SVG through the shared Icon component.
const RANGES = [
  [0x2190, 0x21ff],
  [0x2300, 0x23ff],
  [0x2460, 0x24ff],
  [0x2500, 0x27bf],
  [0x2900, 0x297f],
  [0x2b00, 0x2bff],
  [0xfe0e, 0xfe0f],
  [0x1f000, 0x1faff],
];
const isSymbol = (code) => RANGES.some(([from, to]) => code >= from && code <= to);

// Comments may draw rules and diagrams; shipped text may not.
function withoutComments(text, extension) {
  const blank = (match) => match.replace(/[^\n]/g, "");
  if (extension === ".html") return text.replace(/<!--[\s\S]*?-->/g, blank);
  if (![".js", ".scss"].includes(extension)) return text;
  return text
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:"'`])\/\/[^\n]*/g, "$1");
}

function symbolsIn(text, extension) {
  const found = [];
  withoutComments(text, extension)
    .split("\n")
    .forEach((line, index) => {
      for (const character of line) {
        const code = character.codePointAt(0);
        if (isSymbol(code))
          found.push(`line ${index + 1}: U+${code.toString(16).toUpperCase()}`);
      }
    });
  return found;
}

// Ordinary characters doing an icon's job: a plus, minus, multiplication sign,
// bullet or chevron that is the whole text of an element, a string in markup or
// a CSS content value. The same characters inside a sentence are punctuation.
const LONE = "[+<>\\u2212\\u00d7\\u2022\\u2039\\u203a\\u00ab\\u00bb]";
const NAMED = "&(?:gt|lt|times|plus|minus|bull|rsaquo|lsaquo|raquo|laquo);";
const LONE_ICON = new RegExp(
  [
    `>\\s*(?:[+\\u2212\\u00d7\\u2022\\u2039\\u203a\\u00ab\\u00bb]|${NAMED})\\s*</`,
    `\\{\\s*["'\`]\\s*${LONE}\\s*["'\`]\\s*\\}`,
    `content:\\s*["']\\s*${LONE}\\s*["']`,
  ].join("|"),
  "g",
);

function loneIconsIn(text, extension) {
  const clean = withoutComments(text, extension);
  return [...clean.matchAll(LONE_ICON)].map(
    (match) => `line ${clean.slice(0, match.index).split("\n").length}: a lone character used as an icon`,
  );
}

function files(directory, extensions) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "fonts" ? [] : files(full, extensions);
    return extensions.includes(path.extname(entry.name)) ? [full] : [];
  });
}

const root = path.join(__dirname, "..");
const scanned = [
  ...files(path.join(root, "src"), [".js", ".scss"]),
  ...files(path.join(root, "public"), [".html", ".txt", ".json", ".xml", ".svg"]),
];

test("the scan finds a symbol when one is present, and ignores comments", () => {
  const arrow = String.fromCodePoint(0x2197);
  const emoji = String.fromCodePoint(0x1f600);
  expect(symbolsIn(`const label = "Open ${arrow}";`, ".js")).toEqual(["line 1: U+2197"]);
  expect(symbolsIn(`a::after { content: "${emoji}"; }`, ".scss")).toEqual(["line 1: U+1F600"]);
  expect(symbolsIn(`/* ${arrow} */ const a = 1; // ${arrow}`, ".js")).toEqual([]);
  expect(symbolsIn(`<a href="https://example.com/">${arrow}</a>`, ".js")).toHaveLength(1);
});

test("no emoji or symbol character is used as an icon anywhere in the app", () => {
  expect(scanned.length).toBeGreaterThan(10);
  const offenders = scanned.flatMap((file) =>
    symbolsIn(fs.readFileSync(file, "utf8"), path.extname(file)).map(
      (hit) => `${path.relative(root, file)} ${hit}`,
    ),
  );
  expect(offenders).toEqual([]);
});

test("the scan finds a lone character used as an icon, and leaves punctuation alone", () => {
  const plus = String.fromCodePoint(0x2b);
  const times = String.fromCodePoint(0xd7);
  expect(loneIconsIn(`<span aria-hidden="true">\n  ${plus}\n</span>`, ".js")).toHaveLength(1);
  expect(loneIconsIn(`<span>{"${times}"}</span>`, ".js")).toHaveLength(1);
  expect(loneIconsIn(`a::after { content: "${plus}"; }`, ".scss")).toHaveLength(1);
  expect(loneIconsIn(`<b>&${"times"};</b>`, ".html")).toHaveLength(1);
  expect(loneIconsIn(`<span>HUMAN INSTINCT ${times} AI</span>`, ".js")).toEqual([]);
  expect(loneIconsIn(`<span>.</span><span>/</span> a ${plus} b`, ".js")).toEqual([]);
});

test("no ordinary character stands in for an icon anywhere in the app", () => {
  const offenders = scanned.flatMap((file) =>
    loneIconsIn(fs.readFileSync(file, "utf8"), path.extname(file)).map(
      (hit) => `${path.relative(root, file)} ${hit}`,
    ),
  );
  expect(offenders).toEqual([]);
});
