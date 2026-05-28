# World Outlook Protocol / 梦划奇点资料协议

This package is the **open protocol layer** for World Outlook / 梦划奇点.
It is designed to make worldbuilding data exportable, inspectable, migratable and eventually interoperable across tools.

It does **not** include the complete Angular application, UI implementation, commercial Skill prompts, private beta features or brand assets.

## Current status

- Protocol version: `world-outlook-v0.1`
- Stability: draft / experimental
- Recommended use: export inspection, compatibility experiments, validation tooling, template exchange
- Compatibility promise: breaking changes may still happen before `v1.0`, but all changes should be documented through migrations

## Package contents

```text
src/
  index.ts              Public exports
  protocol.types.ts     TypeScript data model
  validator.ts          Lightweight bundle validator
  cli.ts                CLI validator entry
schemas/
  world-export-bundle.schema.json
examples/
  minimal-world.json
  fantasy-template.json
docs/
  introduction.md
  bundle-format.md
  migration-policy.md
  data-ownership.md
  open-source-boundary.md
```

## Install / build

```bash
pnpm install
pnpm build
pnpm validate:example
```

## CLI

```bash
world-outlook-validate ./my-world.json
```

The validator checks the minimum protocol shape and common reference integrity problems, such as entries pointing to missing modules or relations pointing to missing entries.

## Public boundary

Open now:

- export bundle format
- TypeScript protocol types
- JSON Schema draft
- validation logic
- example world packages
- migration and data ownership documents

Not open in this package:

- complete product source code
- Angular UI implementation
- local-first database implementation details beyond exported shapes
- commercial writing Skill prompts
- time-shards / skreeb-new workflow integration details
- high-resolution brand assets

