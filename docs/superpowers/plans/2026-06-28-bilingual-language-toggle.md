# Bilingual Language Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a default-English, toggleable English/Simplified Chinese language mode for the static YangLi Lab site.

**Architecture:** Keep the site as one static route set and add a client-side translation layer in `assets/js/main.js`. Templates and collections expose stable `data-i18n`, `data-i18n-html`, and document-title keys; JavaScript reads `localStorage.site_language`, applies `en` or `zh`, and updates `<html lang>`, text, rich HTML, document titles, the header language toggle, theme labels, and context-menu labels.

**Tech Stack:** DevDojo Static HTML templates, JSON collections, plain browser JavaScript, Tailwind utility classes, Node assertion tests, `npx static build`.

---

## File Structure

- Create `tests/language-mode.test.mjs`: verifies layout/header/menu/page translation hooks.
- Create `tests/language-runtime.test.mjs`: verifies language state helpers, persistence, dictionary entries, `zh-CN`, document-title behavior, and context-menu translation usage.
- Modify `tests/card-context-menu.test.mjs`: update expectations from hardcoded Chinese labels to dictionary-backed context-menu labels.
- Modify `layouts/main.html`: initialize stored language on `<html lang>` early, beside the existing dark-mode bootstrap.
- Modify `includes/header.html`: add `data-i18n` hooks to nav/theme labels and add the language toggle button.
- Modify `collections/menu.json`: add translation keys for nav items.
- Modify `includes/page-heading.html`: accept caller-provided `titleKey` and `descriptionKey` attributes.
- Modify `pages/index.html`, `pages/about.html`, `pages/recruitment.html`, `pages/publish.html`, `pages/team.html`, `pages/projects.html`, and `pages/posts.html`: add document-title keys and translation hooks for visible page text.
- Modify `collections/recruiment.json`: add explicit title/description translation keys for each recruitment card.
- Modify `includes/recruitment-loop.html`: consume recruitment translation keys with `data-i18n` and `data-i18n-html`.
- Modify `includes/footer.html`: add a footer translation hook.
- Modify `includes/home/card.html` and `includes/home/cardhomepage.html`: add hooks for repeated profile-card labels such as role, profile button, degree, membership, and research direction.
- Modify `assets/js/main.js`: add the translation dictionary, language-state helpers, DOM application logic, toggle handler, and dictionary-backed context-menu labels.

Do not stage or modify the pre-existing unrelated image deletions/additions or `tmp/` files.

---

### Task 1: Layout, Header, And Navigation Hooks

**Files:**
- Create: `tests/language-mode.test.mjs`
- Modify: `layouts/main.html`
- Modify: `includes/header.html`
- Modify: `collections/menu.json`
- Modify: `includes/page-heading.html`

- [ ] **Step 1: Write the failing test**

Create `tests/language-mode.test.mjs`:

```js
import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("layouts/main.html", "utf8");
const header = fs.readFileSync("includes/header.html", "utf8");
const pageHeading = fs.readFileSync("includes/page-heading.html", "utf8");
const menu = JSON.parse(fs.readFileSync("collections/menu.json", "utf8"));

assert.match(layout, /site_language/);
assert.match(layout, /document\.documentElement\.lang\s*=\s*'zh-CN'/);
assert.match(layout, /document\.documentElement\.lang\s*=\s*'en'/);

assert.match(header, /id="languageToggle"/);
assert.match(header, /id="languageToggleText"/);
assert.match(header, /aria-label="Switch language to Chinese"/);
assert.match(header, /data-i18n="\{menu\.translationKey\}"/);
assert.match(header, /data-i18n="theme\.day"/);
assert.match(header, /data-i18n="theme\.night"/);

assert.match(pageHeading, /data-i18n="\{titleKey\}"/);
assert.match(pageHeading, /data-i18n="\{descriptionKey\}"/);

assert.deepEqual(
  menu.map((item) => item.translationKey),
  ["nav.home", "nav.recruitment", "nav.publish", "nav.team", "nav.about"],
);
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
rtk node tests/language-mode.test.mjs
```

Expected: FAIL with an assertion mentioning `site_language`, `languageToggle`, `translationKey`, or `data-i18n` because the project has no language hooks yet.

- [ ] **Step 3: Add early language bootstrap in `layouts/main.html`**

Replace the existing inline dark-mode script with:

```html
    <!-- Used to add persisted display modes right away, preventing flicker -->
    <script>
        (function(){
            function getStoredValue(key){
                try {
                    if(typeof(Storage) !== "undefined"){
                        return localStorage.getItem(key);
                    }
                } catch (error) {
                    return null;
                }
                return null;
            }

            if(getStoredValue('dark_mode') == 'true'){
                document.documentElement.classList.add('dark');
            }

            document.documentElement.lang = getStoredValue('site_language') == 'zh' ? 'zh-CN' : 'en';
        })();
    </script>
```

- [ ] **Step 4: Add header language controls and translation hooks**

In `includes/header.html`, replace the menu anchor with:

