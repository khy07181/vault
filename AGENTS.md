---
created: 2026-02-03T21:26
updated: 2026-02-03T21:51
---
# VAULT KNOWLEDGE BASE

**Generated:** 2026-02-03T21:34
**Commit:** 27b219f
**Branch:** main

## OVERVIEW
Personal Obsidian vault using PARA method for knowledge management with 950+ files including 25+ large files (500+ lines).

## STRUCTURE
```
vault/
├── 1_Project/          # Active projects with deadlines
├── 2_Area/            # Ongoing responsibilities and interests  
├── 3_Resource/        # Reference materials and knowledge
├── 4_Archive/         # Completed or inactive items
├── 5_Fleeting/        # Temporary notes for quick capture
├── 6_Discard/         # Items to delete
├── private/           # Sensitive content (mirrored PARA)
├── blog/              # Blog content with year-based organization
├── templates/         # Templater templates
├── readwise/          # Synced highlights
├── attachment/        # Images and PDFs
└── .obsidian/         # Plugin configurations
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Daily notes | private/2_Area/daily/YYYY/ | Format: YYYY-MM-DD.md |
| Book notes | private/2_Area/library/book/ | Extended frontmatter, dedicated AGENTS.md |
| Templates | templates/ | Templater syntax |
| Homepage | 2_Area/Home.md | Dataview queries |
| Work content | private/2_Area/seavantage/ | Business domain |

## CONVENTIONS
### Frontmatter
All notes use YAML with:
- `title`, `aliases`, `classification`, `tags`, `created`
- Books: `author`, `category`, `read_date`, `rate`, etc.
- Timestamps: `yyyy-MM-DDTHH:mm` format

### Naming Patterns
- Daily notes: `private/2_Area/daily/YYYY/YYYY-MM-DD.md`
- PARA categories in both root and private/ directories
- Files in `6_Discard/` excluded from queries

## ANTI-PATTERNS (THIS VAULT)
- NEVER include `readwise` or `private/daily` in broad searches
- NEVER place sensitive content outside `private/` directory
- NEVER use generic titles - include proper frontmatter

## UNIQUE STYLES
- Mixed Korean/English content
- Date-based directory structures for temporal content
- Extensive plugin ecosystem (25+ Obsidian plugins)
- Encrypted notes use `.mdenc` extension

## PLUGINS
Critical plugins affecting structure:
- **templater-obsidian**: Template insertion with `<% tp.* %>` syntax
- **dataview**: Dynamic queries in Home.md
- **obsidian-git**: Auto-commits
- **readwise-official**: Highlights sync
- **smart-connections**: AI-powered connections
- **meld-encrypt**: Encrypted notes

## COMMANDS
```bash
# Count files by type
find . -name "*.md" -not -path "*/.obsidian/*" | wc -l

# Recent files (excluding system dirs)
find . -name "*.md" -not -path "*/readwise/*" -not -path "*/private/daily/*" -exec ls -lt {} + | head -20
```

## NOTES
- Homepage (2_Area/Home.md) contains master Dataview queries
- `private/` directory contains personal/sensitive content
- Blog content organized by year under blog/content/YYYY/
- Encrypted files (.mdenc) inaccessible to standard tools