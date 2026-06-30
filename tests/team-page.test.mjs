import assert from "node:assert/strict";
import fs from "node:fs";

const teamPage = fs.readFileSync("pages/team.html", "utf8");
const instructors = JSON.parse(
  fs.readFileSync("collections/instructors.json", "utf8"),
);
const currentStudents = JSON.parse(
  fs.readFileSync("collections/current_students.json", "utf8"),
);
const graduatedStudents = JSON.parse(
  fs.readFileSync("collections/students.json", "utf8"),
);

assert.match(teamPage, />Current Students</);
assert.match(teamPage, />Graduated Students</);
assert.match(teamPage, /collection="current_students"/);
assert.match(teamPage, /collection="students"/);

assert.equal(instructors.length, 2);
assert.equal(currentStudents.length, 6);
assert.equal(graduatedStudents.length, 5);

assert.deepEqual(
  instructors.map(({ name, description, nameKey, descriptionKey }) => ({
    name,
    description,
    nameKey,
    descriptionKey,
  })),
  [
    {
      name: "Mingfeng Jiang",
      description: "Leader & Medical Image Processing",
      nameKey: "team.instructors.mingfengJiang.name",
      descriptionKey: "team.instructors.mingfengJiang.description",
    },
    {
      name: "Yang Li",
      description: "Pattern Recognition & Medical AI",
      nameKey: "team.instructors.yangLi.name",
      descriptionKey: "team.instructors.yangLi.description",
    },
  ],
);

const expectedCurrentStudents = [
  {
    name: "JiaQi Hu",
    description: "Medical image segmentation based on diffusion models",
    nameKey: "team.currentStudents.jiaqiHu.name",
    descriptionKey: "team.currentStudents.jiaqiHu.description",
    image: "/assets/images/avatars_students/hjq.jpg",
    url: "mailto:hujiaqii@foxmail.com",
    email: "hujiaqii@foxmail.com",
  },
  {
    name: "ZiLong Fan",
    description: "Semi-supervised medical image segmentation",
    nameKey: "team.currentStudents.zilongFan.name",
    descriptionKey: "team.currentStudents.zilongFan.description",
    image: "/assets/images/avatars_students/fzl.jpg",
    url: "mailto:15370843756@163.com",
    email: "15370843756@163.com",
  },
  {
    name: "JunYi Zhang",
    description: "Federated Parameter-Efficient Fine-Tuning",
    nameKey: "team.currentStudents.junyiZhang.name",
    descriptionKey: "team.currentStudents.junyiZhang.description",
    image: "/assets/images/avatars_students/zjy.jpg",
    url: "mailto:1798860756@qq.com",
    email: "1798860756@qq.com",
  },
  {
    name: "MingHao Jin",
    description: "Flow Matching-based cross-modal medical image synthesis",
    nameKey: "team.currentStudents.minghaoJin.name",
    descriptionKey: "team.currentStudents.minghaoJin.description",
    image: "/assets/images/avatars_students/jmh.jpg",
    url: "mailto:m15397321136@163.com",
    email: "m15397321136@163.com",
  },
  {
    name: "LingYun Hong",
    description: "Federated Learning & ECG Classification",
    nameKey: "team.currentStudents.lingyunHong.name",
    descriptionKey: "team.currentStudents.lingyunHong.description",
    image: "/assets/images/avatars_students/hly.jpg",
    url: "mailto:watchly@qq.com",
    email: "watchly@qq.com",
  },
  {
    name: "JinKe Wang",
    description: "Cardiac Ultrasound Image Segmentation",
    nameKey: "team.currentStudents.jinkeWang.name",
    descriptionKey: "team.currentStudents.jinkeWang.description",
    image: "/assets/images/avatars_students/wjk.jpg",
    url: "mailto:483091634@qq.com",
    email: "483091634@qq.com",
  },
];

const expectedGraduatedStudents = [
  {
    name: "Xinmiao Zhu",
    description: "Cross-modal Spine Generation",
    nameKey: "team.students.xinmiaoZhu.name",
    descriptionKey: "team.students.xinmiaoZhu.description",
    image: "/assets/images/avatars_students/zxm.jpeg",
    url: "mailto:1625012165@qq.com",
    email: "1625012165@qq.com",
  },
  {
    name: "Fangtao Song",
    description: "Federated Learning & Swarm Learning",
    nameKey: "team.students.fangtaoSong.name",
    descriptionKey: "team.students.fangtaoSong.description",
    image: "/assets/images/avatars_students/sft.png",
    url: "mailto:664604982@qq.com",
    email: "664604982@qq.com",
  },
  {
    name: "Chenmiao Ruan",
    description: "Image Registration",
    nameKey: "team.students.chenmiaoRuan.name",
    descriptionKey: "team.students.chenmiaoRuan.description",
    image: "/assets/images/avatars_students/rcm.jpeg",
    url: "mailto:275997493@qq.com",
    email: "275997493@qq.com",
  },
  {
    name: "Long Wei",
    description: "ECG Classification",
    nameKey: "team.students.longWei.name",
    descriptionKey: "team.students.longWei.description",
    image: "/assets/images/avatars_students/wl.jpeg",
    url: "mailto:1410124534@qq.com",
    email: "1410124534@qq.com",
  },
  {
    name: "Yongjie Liu",
    description: "Lung Nodule Detection & Segementation",
    nameKey: "team.students.yongjieLiu.name",
    descriptionKey: "team.students.yongjieLiu.description",
    image: "/assets/images/avatars_students/lyj.jpeg",
    url: "https://swimmingliu.cn/",
    email: "SwimmingLiu@outlook.com",
  },
];

assert.deepEqual(currentStudents, expectedCurrentStudents);
assert.deepEqual(graduatedStudents, expectedGraduatedStudents);

assert.deepEqual(
  [...graduatedStudents, ...currentStudents].map((student) => student.name),
  [
    "Xinmiao Zhu",
    "Fangtao Song",
    "Chenmiao Ruan",
    "Long Wei",
    "Yongjie Liu",
    "JiaQi Hu",
    "ZiLong Fan",
    "JunYi Zhang",
    "MingHao Jin",
    "LingYun Hong",
    "JinKe Wang",
  ],
);