```html
                    <a href="{menu.url}" data-i18n="{menu.translationKey}" class="relative flex items-center justify-center w-full px-3 py-2 font-medium tracking-wide text-center duration-200 ease-out sm:py-0 sm:mb-0 md:w-auto hover:text-neutral-900 dark:hover:text-white">{menu.name}</a>
```

Replace the day/night label spans with:

```html
                    <span id="dayText" class="ml-2" data-i18n="theme.day">Day mode</span>
                    <span id="nightText" class="hidden ml-2" data-i18n="theme.night">Night mode</span>
```

Add this button immediately after the closing `</div>` for `darkToggle` and before `</nav>`:

```html
            <button id="languageToggle" type="button" class="relative flex items-center justify-center min-w-10 px-2 py-1 ml-4 text-xs font-semibold tracking-wide duration-200 border border-dashed rounded-full cursor-pointer border-neutral-300 text-neutral-800 hover:border-neutral-600 dark:border-neutral-700 dark:text-white dark:hover:border-neutral-400" aria-label="Switch language to Chinese">
                <span id="languageToggleText">EN</span>
            </button>
```

- [ ] **Step 5: Add navigation keys in `collections/menu.json`**

Replace `collections/menu.json` with:

```json
[
    {
        "name": "Home",
        "url": "/",
        "translationKey": "nav.home"
    },
    {
        "name": "Recruitment",
        "url": "/recruitment",
        "translationKey": "nav.recruitment"
    },
    {
        "name": "Publish",
        "url": "/publish",
        "translationKey": "nav.publish"
    },
    {
        "name": "Team",
        "url": "/team",
        "translationKey": "nav.team"
    },
    {
        "name": "About",
        "url": "/about",
        "translationKey": "nav.about"
    }
]
```

- [ ] **Step 6: Add reusable page-heading keys**

Replace `includes/page-heading.html` with:

```html
<div class="relative z-20 w-full mx-auto lg:mx-0">
    <h2 data-i18n="{titleKey}" class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl lg:text-4xl">{title}</h2>
    <p data-i18n="{descriptionKey}" class="mt-3 text-base leading-6 text-neutral-600 dark:text-neutral-400 sm:mt-4 lg:mt-6 sm:leading-7 lg:leading-8 sm:text-base lg:text-lg">{description}</p>
</div>
```

- [ ] **Step 7: Run the test to verify it passes**

Run:

```bash
rtk node tests/language-mode.test.mjs
```

Expected: PASS with no output.

- [ ] **Step 8: Commit Task 1**

Run:

```bash
rtk git add tests/language-mode.test.mjs layouts/main.html includes/header.html collections/menu.json includes/page-heading.html
rtk git commit -m "feat: add language mode shell hooks"
```

Expected: commit succeeds and staged files do not include image or `tmp/` changes.

---

### Task 2: Page, Footer, Profile Card, And Recruitment Hooks

**Files:**
- Create: `tests/language-content-hooks.test.mjs`
- Modify: `pages/index.html`
- Modify: `pages/about.html`
- Modify: `pages/recruitment.html`
- Modify: `pages/publish.html`
- Modify: `pages/team.html`
- Modify: `pages/projects.html`
- Modify: `pages/posts.html`
- Modify: `collections/recruiment.json`
- Modify: `includes/recruitment-loop.html`
- Modify: `includes/footer.html`
- Modify: `includes/home/card.html`
- Modify: `includes/home/cardhomepage.html`

- [ ] **Step 1: Write the failing content-hook test**

Create `tests/language-content-hooks.test.mjs`:

```js
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

assert.match(aboutPage, /titleKey="about\.heading"/);
assert.match(aboutPage, /descriptionKey="about\.description"/);
assert.match(aboutPage, /data-i18n="about\.introduction\.title"/);
assert.match(aboutPage, /data-i18n-html="about\.introduction\.body"/);
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

assert.match(footer, /data-i18n="footer\.tagline"/);
assert.match(card, /data-i18n="profile\.role"/);
assert.match(card, /data-i18n="profile\.button"/);
assert.match(card, /data-i18n="profile\.degree"/);
assert.match(card, /data-i18n="profile\.membership"/);
assert.match(cardHomepage, /data-i18n="profile\.role"/);
assert.match(cardHomepage, /data-i18n="profile\.degree"/);
assert.match(cardHomepage, /data-i18n="profile\.membership"/);
assert.match(cardHomepage, /data-i18n="profile\.research"/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
rtk node tests/language-content-hooks.test.mjs
```

Expected: FAIL with an assertion mentioning missing `data-i18n-document-title`, `titleKey`, `descriptionKey`, or recruitment keys.

- [ ] **Step 3: Add home page hooks in `pages/index.html`**

Apply these exact edits:

```html
<layout title="YangLi Lab - Your Dream Lab" src="main.html">
    
    <div data-i18n-document-title="page.home.title" class="relative z-20 w-full max-w-4xl mx-auto mt-2 px-7 md:mt-2 lg:mt-2 xl:px-0">
        <h1 data-i18n="home.title" class="mb-5 text-3xl font-bold leading-tight md:text-4xl lg:text-4xl dark:text-white">
            Hi~ Welcome to YangLi Lab.
        </h1>
```

