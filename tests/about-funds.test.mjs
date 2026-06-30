import assert from "node:assert/strict";
import fs from "node:fs";

const aboutPage = fs.readFileSync("pages/about.html", "utf8");
const experiences = JSON.parse(
  fs.readFileSync("collections/experiences.json", "utf8"),
);
const aboutExperience = fs.readFileSync("includes/about-experience.html", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(aboutPage, />Funds</);
assert.match(aboutPage, /role="\{experience\.description\}"/);
assert.match(aboutPage, /roleKey="\{experience\.descriptionKey\}"/);
assert.match(aboutPage, /company="\{experience\.company\}"/);
assert.match(aboutPage, /companyKey="\{experience\.companyKey\}"/);
assert.match(aboutPage, /description="\{experience\.role\}"/);
assert.match(aboutPage, /descriptionKey="\{experience\.roleKey\}"/);

assert.equal(experiences.length, 14);

for (const experience of experiences) {
  assert.equal(typeof experience.descriptionKey, "string");
  assert.equal(typeof experience.companyKey, "string");
  assert.equal(typeof experience.roleKey, "string");
}

assert.match(aboutExperience, /data-i18n="\{roleKey\}"/);
assert.match(aboutExperience, /data-i18n="\{companyKey\}"/);
assert.match(aboutExperience, /data-i18n="\{descriptionKey\}"/);

const expectedChineseFunds = [
  "基于智能负荷心肌声学造影技术的冠状动脉微血管疾病精准诊断方法与可解释性研究",
  "基于数据增强与多模态多中心群体学习的重大心血管事件智能预测研究",
  "基于柔性可穿戴心电大数据智能分析的心律失常预警监测技术研发与示范应用",
  "基于语义约束微分同胚映射的术中大形变腰椎图像配准方法研究",
  "基于跨模态图像迁移学习的早期阿尔兹海默症诊断方法研究",
  "智慧工地一体化解决方案",
  "面向微创脊柱手术导航的多模态医学图像配准方法研究",
  "面向房颤复发预测的心脏磁共振影像智能处理与分析方法研究",
  "快速高分辨率磁共振成像及其脑类淋巴系统中的应用",
  "智慧医疗设备与系统研发-基于可解释性卷积循环神经网络的心律失常智能监测平台研究",
  "基于柔性可穿戴心电大数据智能分析的恶性心律失常猝死预警关键技术与应用研究",
  "人人交互的语音识别转写可懂度评价方法研究",
  "面向未来元社区的快速建模与智能虚实交互关键技术研究与应用示范",
  "基于高灵敏多光谱Cherenkov成像的放射治疗多模态图像引导关键技术研究",
  "浙江省自然科学基金委",
  "暂未指明基金出处",
  "宁夏回族自治区科学技术厅",
  "国家自然科学基金委",
  "横向",
  "浙江理工大学",
  "浙江省科技厅",
  "国家科技部",
  "主持",
  "参与",
];

for (const phrase of expectedChineseFunds) {
  assert.match(mainJs, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
