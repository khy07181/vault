# TEMPLATES KNOWLEDGE BASE

**Generated:** 2026-02-03T21:34
**Commit:** 27b219f

## OVERVIEW
Templater plugin templates for vault automation and consistency.

## STRUCTURE
```
templates/
├── daily.md          # Daily note template
├── book.md           # Book reading template  
├── recipe.md         # Recipe template
├── blog.md           # Blog post template
├── diary.md          # Personal diary template
├── metadata.md       # General metadata template
├── create_tag_from_ai.md  # AI tag creation
└── template_ai_summary.md  # AI summary template
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Daily notes | daily.md | Wake-up time tracking |
| Book notes | book.md | Extended frontmatter |
| Blog posts | blog.md | Content structure |
| Personal diary | diary.md | Private reflections |

## CONVENTIONS
- All templates use Templater syntax: `<% tp.* %>`
- Creation date format: `yyyy-MM-DDTHH:mm`
- Cursor placement with `<% tp.file.cursor() %>`
- File title insertion: `<% tp.file.title %>`

## ANTI-PATTERNS (TEMPLATES)
- NEVER hardcode dates - use templater functions
- NEVER mix template syntax with manual text
- NEVER create templates without proper frontmatter structure
- NEVER use inconsistent field naming across templates