Replace the intro paragraph content with:

```html
                <p class="mb-6 text-xl space-y-1 text-neutral-600 dark:text-neutral-400">
                    <span data-i18n-html="home.intro"><span class="font-semibold">YangLi Lab</span>, led by Dr. Yang Li, develops AI for medical image analysis and computer-aided diagnosis.</span>
                    <br>
                    <ul class="py-2 space-y-[3px] text-base list-disc list-inside text-neutral-500 dark:text-neutral-400">
                        <li data-i18n="home.research.medicalImage">Medical Image Processing and Analysis</li>
                        <li data-i18n="home.research.aiForScience">Artificial Intelligence for Science</li>
                        <li data-i18n="home.research.diagnosis">Computer-aided Diagnosis</li>
                        <li data-i18n="home.research.deepLearning">Deep Learning</li>
                        <li data-i18n="home.research.more">Other more areas ....</li>
                    </ul>
                    <br class="hidden lg:block">
                    <p data-i18n="home.values" class="text-neutral-600 dark:text-neutral-400">Our Values can be found here. </p>
                </p>
```

- [ ] **Step 4: Add page-heading keys and page section hooks**

Use these caller attributes:

```html
<!-- pages/about.html -->
<section data-i18n-document-title="page.about.title" class="relative z-20 max-w-2xl mx-auto mt-2 px-7 lg:px-0">
<include src="page-heading.html" title="About Yang Li" description="Hello 👋 Here is some detailed introduction about Dr. Yang Li" titleKey="about.heading" descriptionKey="about.description"></include>
<h2 data-i18n="about.introduction.title" class="mb-2 text-2xl font-bold dark:text-neutral-200">Introduction</h2>
<p data-i18n-html="about.introduction.body" class="text-sm leading-6 text-gray-600 dark:text-neutral-400 sm:leading-7 lg:leading-8 sm:text-base lg:text-lg">
<h2 data-i18n="about.funds" class="mt-5 mb-2 text-2xl font-bold lg:mt-10 sm:mt-6 dark:text-neutral-200">Funds</h2>

<!-- pages/recruitment.html -->
<section data-i18n-document-title="page.recruitment.title" class="relative z-20 max-w-2xl mx-auto my-2 px-7 lg:px-0">
<include src="page-heading.html" title="Join US" description="Welcome to our recruitment page. Here is a brief introduction to our laboratory, including laboratory equipments and benefits." titleKey="recruitment.heading" descriptionKey="recruitment.description"></include>

<!-- pages/publish.html -->
<section data-i18n-document-title="page.publish.title" class="relative z-20 max-w-4xl mx-auto mt-2 px-7 lg:px-0">
<include src="page-heading.html" title="Published Papers" description="" titleKey="publish.heading" descriptionKey="publish.description"></include>

<!-- pages/team.html -->
<section data-i18n-document-title="page.team.title" class="relative z-20 max-w-2xl mx-auto mt-2 px-7 lg:px-0">
<include src="page-heading.html" title="Team Memberships" description="" titleKey="team.heading" descriptionKey="team.description"></include>
<h2 data-i18n="team.professors" class="mt-5 mb-2 text-2xl font-bold lg:mt-10 sm:mt-6 dark:text-neutral-200">Professors</h2>
<h2 data-i18n="team.currentStudents" class="mt-5 mb-2 text-2xl font-bold lg:mt-10 sm:mt-6 dark:text-neutral-200">Current Students</h2>
<h2 data-i18n="team.graduatedStudents" class="mt-5 mb-2 text-2xl font-bold lg:mt-10 sm:mt-6 dark:text-neutral-200">Graduated Students</h2>

<!-- pages/projects.html -->
<section data-i18n-document-title="page.team.title" class="relative z-20 max-w-2xl mx-auto my-12 px-7 lg:px-0">
<include src="page-heading.html" title="Team Memberships" description="" titleKey="team.heading" descriptionKey="team.description"></include>
<h2 data-i18n="team.instructor" class="mt-5 mb-2 text-2xl font-bold lg:mt-10 sm:mt-6 dark:text-neutral-200">Instructor</h2>
<h2 data-i18n="team.students" class="mt-5 mb-2 text-2xl font-bold lg:mt-10 sm:mt-6 dark:text-neutral-200">Students</h2>

<!-- pages/posts.html -->
<section data-i18n-document-title="page.posts.title" class="relative z-20 max-w-2xl mx-auto my-12 px-7 lg:px-0">
<include src="page-heading.html" title="My Writing" description="Dive into my musings on life and tech in my latest posts; a blend of introspection and innovation. Keep an eye out for fresh insights and updates!" titleKey="posts.heading" descriptionKey="posts.description"></include>
```

When editing `pages/about.html`, keep the existing English paragraph text inside the `<p data-i18n-html="about.introduction.body" ...>` element so English remains the no-JavaScript baseline.

- [ ] **Step 5: Add recruitment collection keys and loop hooks**

