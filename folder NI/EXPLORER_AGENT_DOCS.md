<!-- {"achiles-ide-document":{"id":"Ly5wbG9pbmt5L3JlcG9zL2dpdFRlc3QvZm9sZGVyIE5JL0VYUExPUkVSX0FHRU5UX0RPQ1MubWQ=","title":"EXPLORER_AGENT_DOCS","version":1,"updatedAt":"2026-02-13T07:23:11.922Z"}} -->
`
    - `

<!-- {"achiles-ide-chapter":{"id":"chapter-d552de2a-fad2-4fb9-a7fd-2e9682ec657b","title":"Intro","anchorId":"chapter-chapter-d552de2a-fad2-4fb9-a7fd-2e9682ec657b"}} -->
<a id="chapter-chapter-d552de2a-fad2-4fb9-a7fd-2e9682ec657b"></a>
## 5) SOPLang Usage in Documents
`
    - `<!--{"achiles-ide-paragraph": {"text": "Hello", "commands": "@media_image_123 attach id \"blob-id\" name \"hero.png\""}}-->`
- **Persistence via SOPLang commands**: Commands are embedded inline and preserved on save.
  - Example: `@media_image_123 attach id "blob-id" name "hero.png"` stays in the Markdown; UI renders the image using parsed data.
- **Document info**: Title and Info Text are stored in metadata (e.g., Title “Release Notes”, Info “Changelog for v1.2”).
- **Table of Contents**: Built from chapters; selecting an entry scrolls to that chapter.
- **Comments**: Stored per document/chapter/paragraph (e.g., “Clarify API version” attached to a paragraph).
- **References**: Stored in `references` array (e.g., title “RFC 9110”, URL set in references table).
- **Snapshots/Tasks/Variables**: Version snapshots, to-dos, and variables (e.g., `releaseVersion=1.2.0`) are part of the model; dialogs manage them.
- **Other files**: Open `config/app.json` or `src/main.js` with the general editor; no chapter/paragraph structure, only text + syntax highlight.

---
<!-- {"achiles-ide-paragraph":{"id":"paragraph-1b6743c1-4c97-46b4-8777-830cf34283b9","type":"markdown","title":"Paragraph 1"}} -->
- **Embed code**: Use fenced ` ```soplang ` blocks for scripts.
- **Achilles comments**: `achiles-ide-document/chapter/paragraph` markers map Markdown to the model and keep commands in sync.
- **Variables & media**: Commands like `@set   doc_owner "alice@company.com"` or `@media_image_123 attach id "abcd" name "diagram.png"` live in the Markdown and are parsed on hydration.
- **Execution**: UI actions can run SOPLang blocks via soplangAgent; outputs/variable updates flow back into the model. Reload to re-hydrate after edits.
- **Flow fit**: Documents + SOPLang commands define structure; the build pipeline (below) persists them via soplangAgent.

---

## 6) Plugin System 

- **Discovery**: MCP tool `collect_ide_plugins` calls `aggregateIdePlugins`, scanning enabled repos for `IDE-plugins/*/config.json` on each invocation (e.g., UI load). Results are grouped by `location`.
- **Manifest example**:
  ```json
  {
    "component": "video-creator",
    "presenter": "VideoCreator",
    "type": "modal",
    "location": ["document"],
    "tooltip": "Create a video from a script",
    "icon": "./assets/icons/video.svg"
  }
  ```
- **Example plugin (Uppercase paragraph)**: Folder `IDE-plugins/uppercase/` with `config.json`, `uppercase-plugin.html`, and presenter implementing `beforeRender/afterRender`, calling `documentModule.updateParagraphText` then showing a toast and closing the modal.
- **UI-only scaffold**: Plugins can be simple UI bundles with `manifest.json` and static assets (see “Plugins guide” in the site for full steps).

---

## 7) Backend: MCP + SOPLang

