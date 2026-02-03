---
created: 2026-02-03T21:27
updated: 2026-02-03T21:51
---
# BLOG KNOWLEDGE BASE

**Generated:** 2026-02-03T21:34
**Commit:** 27b219f

## OVERVIEW
Blog content organized by year with mixed Korean/English posts.

## STRUCTURE
```
blog/
├── content/2025/     # 2025 blog posts
├── content/2026/     # 2026 blog posts
└── content/img/      # Blog images and assets
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| 2025 posts | content/2025/ | Previous year content |
| 2026 posts | content/2026/ | Current year content |
| Images | content/img/ | Media assets for posts |
| Technical posts | content/2026/ReqalMySQL 8.0/ | Technical tutorials |

## CONVENTIONS
- Year-based organization under content/YYYY/
- Mixed Korean/English content maintained
- Frontmatter follows vault standards
- Image assets centralized in content/img/

## ANTI-PATTERNS (BLOG)
- NEVER create posts outside year-based directories
- NEVER mix blog assets with general attachment/ directory
- NEVER publish without proper frontmatter
- NEVER use inconsistent date formats