In `collections/recruiment.json`, add keys to each object:

```json
[
    {
      "title": "🖥️ Devices",
      "titleKey": "recruitment.devices.title",
      "description": "Our lab's servers are equipped with <span class='font-semibold'>5 RTX 4090 GPUs</span> and <span class='font-semibold'>128GB of RAM</span>, providing each student with an individual account, supporting SSH remote connections, high concurrency, and high responsiveness to meet the research and experimental needs of <span class='font-semibold'>every student</span>.",
      "descriptionKey": "recruitment.devices.description",
      "link": ""
    },
    {
      "title": "🛠️ Requirements",
      "titleKey": "recruitment.requirements.title",
      "description": "If you are interested in the following topics and are passionate about learning medical AI knowledge, please prepare your <span class='font-semibold'>Personal Materials</span>.<br> The materials are included but not limited to your <span class='font-semibold'>Resume</span>, <span class='font-semibold'>Award Certificates</span>, and <span class='font-semibold'>Research Experience</span>, as evidence of your comprehensive abilities. <br><br>Our research topics are as following:<ul class='py-2 space-y-[3px] text-sm list-disc list-inside text-neutral-500 dark:text-neutral-400'><li>Medical Image Segmentation, Detection, and Registration</li><li>Early Alzheimer's Disease Computer-aided Diagnosis</li><li>Cross-modal and Multimodal Medical Image Analysis</li><li>ECG Classification and Computer-aided Diagnosis</li><li>Federated Learning for Medical AI</li></ul>",
      "descriptionKey": "recruitment.requirements.description",
      "link": ""
    },
    {
      "title": "📮 Contact",
      "titleKey": "recruitment.contact.title",
      "description": "If meeting our requirements, and you are willing to join us. Please prepare your personal materials and contact our tutor YangLi via email. The mail is <span class='font-semibold'>yangli@zstu.edu.cn</span>",
      "descriptionKey": "recruitment.contact.description",
      "link": "mailto:yangli@zstu.edu.cn"
    }
  ]
```

In `includes/recruitment-loop.html`, change the title and description elements to:

```html
                    <div data-i18n="{recruiment.titleKey}" class="text-xl font-bold leading-tight tracking-tight sm:text-2xl dark:text-neutral-100">
                        {recruiment.title}
                    </div>
```

```html
                <p data-i18n-html="{recruiment.descriptionKey}" class="text-sm text-neutral-600 dark:text-neutral-400">
                    {recruiment.description}
                </p>
```

- [ ] **Step 6: Add footer and profile-card hooks**

In `includes/footer.html`, change the tagline paragraph to:

```html
        <p data-i18n="footer.tagline" class="mt-4 text-sm text-neutral-700 dark:text-neutral-100 sm:ml-4 sm:pl-4 sm:border-l sm:border-neutral-300 dark:sm:border-neutral-700 sm:mt-0">© 2026 YangLi Lab - Your Dream Lab
        </p>
```

In both profile card includes, add `data-i18n` hooks to the existing text nodes:

```html
<p data-i18n="profile.role" class="text-gray-400 mt-1">Assistant Professor </p>
<span data-i18n="profile.button" class="ml-2">Profile</span>
<span data-i18n="profile.degree" class="ml-2">Ph.D. at UCAS (SHEN YANG)</span>
<span data-i18n="profile.membership" class="ml-2">Senoir Member of CSBME</span>
<span data-i18n="profile.research" class="ml-2">Pattern Recognition</span>
```

For `includes/home/cardhomepage.html`, keep its `mt-5` role class and only add the `data-i18n="profile.role"` attribute:

```html
<p data-i18n="profile.role" class="text-gray-400 mt-5">Assistant Professor </p>
```

- [ ] **Step 7: Run content-hook tests**

Run:

```bash
rtk node tests/language-content-hooks.test.mjs
rtk node tests/language-mode.test.mjs
```

Expected: both commands pass with no output.

- [ ] **Step 8: Commit Task 2**

Run:

```bash
rtk git add tests/language-content-hooks.test.mjs pages/index.html pages/about.html pages/recruitment.html pages/publish.html pages/team.html pages/projects.html pages/posts.html collections/recruiment.json includes/recruitment-loop.html includes/footer.html includes/home/card.html includes/home/cardhomepage.html
rtk git commit -m "feat: add translation hooks to site content"
```

Expected: commit succeeds and staged files do not include image or `tmp/` changes.

---

### Task 3: Language Runtime And Context Menu Translation

**Files:**
- Create: `tests/language-runtime.test.mjs`
- Modify: `tests/card-context-menu.test.mjs`
- Modify: `assets/js/main.js`

- [ ] **Step 1: Write the failing runtime test**

Create `tests/language-runtime.test.mjs`:

