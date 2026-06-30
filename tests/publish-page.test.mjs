import assert from "node:assert/strict";
import fs from "node:fs";

const menu = JSON.parse(fs.readFileSync("collections/menu.json", "utf8"));
const publishPage = fs.readFileSync("pages/publish.html", "utf8");
const publicationCard = fs.readFileSync("includes/publication-card.html", "utf8");
const publications = JSON.parse(
  fs.readFileSync("collections/publications.json", "utf8"),
);
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

const menuNames = menu.map((item) => item.name);
assert.deepEqual(
  menuNames.slice(
    menuNames.indexOf("Recruitment"),
    menuNames.indexOf("Team") + 1,
  ),
  ["Recruitment", "Publish", "Team"],
);
assert.equal(menu.find((item) => item.name === "Publish")?.url, "/publish");

assert.match(publishPage, /title="Publish"/);
assert.match(publishPage, /collection="publications"/);
assert.match(publishPage, /src="publication-card.html"/);
assert.doesNotMatch(
  publishPage,
  /Peer-reviewed publications from the lab, listed by first online publication date\./,
);
assert.doesNotMatch(publishPage, /md:grid-cols-2/);

assert.match(publicationCard, /{publications.title}/);
assert.match(publicationCard, /{publications.image}/);
assert.match(publicationCard, /{publications.journal}/);
assert.match(publicationCard, /{publications.authors}/);
assert.match(publicationCard, /data-i18n="\{publications\.authorsKey\}"/);
assert.match(publicationCard, /sm:flex-row/);
assert.match(publicationCard, /sm:w-/);
assert.match(publicationCard, /z-20[^>]*group-hover:-translate-x-1[^>]*group-hover:-translate-y-1/s);
assert.match(publicationCard, /z-10[^>]*group-hover:translate-x-1[^>]*group-hover:translate-y-1/s);
assert.match(publicationCard, /relative z-30[^>]*group-hover:-translate-x-1[^>]*group-hover:-translate-y-1/s);

assert.equal(publications.length, 5);

for (const publication of publications) {
  assert.equal(typeof publication.title, "string");
  assert.equal(typeof publication.image, "string");
  assert.equal(typeof publication.journal, "string");
  assert.equal(typeof publication.authors, "string");
  assert.equal(typeof publication.authorsKey, "string");
  assert.equal(typeof publication.published, "string");
  assert.match(publication.image, /^\/assets\/images\/publications\//);
  assert.ok(fs.existsSync(publication.image.replace(/^\//, "")));
}

assert.deepEqual(
  Object.fromEntries(
    publications.map((publication) => [publication.title, publication.image]),
  ),
  {
    "DyScoreDiff: A Diffusion Model for Medical Image Segmentation Based on Dynamic Image-Quality Scoring":
      "/assets/images/publications/dyscorediff-figure1.jpg",
    "A multi-scale CNN-Transformer parallel network for 12-lead ECG signal classification":
      "/assets/images/publications/ecg-cnn-transformer.png",
    "A Latent Multi-Scale Residual Transformer Approach for Cross-Modal Medical Image Synthesis":
      "/assets/images/publications/lmrt.jpg",
    "HSGO: Harmonized Swarm Learning With Guided Optimization for Multi-Center sMRI Classification of Alzheimer's Disease":
      "/assets/images/publications/hsgo.jpg",
    "SOCR-YOLO: Small Objects Detection Algorithm in Medical Images":
      "/assets/images/publications/socr-yolo-figure1.jpg",
  },
);

const expectedChineseAuthors = [
  "胡佳奇, 李杨",
  "韦龙, 李杨",
  "朱鑫淼, 李杨",
  "宋方涛, 李杨, 蒋明峰, Kaicheng Li, Jucheng Zhang, Yinlong Zhang, Zhibo Pang",
  "刘永杰, 李杨, 蒋明峰, Shuchao Wang, Shitai Ye, Simon Walsh, Guang Yang",
];

for (const authors of expectedChineseAuthors) {
  assert.match(mainJs, new RegExp(authors.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}

const timestamps = publications.map((publication) =>
  Date.parse(publication.published),
);
assert.deepEqual(
  timestamps,
  [...timestamps].sort((left, right) => right - left),
);

assert.deepEqual(
  publications.map((publication) => publication.title),
  [
    "DyScoreDiff: A Diffusion Model for Medical Image Segmentation Based on Dynamic Image-Quality Scoring",
    "A multi-scale CNN-Transformer parallel network for 12-lead ECG signal classification",
    "A Latent Multi-Scale Residual Transformer Approach for Cross-Modal Medical Image Synthesis",
    "HSGO: Harmonized Swarm Learning With Guided Optimization for Multi-Center sMRI Classification of Alzheimer's Disease",
    "SOCR-YOLO: Small Objects Detection Algorithm in Medical Images",
  ],
);
