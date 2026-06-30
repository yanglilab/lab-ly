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