```js
import assert from "node:assert/strict";
import fs from "node:fs";

const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(mainJs, /const translations = \{/);
assert.match(mainJs, /window\.siteLanguage = 'en'/);
assert.match(mainJs, /function getStoredValue\(key\)/);
assert.match(mainJs, /function normalizeLanguage\(language\)/);
assert.match(mainJs, /function getStoredLanguage\(\)/);
assert.match(mainJs, /function setStoredLanguage\(language\)/);
assert.match(mainJs, /function getTranslation\(key, language\)/);
assert.match(mainJs, /function applyLanguage\(language\)/);
assert.match(mainJs, /function toggleLanguage\(\)/);
assert.match(mainJs, /function initLanguageToggle\(\)/);
assert.match(mainJs, /localStorage\.getItem\('site_language'\)/);
assert.match(mainJs, /localStorage\.setItem\('site_language', normalizedLanguage\)/);
assert.match(mainJs, /getStoredValue\('dark_mode'\)/);
assert.match(mainJs, /document\.documentElement\.lang = selectedLanguage == 'zh' \? 'zh-CN' : 'en'/);
assert.match(mainJs, /document\.querySelectorAll\('\\[data-i18n\\]'\)/);
assert.match(mainJs, /document\.querySelectorAll\('\\[data-i18n-html\\]'\)/);
assert.match(mainJs, /document\.querySelector\('\\[data-i18n-document-title\\]'\)/);
assert.match(mainJs, /document\.title = translatedTitle/);
assert.match(mainJs, /languageToggle\.addEventListener\('click', toggleLanguage\)/);
assert.match(mainJs, /initLanguageToggle\(\)/);

assert.match(mainJs, /'nav.home': 'Home'/);
assert.match(mainJs, /'nav.home': '首页'/);
assert.match(mainJs, /'language.toggleToChinese': 'Switch language to Chinese'/);
assert.match(mainJs, /'language.toggleToEnglish': '切换到英文'/);
assert.match(mainJs, /'page.home.title': 'YangLi Lab - Your Dream Lab'/);
assert.match(mainJs, /'page.home.title': '扬理实验室 - Your Dream Lab'/);
assert.match(mainJs, /'context.copyEmail': 'Copy email'/);
assert.match(mainJs, /'context.copyEmail': '复制邮箱'/);
assert.match(mainJs, /'context.visitHomepage': 'Visit homepage'/);
assert.match(mainJs, /'context.visitHomepage': '访问主页'/);
```

- [ ] **Step 2: Update the context-menu test to expect dictionary-backed labels**

Replace `tests/card-context-menu.test.mjs` with:

```js
import assert from "node:assert/strict";
import fs from "node:fs";

const projectCard = fs.readFileSync("includes/project.html", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(projectCard, /data-email="\{email\}"/);
assert.match(projectCard, /data-profile-url="\{url\}"/);

assert.match(mainJs, /initProjectCardContextMenu/);
assert.match(mainJs, /contextmenu/);
assert.match(mainJs, /getTranslation\('context\.copyEmail'\)/);
assert.match(mainJs, /getTranslation\('context\.visitHomepage'\)/);
assert.match(mainJs, /'context.copyEmail': 'Copy email'/);
assert.match(mainJs, /'context.copyEmail': '复制邮箱'/);
assert.match(mainJs, /'context.visitHomepage': 'Visit homepage'/);
assert.match(mainJs, /'context.visitHomepage': '访问主页'/);
assert.match(mainJs, /navigator\.clipboard\.writeText/);
assert.match(mainJs, /url\.startsWith\('mailto:'\)/);
assert.match(mainJs, /url\.startsWith\('javascript:'\)/);
```

- [ ] **Step 3: Run runtime tests to verify they fail**

Run:

```bash
rtk node tests/language-runtime.test.mjs
rtk node tests/card-context-menu.test.mjs
```

Expected: both commands fail because `main.js` has no translation dictionary or language helpers yet.

- [ ] **Step 4: Add translation dictionary and helpers in `assets/js/main.js`**

Insert this block after `let headerElement = null;`:

