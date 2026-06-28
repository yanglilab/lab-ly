<h1 align="center">YangLi Lab Website</h1>

<div align="center">
    <a href="https://static.devdojo.com/"><img src="https://img.shields.io/badge/Static-DevDojo-111827?logo=html5&logoColor=white" alt="Static"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-Ready-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://pages.github.com/"><img src="https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=githubpages&logoColor=white" alt="GitHub Pages"></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"></a>
    <a title="English" href="README.md"><img src="https://img.shields.io/badge/-English-A31F34?style=for-the-badge" alt="English"></a>
    <a title="简体中文" href="README_zh-CN.md"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-545759?style=for-the-badge" alt="简体中文"></a>
</div>
<p align="center">
The official static website for YangLi Lab, led by Dr. Yang Li. The site presents the lab's research focus, publications, team members, recruitment information, and contact entry.
</p>

<p align="center">
  <img src="./assets/images/intro/landing-page.png" alt="YangLi Lab landing page">
</p>

## 🚀 Quick Start

```bash
npm install
npx static dev
```

Build production files into `_site/`:

```bash
npx static build
```

## 📁 Project Structure

```text
pages/          Route pages
layouts/        Shared page layouts
includes/       Reusable HTML partials
collections/    JSON data used by pages
content/        Markdown posts
assets/         CSS, JavaScript, images, and icons
public/         Static public files
scripts/        Local package patch scripts
_site/          Generated build output
```

## 🤝 Contributing

Contributions are welcome for site content, page copy, layout fixes, and documentation.

<a href="https://github.com/yanglilab/lab-ly/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yanglilab/lab-ly" alt="YangLi Lab website contributors" /></a>

1. Fork or create a working branch.
2. Make focused changes.
3. Run `npx static build` before submitting.
4. Open a pull request with a short description and screenshots for visual changes.

## 🚢 Deployment

The workflow in `.github/workflows/static.yml` installs dependencies, runs `npx @devdojo/static build`, and publishes `_site/` to the configured GitHub Pages repository.

## 📄 License

MIT
