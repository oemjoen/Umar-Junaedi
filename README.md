# Umar Junaedi - Portfolio

Personal portfolio for Umar Junaedi, Senior IT Manager and enterprise systems leader.

## Live site

`https://oemjoen.github.io/Umar-Junaedi/`

## Built with

- Semantic HTML
- Modern CSS with responsive layout, custom properties, reduced-motion support, and dark/light theme
- Vanilla JavaScript for bilingual ID/EN content, language-aware PDF downloads, theme switching, mobile navigation, reveal animation, and project filtering
- GitHub Actions + GitHub Pages deployment
- Reproducible ReportLab-based bilingual PDF generation with automated validation

## GitHub Pages setup

In the repository settings, open **Pages**, choose **GitHub Actions** as the source, then push to `main`. The workflow in `.github/workflows/pages.yml` deploys the static site.

## Profile sources

- [LinkedIn](https://www.linkedin.com/in/umar-junaedi-b1b0233a/)
- [Jobstreet](https://id.jobstreet.com/id/profiles/umar-junaedi-dJKS6WzvSw)
- [Main GitHub - oemjoen](https://github.com/oemjoen)
- [Current GitHub projects - oemjoe](https://github.com/oemjoe)

## Current public projects from oemjoe

- [ERP TMS - Laravel Modernization](https://github.com/oemjoe/tms-erp-php82) - PHP 8.2, Laravel 12, MariaDB, Docker, Nginx, procurement, finance, maintenance, approval, audit trail, and staging deployment.
- [Tirta AI Data & System Analysis Dashboard](https://github.com/oemjoe/ai-dashboard) - Laravel 13, data/system analysis, Groq, Gemini, Ollama, Redis, Docker, database catalog, source-code analysis, and executive summaries.

## PDF downloads

The site switches the download target automatically according to the selected language.

### Curriculum Vitae

- [CV - Bahasa Indonesia](https://oemjoen.github.io/Umar-Junaedi/Umar-Junaedi-CV-ID.pdf)
- [CV - English](https://oemjoen.github.io/Umar-Junaedi/Umar-Junaedi-CV-EN.pdf)
- [Backward-compatible CV link](https://oemjoen.github.io/Umar-Junaedi/Umar-Junaedi-CV.pdf)

### Professional Portfolio

- [Portfolio - Bahasa Indonesia](https://oemjoen.github.io/Umar-Junaedi/Umar-Junaedi-Portfolio-ID.pdf)
- [Portfolio - English](https://oemjoen.github.io/Umar-Junaedi/Umar-Junaedi-Portfolio-EN.pdf)
- [Backward-compatible portfolio link](https://oemjoen.github.io/Umar-Junaedi/Umar-Junaedi-Portfolio.pdf)

## Reproducible PDF build

The PDF source is split into deterministic generator fragments under `pdfsrc/generator/`. The workflow `.github/workflows/rebuild-pdfs.yml` assembles those fragments, builds all four bilingual PDF variants, validates page counts, content markers and Git object hashes, verifies the backward-compatible aliases, and commits the exact binaries only when they changed.

The generator currently includes the full historical project archive plus the current public projects from `oemjoe`, including ERP TMS - Laravel Modernization and Tirta AI Data & System Analysis Dashboard.

A PDF rebuild runs automatically when files under `pdfsrc/generator/**` or the rebuild workflow itself change. It can also be started manually with `workflow_dispatch` from GitHub Actions.

## Contact

- Email: [umarjunaedi@gmail.com](mailto:umarjunaedi@gmail.com)
- WhatsApp: [0812 2226 4053](https://wa.me/6281222264053)
- [LinkedIn](https://www.linkedin.com/in/umar-junaedi-b1b0233a/)
- [Jobstreet](https://id.jobstreet.com/id/profiles/umar-junaedi-dJKS6WzvSw)
- [GitHub - oemjoen](https://github.com/oemjoen)
- [GitHub projects - oemjoe](https://github.com/oemjoe)

The portfolio uses the professional profile image stored in the repository.

## Language behavior

The site defaults to Indonesian for Indonesian browser time zones, switches to English when a non-Indonesian time zone is detected, and falls back to Indonesian when location data is unavailable or invalid. Visitors can override the choice with the ID/EN switcher. The selected language is persisted and is also used to choose the matching CV/portfolio PDF download.
