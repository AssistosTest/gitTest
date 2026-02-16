<!-- {"achiles-ide-document":{"id":"Ly5wbG9pbmt5L3JlcG9zL2dpdFRlc3QvTW9uZGF5L2FyY2hpdGVjdHVyZS1sYXllcnMubWQ=","title":"architecture-layers","version":1,"updatedAt":"2026-02-16T08:55:49.802Z"}} -->
# Architecture Layers

This document defines the intended layering rules for the Explorer UI and runtime.

## Layers

1) UI layer
- WebSkel presenters, view models, and UI helpers.
- Must not call MCP/tools directly.

2) Domain / use-cases
- Services that expose intent (e.g., AutocommitService, RepoService, DocumentService).
- Orchestrates workflows but does not depend on UI details.

3) Infrastructure
- Tool adapters (MCP/HTTP), storage, runtime plugin loader, parsing of tool responses.

## Dependency rules

- UI -> Domain -> Infrastructure (one-way only).
- UI must not import infrastructure directly unless explicitly approved.
- Domain should depend only on infrastructure abstractions, not UI code.

## Current migration

- `explorer/services/infrastructure/explorerApi.js` is the canonical tool adapter.
- Runtime plugin helpers are split into core (`explorer/utils/pluginUtils.core.js`)
  and UI (`explorer/utils/pluginUtils.ui.js`).

<!-- {"achiles-ide-chapter":{"id":"chapter-d17105c5-8548-43a3-a332-fc4b9ee14ca2","title":"New Chapter 222","anchorId":"chapter-chapter-d17105c5-8548-43a3-a332-fc4b9ee14ca2"}} -->
<a id="chapter-chapter-d17105c5-8548-43a3-a332-fc4b9ee14ca2"></a>
## New Chapter 222
<!-- {"achiles-ide-paragraph":{"id":"paragraph-c9c4ce7a-c69e-4d43-a907-1558648b1af8","type":"markdown","title":"Paragraph 1"}} -->