```js
window.siteLanguage = 'en';

const translations = {
    en: {
        'nav.home': 'Home',
        'nav.recruitment': 'Recruitment',
        'nav.publish': 'Publish',
        'nav.team': 'Team',
        'nav.about': 'About',
        'theme.day': 'Day mode',
        'theme.night': 'Night mode',
        'language.toggleToChinese': 'Switch language to Chinese',
        'language.toggleToEnglish': 'Switch language to English',
        'language.current': 'EN',
        'page.home.title': 'YangLi Lab - Your Dream Lab',
        'page.about.title': 'About Me',
        'page.recruitment.title': 'Recruitment',
        'page.publish.title': 'Publish',
        'page.team.title': 'Team',
        'page.posts.title': 'My Writing',
        'home.title': 'Hi~ Welcome to YangLi Lab.',
        'home.intro': '<span class="font-semibold">YangLi Lab</span>, led by Dr. Yang Li, develops AI for medical image analysis and computer-aided diagnosis.',
        'home.research.medicalImage': 'Medical Image Processing and Analysis',
        'home.research.aiForScience': 'Artificial Intelligence for Science',
        'home.research.diagnosis': 'Computer-aided Diagnosis',
        'home.research.deepLearning': 'Deep Learning',
        'home.research.more': 'Other more areas ....',
        'home.values': 'Our Values can be found here.',
        'about.heading': 'About Yang Li',
        'about.description': 'Hello 👋 Here is some detailed introduction about Dr. Yang Li',
        'about.introduction.title': 'Introduction',
        'about.introduction.body': 'Yang Li, Ph.D. of Engineering in Pattern Recognition and Intelligent Systems at the University of the Chinese Academy of Sciences, is an Associate Professor and Master\\'s Supervisor at the School of Computer Science and Technology (School of Artificial Intelligence), Zhejiang Sci-Tech University, and a Senior Member of the Chinese Society of Biomedical Engineering.<br>Currently, he presides over one National Natural Science Foundation of China (NSFC) Youth Fund project, one Zhejiang Province Basic Public Welfare Research Plan project, and one sub-project of the Ningxia Hui Autonomous Region Key R&D Plan, and participates in one National Key R&D Program, two National Natural Science Foundation projects, and one Zhejiang Province Key R&D Plan project. He has published over 20 SCI/EI papers and co-authored one academic monograph.',
        'about.funds': 'Funds',
        'recruitment.heading': 'Join US',
        'recruitment.description': 'Welcome to our recruitment page. Here is a brief introduction to our laboratory, including laboratory equipments and benefits.',
        'recruitment.devices.title': '🖥️ Devices',
        'recruitment.devices.description': 'Our lab\\'s servers are equipped with <span class="font-semibold">5 RTX 4090 GPUs</span> and <span class="font-semibold">128GB of RAM</span>, providing each student with an individual account, supporting SSH remote connections, high concurrency, and high responsiveness to meet the research and experimental needs of <span class="font-semibold">every student</span>.',
        'recruitment.requirements.title': '🛠️ Requirements',
        'recruitment.requirements.description': 'If you are interested in the following topics and are passionate about learning medical AI knowledge, please prepare your <span class="font-semibold">Personal Materials</span>.<br> The materials are included but not limited to your <span class="font-semibold">Resume</span>, <span class="font-semibold">Award Certificates</span>, and <span class="font-semibold">Research Experience</span>, as evidence of your comprehensive abilities. <br><br>Our research topics are as following:<ul class="py-2 space-y-[3px] text-sm list-disc list-inside text-neutral-500 dark:text-neutral-400"><li>Medical Image Segmentation, Detection, and Registration</li><li>Early Alzheimer\\'s Disease Computer-aided Diagnosis</li><li>Cross-modal and Multimodal Medical Image Analysis</li><li>ECG Classification and Computer-aided Diagnosis</li><li>Federated Learning for Medical AI</li></ul>',
        'recruitment.contact.title': '📮 Contact',
        'recruitment.contact.description': 'If meeting our requirements, and you are willing to join us. Please prepare your personal materials and contact our tutor YangLi via email. The mail is <span class="font-semibold">yangli@zstu.edu.cn</span>',
        'publish.heading': 'Published Papers',
        'publish.description': '',
        'team.heading': 'Team Memberships',
        'team.description': '',
        'team.professors': 'Professors',
        'team.currentStudents': 'Current Students',
        'team.graduatedStudents': 'Graduated Students',
        'team.instructor': 'Instructor',
        'team.students': 'Students',
        'posts.heading': 'My Writing',
        'posts.description': 'Dive into my musings on life and tech in my latest posts; a blend of introspection and innovation. Keep an eye out for fresh insights and updates!',
        'footer.tagline': '© 2026 YangLi Lab - Your Dream Lab',
        'profile.role': 'Assistant Professor',
        'profile.button': 'Profile',
        'profile.degree': 'Ph.D. at UCAS (SHEN YANG)',
        'profile.membership': 'Senoir Member of CSBME',
        'profile.research': 'Pattern Recognition',
        'context.copyEmail': 'Copy email',
        'context.visitHomepage': 'Visit homepage'
    },
    zh: {
        'nav.home': '首页',
        'nav.recruitment': '招生',
        'nav.publish': '发表论文',
        'nav.team': '团队',
        'nav.about': '关于',
        'theme.day': '日间模式',
        'theme.night': '夜间模式',
        'language.toggleToChinese': '切换到中文',
        'language.toggleToEnglish': '切换到英文',
        'language.current': '中文',
        'page.home.title': '扬理实验室 - Your Dream Lab',
        'page.about.title': '关于杨理',
        'page.recruitment.title': '招生',
        'page.publish.title': '发表论文',
        'page.team.title': '团队',
        'page.posts.title': '文章',
        'home.title': 'Hi~ 欢迎来到扬理实验室。',
        'home.intro': '<span class="font-semibold">扬理实验室</span>由李杨老师负责，聚焦医学图像分析与计算机辅助诊断方向的人工智能研究。',
        'home.research.medicalImage': '医学图像处理与分析',
        'home.research.aiForScience': '科学智能',
        'home.research.diagnosis': '计算机辅助诊断',
        'home.research.deepLearning': '深度学习',
        'home.research.more': '更多研究方向 ....',
        'home.values': '我们的研究理念可在这里查看。',
        'about.heading': '个人介绍',
        'about.description': '你好 👋 这里是李杨老师的详细介绍',
        'about.introduction.title': '个人简介',
        'about.introduction.body': '李杨，中国科学院大学模式识别与智能系统专业工学博士，现为浙江理工大学计算机科学与技术学院（人工智能学院）副教授、硕士生导师，中国生物医学工程学会高级会员。<br>目前主持国家自然科学基金青年项目、浙江省基础公益研究计划项目、宁夏回族自治区重点研发计划子课题各1项，并参与国家重点研发计划项目1项、国家自然科学基金项目2项、浙江省重点研发计划项目1项。已发表 SCI/EI 论文20余篇，合著学术专著1部。',
        'about.funds': '科研项目',
        'recruitment.heading': '加入我们',
        'recruitment.description': '欢迎查看招生页面。这里简要介绍实验室设备和福利等信息。',
        'recruitment.devices.title': '🖥️ 设备',
        'recruitment.devices.description': '实验室服务器配备 <span class="font-semibold">5 张 RTX 4090 GPU</span> 和 <span class="font-semibold">128GB 内存</span>，为每位同学提供独立账号，支持 SSH 远程连接、高并发和快速响应，满足 <span class="font-semibold">每位同学</span> 的科研实验需求。',
        'recruitment.requirements.title': '🛠️ 要求',
        'recruitment.requirements.description': '如果你对以下方向感兴趣，并愿意学习医学人工智能知识，请准备好你的 <span class="font-semibold">个人材料</span>。材料包括但不限于 <span class="font-semibold">简历</span>、<span class="font-semibold">获奖证书</span> 和 <span class="font-semibold">科研经历</span>，用于展示综合能力。<br><br>我们的研究方向包括：<ul class="py-2 space-y-[3px] text-sm list-disc list-inside text-neutral-500 dark:text-neutral-400"><li>医学图像分割、检测与配准</li><li>早期阿尔茨海默病计算机辅助诊断</li><li>跨模态与多模态医学图像分析</li><li>心电分类与计算机辅助诊断</li><li>面向医学人工智能的联邦学习</li></ul>',
        'recruitment.contact.title': '📮 联系方式',
        'recruitment.contact.description': '如果你符合要求并愿意加入我们，请准备个人材料并通过邮件联系导师李杨。邮箱为 <span class="font-semibold">yangli@zstu.edu.cn</span>。',
        'publish.heading': '发表论文',
        'publish.description': '',
        'team.heading': '团队成员',
        'team.description': '',
        'team.professors': '教师',
        'team.currentStudents': '在读学生',
        'team.graduatedStudents': '已毕业学生',
        'team.instructor': '导师',
        'team.students': '学生',
        'posts.heading': '文章',
        'posts.description': '阅读近期文章，了解生活与技术方面的思考、实践和更新。',
        'footer.tagline': '© 2026 扬理实验室 - Your Dream Lab',
        'profile.role': '副教授',
        'profile.button': '主页',
        'profile.degree': '中国科学院大学博士（沈阳）',
        'profile.membership': '中国生物医学工程学会高级会员',
        'profile.research': '模式识别',
        'context.copyEmail': '复制邮箱',
        'context.visitHomepage': '访问主页'
    }
};

function normalizeLanguage(language){
    return language == 'zh' ? 'zh' : 'en';
}

function getStoredValue(key){
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function getStoredLanguage(){
    const storedLanguage = getStoredValue('site_language');
    return normalizeLanguage(storedLanguage);
}

function setStoredLanguage(language){
    const normalizedLanguage = normalizeLanguage(language);
    try {
        localStorage.setItem('site_language', normalizedLanguage);
    } catch (error) {
        window.siteLanguage = normalizedLanguage;
    }
}

function getTranslation(key, language){
    const selectedLanguage = normalizeLanguage(language || window.siteLanguage);
    return translations[selectedLanguage][key] || translations.en[key] || null;
}

function applyLanguage(language){
    const selectedLanguage = normalizeLanguage(language);
    window.siteLanguage = selectedLanguage;
    document.documentElement.lang = selectedLanguage == 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function(element){
        const translatedText = getTranslation(element.dataset.i18n, selectedLanguage);
        if(translatedText !== null){
            element.textContent = translatedText;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(element){
        const translatedHtml = getTranslation(element.dataset.i18nHtml, selectedLanguage);
        if(translatedHtml !== null){
            element.innerHTML = translatedHtml;
        }
    });

    const titleElement = document.querySelector('[data-i18n-document-title]');
    if(titleElement){
        const translatedTitle = getTranslation(titleElement.dataset.i18nDocumentTitle, selectedLanguage);
        if(translatedTitle !== null){
            document.title = translatedTitle;
        }
    }

    updateLanguageToggle(selectedLanguage);
}

function updateLanguageToggle(language){
    const selectedLanguage = normalizeLanguage(language);
    const languageToggle = document.getElementById('languageToggle');
    const languageToggleText = document.getElementById('languageToggleText');

    if(languageToggleText){
        languageToggleText.textContent = getTranslation('language.current', selectedLanguage);
    }

    if(languageToggle){
        const nextLanguageLabel = selectedLanguage == 'zh' ? 'language.toggleToEnglish' : 'language.toggleToChinese';
        languageToggle.setAttribute('aria-label', getTranslation(nextLanguageLabel, selectedLanguage));
    }
}

function toggleLanguage(){
    const nextLanguage = window.siteLanguage == 'zh' ? 'en' : 'zh';
    setStoredLanguage(nextLanguage);
    applyLanguage(nextLanguage);
}

function initLanguageToggle(){
    applyLanguage(getStoredLanguage());

    const languageToggle = document.getElementById('languageToggle');
    if(languageToggle){
        languageToggle.addEventListener('click', toggleLanguage);
    }
}
```