- **MCP (Explorer):** Serves filesystem tools over `/mcp` (plus `/health`), enforcing `allowedDirectories` from `ASSISTOS_FS_ROOT`/`MCP_FS_ROOT`. Path args are resolved/normalized; anything outside whitelisted roots is rejected. No `/blobs` HTTP endpoint.
- **MCP capabilities (by function):** Read text/media/small batches; write/edit text or binary; list/tree directories (simple/detailed/sized); move/copy/delete; metadata/info and search; list allowed directories; aggregate `IDE-plugins/*/config.json` for the UI.
- **SOPLang (soplangAgent):** Separate container and MCP tool (`soplang-tool`). Runs SOPLang scripts, manages variables, and hosts plugins such as `SoplangBuilder`. Commands and variables are embedded in Markdown comments/blocks and preserved on save.
- **Variables & commands:** `@set releaseVersion "1.4.0"`, `@media_image_hero attach id "blob-id" name "hero.png"`. Variables live in the document model; media commands store blob IDs only.
- **SOPLang build (Markdown → Documents):** `SoplangBuilder.buildFromMarkdown` scans `.md` files, reads `achiles-ide-document/chapter/paragraph` comments, applies templates to the document store, then `workspace.forceSave()` + `workspace.buildAll()`. Invoke via MCP with `pluginName: "SoplangBuilder"`, `methodName: "buildFromMarkdown"`; logs at `SOPLangBuilder/last-tool.log`.

---

## 8) Development & Setup

- **Prereqs**: Node 20+, npm, active <a href="https://github.com/OutfinityResearch/ploinky/blob/master/README.md">Ploinky</a> workspace.
- **Global run**: `p-cli enable repo fileExplorer` then `p-cli enable agent fileExplorer/explorer global`; start with `p-cli start explorer 8080` (router/UI on that port).
- **Filesystem root**: Set `ASSISTOS_FS_ROOT` (or `MCP_FS_ROOT`) to the workspace path(s); fallback is cwd. First root is workspace root.
- **Auto-enabled agents**: `soplang`, `multimedia` (from Explorer manifest).
- **Dependencies**: `npm install` at repo root (and `explorer/` if needed).
- **Hot reload**: UI refresh picks up most changes; plugin `config.json` or new plugins require Explorer restart to rescan. SOPLang comment edits are re-hydrated on reload; rerun `buildFromMarkdown` to persist into the SOPLang store.
- **Preview portability rule**: Do not rely on local-only symlinks like `explorer/docs`. Use the repo-scoped symlink under `explorer/.ploinky/repos/fileExplorer` so preview works consistently on clean clones.
- **Repo layout (Explorer)**:
  ```
  explorer/
  ├─ .ploinky/repos/fileExplorer -> ../../..  # repo-scoped static path bridge for web preview
  ├─ filesystem-http-server.mjs   # MCP, plugin discovery
  ├─ index.html / main.js         # SPA entry
  ├─ webskel.json                 # UI components
  ├─ web-components/              # UI implementations
  ├─ IDE-plugins/                 # Plugin location
  ├─ services/                    # Document parsing/services
  └─ utils/                       # Shared utilities
  ```

---

## 9) SOPLang Agent (overview)

- **Manifest**: `soplangAgent/manifest.json` – `container: node:20-alpine`, `postinstall: apk add ffmpeg`.
- **MCP tool**: `soplang-tool` (`soplangAgent/mcp-config.json`) with `pluginName`, `methodName`, `params`.
- **Plugins loaded**: SOPLang core plugins plus `plugins/SoplangBuilder.js` if present; log captured in `last-tool.log`.
- **Workspace access**: Reads markdown directly from mounted workspace; not dependent on Explorer backend.

---

## 10) General Notes

- Blob uploads: UI utilities target `/blobs/<agent>`, but the current Explorer server does not implement this HTTP endpoint. Plan workflows accordingly (or add server support if needed).
- MCP isolation: Call Explorer and soplangAgent independently; do not route soplang-tool through Explorer.
- View vs. edit: All files support both; structured features apply only to Markdown. Syntax highlighting is presentation only for code/text files.

