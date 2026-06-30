import assert from "node:assert/strict";
import fs from "node:fs";

const homePage = fs.readFileSync("pages/index.html", "utf8");
const aboutPage = fs.readFileSync("pages/about.html", "utf8");
const recruitmentPage = fs.readFileSync("pages/recruitment.html", "utf8");
const publishPage = fs.readFileSync("pages/publish.html", "utf8");
const teamPage = fs.readFileSync("pages/team.html", "utf8");
const projectsPage = fs.readFileSync("pages/projects.html", "utf8");
const postsPage = fs.readFileSync("pages/posts.html", "utf8");
const recruitmentLoop = fs.readFileSync("includes/recruitment-loop.html", "utf8");
const footer = fs.readFileSync("includes/footer.html", "utf8");
const card = fs.readFileSync("includes/home/card.html", "utf8");
const cardHomepage = fs.readFileSync("includes/home/cardhomepage.html", "utf8");
const recruitment = JSON.parse(fs.readFileSync("collections/recruiment.json", "utf8"));

assert.match(homePage, /data-i18n-document-title="page\.home\.title"/);
assert.match(homePage, /data-i18n="home\.title"/);
assert.match(homePage, /data-i18n-html="home\.intro"/);
assert.match(homePage, /data-i18n="home\.research\.medicalImage"/);
assert.match(homePage, /data-i18n="home\.values"/);
assert.match(homePage, /md:gap-12/);
assert.match(homePage, /xl:gap-16/);
assert.match(homePage, /md:w-\[46%\]/);

assert.match(aboutPage, /titleKey="about\.heading"/);
assert.match(aboutPage, /descriptionKey="about\.description"/);
assert.match(aboutPage, /data-i18n="about\.introduction\.title"/);
assert.match(aboutPage, /data-i18n-html="about\.introduction\.body"/);
assert.match(aboutPage, /class="[^"]*about-introduction[^"]*"/);
assert.match(aboutPage, /data-i18n="about\.funds"/);

assert.match(recruitmentPage, /titleKey="recruitment\.heading"/);
assert.match(recruitmentPage, /descriptionKey="recruitment\.description"/);
assert.match(publishPage, /titleKey="publish\.heading"/);
assert.match(teamPage, /titleKey="team\.heading"/);
assert.match(teamPage, /data-i18n="team\.professors"/);
assert.match(teamPage, /data-i18n="team\.currentStudents"/);
assert.match(teamPage, /data-i18n="team\.graduatedStudents"/);
assert.match(projectsPage, /titleKey="team\.heading"/);
assert.match(projectsPage, /data-i18n="team\.instructor"/);
assert.match(projectsPage, /data-i18n="team\.students"/);
assert.match(postsPage, /titleKey="posts\.heading"/);
assert.match(postsPage, /descriptionKey="posts\.description"/);

assert.deepEqual(
  recruitment.map((item) => [item.titleKey, item.descriptionKey]),
  [
    ["recruitment.devices.title", "recruitment.devices.description"],
    ["recruitment.requirements.title", "recruitment.requirements.description"],
    ["recruitment.contact.title", "recruitment.contact.description"],
  ],
);
assert.match(recruitmentLoop, /data-i18n="\{recruiment\.titleKey\}"/);
assert.match(recruitmentLoop, /data-i18n-html="\{recruiment\.descriptionKey\}"/);
assert.doesNotMatch(recruitmentLoop, /<p[^>]*data-i18n-html="\{recruiment\.descriptionKey\}"/);
assert.match(recruitmentLoop, /<div[^>]*data-i18n-html="\{recruiment\.descriptionKey\}"/);

assert.match(footer, /data-i18n="footer\.tagline"/);
assert.match(card, /data-i18n="profile\.role"/);
assert.match(card, /data-i18n="profile\.button"/);
assert.match(card, /data-i18n="profile\.degree"/);
assert.match(card, /data-i18n="profile\.membership"/);
assert.match(cardHomepage, /data-i18n="profile\.role"/);
assert.match(cardHomepage, /data-i18n="profile\.degree"/);
assert.match(cardHomepage, /data-i18n="profile\.membership"/);
assert.match(cardHomepage, /data-i18n="profile\.research"/);
assert.match(card, /data-i18n="profile\.name"/);
assert.match(cardHomepage, /data-i18n="profile\.name"/);
assert.match(cardHomepage, /profile-name-role/);
assert.match(cardHomepage, /md:grid-cols-\[minmax\(0,1\.3fr\)_minmax\(0,1fr\)_minmax\(0,1\.2fr\)\]/);
assert.match(cardHomepage, /sm:flex-wrap/);
assert.match(cardHomepage, /min-w-0/);
assert.match(cardHomepage, /shrink-0/);
assert.match(cardHomepage, /break-all/);

assert.match(teamPage, /nameKey="\{instructors\.nameKey\}"/);
assert.match(teamPage, /descriptionKey="\{instructors\.descriptionKey\}"/);
assert.match(teamPage, /nameKey="\{current_students\.nameKey\}"/);
assert.match(teamPage, /descriptionKey="\{current_students\.descriptionKey\}"/);
assert.match(teamPage, /nameKey="\{students\.nameKey\}"/);
assert.match(teamPage, /descriptionKey="\{students\.descriptionKey\}"/);
assert.match(projectsPage, /nameKey="\{instructors\.nameKey\}"/);
assert.match(projectsPage, /descriptionKey="\{instructors\.descriptionKey\}"/);
assert.match(projectsPage, /nameKey="\{students\.nameKey\}"/);
assert.match(projectsPage, /descriptionKey="\{students\.descriptionKey\}"/);
