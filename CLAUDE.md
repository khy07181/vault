---
created: 2026-01-07T12:46
updated: 2026-01-07T12:46
---
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal Obsidian vault using the PARA method for knowledge management:
- **1_Project**: Active projects with deadlines
- **2_Area**: Ongoing responsibilities and interests
- **3_Resource**: Reference materials and knowledge
- **4_Archive**: Completed or inactive items
- **5_Fleeting**: Temporary notes for quick capture
- **6_Discard**: Items to delete

Additional directories:
- **private/**: Personal and sensitive content (mirrored PARA structure)
- **blog/**: Blog content
- **readwise/**: Synced highlights from Readwise
- **templates/**: Note templates for Templater plugin

## Key Configuration

### Obsidian Settings
- Vim mode is enabled (`.obsidian.vimrc`)
- Line numbers are shown
- Inline titles are hidden

### Important Files
- **2_Area/Home.md**: Homepage with Dataview queries for recent files, reading list, and uncreated notes
- **templates/**: Contains templates for daily notes, books, recipes, blog posts, and metadata

## File Conventions

### Frontmatter Structure
All notes use YAML frontmatter with these common properties:
- `title`: Note title
- `aliases`: Alternative names
- `classification`: PARA category (project/area/resource/archive)
- `tags`: Topic tags
- `created`: Creation timestamp (format: `yyyy-MM-DDTHH:mm`)
- `updated`: Last update timestamp (for some notes)

Book notes include additional metadata:
- `cover_url`, `author`, `url`, `category`, `publish_date`, `read_date`, `total_page`, `status`, `format`, `rate`, `reading_count`

### File Organization
- Notes are organized by PARA categories
- Private content is kept in `private/` directory
- Daily notes follow pattern: `private/2_Area/daily/YYYY/YYYY-MM-DD.md`
- Book notes: `private/2_Area/library/book/[book-name].md`

## Templater Syntax
Templates use Templater plugin syntax:
- `CLAUDE`: Insert file title
- `2026-01-07T12:46`: Insert creation date
- `<% tp.file.cursor() %>`: Set cursor position

## Dataview Queries
The vault uses Dataview plugin extensively for dynamic content:
- Recent file queries filter out `readwise` and `private/daily` folders
- Book queries search `private/2_Area/library/book` directory
- Uncreated note queries exclude `6_Discard` folders

## Key Plugins
Notable plugins that affect vault structure:
- **obsidian-git**: Auto-commits changes
- **templater-obsidian**: Template insertion
- **dataview**: Dynamic queries
- **readwise-official**: Sync highlights
- **smart-connections**: AI-powered connections
- **copilot**: AI assistant integration
- **obsidian-excalidraw-plugin**: Drawings
- **meld-encrypt**: Encrypted notes (`.mdenc` files)

## Working with This Vault

When creating or modifying notes:
1. Use appropriate PARA category
2. Include proper frontmatter with required fields
3. Respect the `private/` directory for sensitive content
4. Follow existing naming patterns for consistency
5. Add relevant tags for discoverability
6. Use templates when available

When querying content:
- Use Dataview syntax for dynamic lists
- Exclude `readwise` and `private/daily` from broad searches
- Consider encrypted notes (`.mdenc`) may be inaccessible