Update the dark-mode read in the `DOMContentLoaded` callback so a storage failure cannot prevent language initialization, then add `initLanguageToggle();` immediately after the `showDay()` / `showNight()` branch:

```js
    if(getStoredValue('dark_mode') == 'true'){
        window.darkMode = true;
        showNight();
    } else {
        showDay();
    }
    initLanguageToggle();
```

- [ ] **Step 5: Translate context-menu labels from the dictionary**

In `showProjectCardContextMenu`, replace the two label definitions with:

```js
            label: getTranslation('context.copyEmail'),
```

and:

```js
            label: getTranslation('context.visitHomepage'),
```

- [ ] **Step 6: Run runtime and related tests**

Run:

```bash
rtk node tests/language-runtime.test.mjs
rtk node tests/card-context-menu.test.mjs
rtk node tests/language-mode.test.mjs
rtk node tests/language-content-hooks.test.mjs
```

Expected: all commands pass with no output.

- [ ] **Step 7: Commit Task 3**

Run:

```bash
rtk git add tests/language-runtime.test.mjs tests/card-context-menu.test.mjs assets/js/main.js
rtk git commit -m "feat: add bilingual language runtime"
```

Expected: commit succeeds and staged files do not include image or `tmp/` changes.

---

### Task 4: Full Verification And Local Preview

