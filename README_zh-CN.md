<h1 align="center">YangLi Lab 官网</h1>

<div align="center">
    <a href="https://static.devdojo.com/"><img src="https://img.shields.io/badge/Static-DevDojo-111827?logo=html5&logoColor=white" alt="Static"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-Ready-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://pages.github.com/"><img src="https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=githubpages&logoColor=white" alt="GitHub Pages"></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"></a>
    <a title="English" href="README.md"><img src="https://img.shields.io/badge/-English-A31F34?style=for-the-badge" alt="English"></a>
    <a title="简体中文" href="README_zh-CN.md"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-545759?style=for-the-badge" alt="简体中文"></a>
</div>

<p align="center">
YangLi Lab 官方静态网站。网站用于展示李杨老师课题组的研究方向、论文成果、团队成员、招生信息与联系方式。
</p>

<p align="center">
  <img src="./assets/images/intro/landing-page.png" alt="YangLi Lab 官网首页">
</p>

## 🚀 本地开发

```bash
npm install
npx static dev
```

构建生产文件到 `_site/`：

```bash
npx static build
```

## 📁 项目结构

```text
pages/          路由页面
layouts/        页面布局
includes/       可复用 HTML 片段
collections/    页面使用的 JSON 数据
content/        Markdown 文章
assets/         CSS、JavaScript、图片与图标
public/         静态公共文件
scripts/        本地依赖补丁脚本
_site/          构建产物
```

## 🤝 参与贡献

欢迎贡献网站内容、页面文案、布局修复和文档改进。

<a href="https://github.com/yanglilab/lab-ly/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yanglilab/lab-ly" alt="YangLi Lab 官网贡献者" />
</a>

1. Fork 仓库或创建工作分支。
2. 保持改动聚焦。
3. 提交前运行 `npx static build`。
4. 发起 Pull Request，并为视觉改动附上截图和简短说明。

## 🚢 部署

`.github/workflows/static.yml` 会安装依赖，执行 `npx @devdojo/static build`，并将 `_site/` 发布到配置好的 GitHub Pages 仓库。

## 📄 许可证

MIT
