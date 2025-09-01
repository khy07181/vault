---
title: Readwise Reader export highlight template
aliases: 
classification: resource
tags:
  - readwise
  - obsidian
  - markdown
  - template
created: 2025-06-21T11:06
updated: 2025-06-21T11:06
---

### Default

```md
# {{ title }}

## Metadata
- Author: {{author}}
- Category: {{category}}
{% if document_note -%}
- Document Note: {{document_note}}
{% endif -%}
{% if tags -%}
- Document Tags: {% for tag in tags %}{{tag}} {% endfor %}
{% endif -%}
{% if url -%}
- URL: {{url}}
{% endif -%}

## Highlights
{% for highlight in highlights %}
{{highlight.content}}
{% if highlight.note -%}Note: {{highlight.note}}{% endif -%}
{% if highlight.tags -%}Tags: {% for tag in highlight.tags %}{{tag}}{% endfor %}{% endif -%}
{% endfor %}

```

### 2025-06-21

```md
# {{ title }}

## Metadata
- Author: {{author}}
- Category: {{category}}
{% if document_note -%}
- Document Note: {{document_note}}
{% endif -%}
{% if tags -%}
- Document Tags: {% for tag in tags %}{{tag}} {% endfor %}
{% endif -%}
{% if url -%}
- URL: {{url}}
{% endif -%}

## Highlights
{% for highlight in highlights %}
{% if highlight.tags -%}#{% for tag in highlight.tags %}{{tag}} 
{% endfor %}{% endif -%}
{{highlight.content}}

{% if highlight.note -%}
>[!note]
>{{highlight.note}} 

{% endif -%}
---
{% endfor %}

```