**Files:**
- Verify: `tests/*.test.mjs`
- Verify: static build output
- No source edits unless a verification command exposes a defect

- [ ] **Step 1: Run all Node tests**

Run:

```bash
rtk zsh -lc 'for test in tests/*.test.mjs; do node "$test"; done'
```

Expected: PASS with no output from each test file. If a test fails, fix only the file named by the failing assertion and re-run this command.

- [ ] **Step 2: Run the production static build**

Run:

```bash
rtk npx static build
```

Expected: build completes successfully and writes the generated site output. If the command reports missing assets unrelated to this feature, record the exact asset path before deciding whether it belongs to the pre-existing image worktree changes.

- [ ] **Step 3: Inspect final diff scope**

Run:

```bash
rtk git status --short
rtk git diff --stat
```

Expected: only bilingual implementation files from this plan are modified or committed by this work. The pre-existing image deletions/additions and `tmp/` remain unstaged unless the user separately requests image cleanup.

- [ ] **Step 4: Start local preview server**

Run:

```bash
rtk npx static dev
```

Expected: the dev server starts and prints a local URL. Keep the server running long enough to verify in a browser that the language toggle is visible beside the theme toggle, defaults to English, switches to Chinese, persists after reload, and does not break the day/night toggle.

- [ ] **Step 5: Final commit if verification required fixes**

If Task 4 required source fixes, commit only those fixes:

```bash
rtk git add assets/js/main.js layouts/main.html includes/header.html includes/page-heading.html includes/recruitment-loop.html includes/footer.html includes/home/card.html includes/home/cardhomepage.html pages/index.html pages/about.html pages/recruitment.html pages/publish.html pages/team.html pages/projects.html pages/posts.html collections/menu.json collections/recruiment.json tests/language-mode.test.mjs tests/language-content-hooks.test.mjs tests/language-runtime.test.mjs tests/card-context-menu.test.mjs
rtk git commit -m "fix: verify bilingual language toggle"
```

Expected: commit succeeds only when source fixes were needed after Task 3.

---

## Self-Review

Spec coverage:

- Default English and Chinese toggle: Tasks 1 and 3.
- Header control matching the theme-toggle placement pattern: Task 1.
- `localStorage.site_language` persistence and `<html lang>` update: Tasks 1 and 3.
- Visitor-facing UI/content translation hooks: Task 2.
- Publication metadata left unchanged: Task 2 does not modify `collections/publications.json` or `includes/publication-card.html`.
- Context-menu labels translated: Task 3.
- Missing-storage and missing-key fallback: Task 3 helper code keeps English fallback and catches storage failures.
- Tests and build verification: Tasks 1 through 4.

Placeholder scan:

- No incomplete implementation slots are present.

Type and name consistency:

- The spec names `getStoredLanguage`, `setStoredLanguage`, `applyLanguage`, and `toggleLanguage`; Task 3 uses those names exactly.
- Translation keys in markup and tests match the dictionary keys listed in Task 3.
