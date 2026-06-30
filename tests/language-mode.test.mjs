import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("layouts/main.html", "utf8");
const header = fs.readFileSync("includes/header.html", "utf8");
const pageHeading = fs.readFileSync("includes/page-heading.html", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");
const menu = JSON.parse(fs.readFileSync("collections/menu.json", "utf8"));

assert.match(layout, /site_language/);
assert.match(layout, /document\.documentElement\.lang\s*=\s*'zh-CN'/);
assert.match(layout, /document\.documentElement\.lang\s*=\s*'en'/);
assert.match(layout, /document\.documentElement\.dataset\.languagePending\s*=\s*'true'/);
assert.match(layout, /html\[data-language-pending="true"\] \[data-i18n\]/);
assert.match(layout, /html\[data-language-pending="true"\] \[data-i18n-html\]/);

assert.match(mainJs, /delete document\.documentElement\.dataset\.languagePending/);

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
