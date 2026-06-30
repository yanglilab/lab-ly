# Bilingual Language Toggle Design

## Goal

Add English and Simplified Chinese language support to the current static YangLi Lab site. English remains the default language and current baseline. Visitors can switch between English and Chinese from the header with a control that behaves like the existing day/night theme toggle.

## Current Context

The project is a static DevDojo site with shared layouts in `layouts/`, reusable partials in `includes/`, page templates in `pages/`, JSON collections in `collections/`, and client-side behavior in `assets/js/main.js`. The existing theme toggle stores `dark_mode` in `localStorage`, applies the `dark` class on `<html>`, and updates header labels after `DOMContentLoaded`.

The site currently has no language state. `layouts/main.html` hardcodes `<html lang="en">`, navigation labels are rendered from `collections/menu.json`, page content is mostly hardcoded English, and some JavaScript context-menu labels are already Chinese-only.

## Recommended Approach

Use a lightweight client-side translation layer. Mark translatable HTML nodes with stable `data-i18n` keys, store English and Chinese copy in a JavaScript dictionary, and apply the selected language on page load and when the visitor clicks the header language toggle.

This keeps the implementation aligned with the existing client-side theme toggle and avoids introducing locale routes, a build-time i18n plugin, or duplicated pages. The tradeoff is that Chinese content is not emitted as separate `/zh/` pages, so this first version optimizes visitor usability and maintainability rather than full multilingual SEO.

## Language State

Supported languages are:

- `en`: English, default.
- `zh`: Simplified Chinese.

The selected language is stored in `localStorage` under `site_language`. Missing, unsupported, or inaccessible storage falls back to `en`. When language is applied, `<html lang>` becomes `en` or `zh-CN`.

The initial inline script in `layouts/main.html` should set `<html lang>` as early as possible to reduce mismatched language metadata before `main.js` runs. The visible text replacement can happen from `assets/js/main.js` after `DOMContentLoaded`, matching the existing theme-toggle pattern.

## Header Control

Add a language toggle beside the existing theme toggle in `includes/header.html`. The control should be compact enough for the current navigation and mobile layout. It should show the current language as `EN` or `中文`, and its accessible label should describe the language that clicking will switch to.

The language toggle must not interfere with the existing mobile menu open/close behavior, sticky header behavior, or dark-mode toggle animation.

## Translation Scope

Translate visitor-facing site UI and descriptive content:

- Navigation labels.
- Page titles and descriptions.
- Home page hero and research-area bullets.
- About page heading, description, introduction, and section headings.
- Recruitment heading and recruitment card titles/descriptions.
- Team page heading and section headings.
- Publish page heading and generic UI labels.
- Footer text.
- JavaScript context-menu labels such as copy email and visit homepage.
- Theme labels such as day mode and night mode.

Leave publication metadata unchanged in this first version:

- Research paper titles.
- Author lists.
- Journal names.
- DOI values and URLs.
- Publication images and alt text based on paper titles.

This preserves academic citation accuracy while still making the site navigable and understandable in Chinese.

## Data and Markup Strategy

Use stable keys such as `nav.home`, `home.title`, `about.introduction.body`, and `recruitment.devices.description`. HTML nodes that contain plain text should use `data-i18n`. Nodes that need rich content, such as recruitment descriptions containing links, line breaks, spans, or lists, should use `data-i18n-html` and receive controlled HTML from the local translation dictionary.

Collection-rendered navigation can keep using `collections/menu.json` for default English output, with `data-i18n` keys added to each generated anchor. Recruitment cards should receive explicit translation keys from the collection data so the include does not infer keys from presentation order. The implementation should avoid duplicating full page templates.

## JavaScript Design

`assets/js/main.js` should gain focused language helpers:

- `getStoredLanguage()` returns `en` or `zh`.
- `setStoredLanguage(language)` persists the selected language when storage is available.
- `applyLanguage(language)` updates `<html lang>`, translatable DOM nodes, document title, toggle labels, and `window.siteLanguage`.
- `toggleLanguage()` switches between `en` and `zh`.
- A small local `translations` object holds strings and controlled rich HTML.

The implementation should tolerate missing elements so shared JavaScript can run across all pages. Existing theme functions should continue to work, and language changes should not mutate `dark_mode`.

## Error Handling

If `localStorage` is unavailable or throws, the site should still render in English and the language toggle should still work for the current page session. If a translation key is missing, the existing English markup should remain visible rather than being cleared.

## Testing

Add focused tests before implementation:

- A language-mode test that verifies the layout initializes language state, `main.js` defines language helpers, `site_language` persistence exists, and `zh-CN` is applied for Chinese.
- Markup tests that verify the header includes a language toggle and key pages/includes expose representative `data-i18n` or `data-i18n-html` hooks.
- Existing theme tests must continue to pass, proving language work does not regress dark-mode behavior.

Run the existing Node test files and `npx static build` after implementation.

## Non-Goals

This change does not add separate `/zh/` routes, automatic browser-language detection, machine translation at runtime, a third-party i18n dependency, or translation of publication metadata. Those can be considered later if the site needs multilingual SEO or more languages.
