import assert from "node:assert/strict";
import fs from "node:fs";

const englishFiles = [
  "README.md",
  "collections/instructors.json",
  "collections/publications.json",
  "pages/about.html",
  "pages/index.html",
  "includes/home/card.html",
  "includes/home/cardhomepage.html",
];

const standaloneRomanizedName = /\bYang\s+Li\b/;

for (const file of englishFiles) {
  const content = fs.readFileSync(file, "utf8");

  assert.match(
    content,
    standaloneRomanizedName,
    `${file} should preserve standalone Yang Li in English baseline content`,
  );
}

const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(mainJs, /'home\.intro': '<span class="font-semibold">YangLi Lab<\/span>, led by Dr\. Yang Li/);
assert.match(mainJs, /'about\.heading': 'About Yang Li'/);
assert.match(mainJs, /'profile\.name': 'Yang Li'/);
assert.match(mainJs, /'profile\.name': '李杨'/);
assert.match(mainJs, /'team\.instructors\.yangLi\.name': '李杨'/);
assert.match(mainJs, /'team\.currentStudents\.jiaqiHu\.name': '胡佳奇'/);
assert.match(mainJs, /'team\.students\.yongjieLiu\.name': '刘永杰'/);
