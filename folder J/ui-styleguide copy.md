<!-- {"achiles-ide-document":{"id":"Ly5wbG9pbmt5L3JlcG9zL2dpdFRlc3QvZm9sZGVyIEovdWktc3R5bGVndWlkZSBjb3B5Lm1k","title":"ui-styleguide copy","version":1,"updatedAt":"2026-02-12T08:59:52.352Z"}} -->
# UI Style Guide (WebSkel Components)

## Scoping
- Prefer tag-based scoping: start selectors with the component tag (e.g., `task-item .task-item__name`).
- Avoid global class names like `.green` or `.failed-link`.

## Naming
- Use BEM-like naming inside components:
  - Block: `component-name__element`
  - Modifier: `component-name__element--state` or `component-name` host data-attributes.
- Prefer host `data-*` for state (e.g., `task-item[data-status="failed"]`).

## Smart vs dumb
- **Smart**: presenters (JS) that handle state and orchestration.
- **Dumb**: HTML/CSS only; no logic beyond data bindings.
- Smart components should update host `data-*` and let CSS handle visuals.

## Examples
- `task-item__status` with `task-item[data-status="completed"]`.
- `list-item__root` with `list-item[data-highlight="light"]`.

<!-- {"achiles-ide-chapter":{"id":"chapter-913caf32-f0ea-4718-9570-952ec614b415","title":"New Chapter","anchorId":"chapter-chapter-913caf32-f0ea-4718-9570-952ec614b415"}} -->
<a id="chapter-chapter-913caf32-f0ea-4718-9570-952ec614b415"></a>
## New Chapter
<!-- {"achiles-ide-paragraph":{"id":"paragraph-af981ecd-45f6-4712-9cf8-6b289ee8ba51","type":"markdown","title":"Paragraph 1"}} -->
Prefer tag-based scoping: start selectors with the compone  nt tag (e.g., task-item .task-item__name).
Avoid global class names like .green or .failed-link. 


<!-- {"achiles-ide-chapter":{"id":"chapter-83700f9d-366e-4c84-8005-43655c08cf5f","title":"New Chapter","comments":{"collapsed":true},"anchorId":"chapter-chapter-83700f9d-366e-4c84-8005-43655c08cf5f"}} -->
<a id="chapter-chapter-83700f9d-366e-4c84-8005-43655c08cf5f"></a>
## New Chapter
<!-- {"achiles-ide-paragraph":{"id":"paragraph-81ee8239-266f-4582-9509-972057411be0","type":"markdown","title":"Paragraph 1"}} -->


<!-- {"achiles-ide-paragraph":{"id":"paragraph-39a8db9e-1b73-4a37-a446-9c25c2a102e8","type":"markdown","title":"Paragraph 2"}} -->


