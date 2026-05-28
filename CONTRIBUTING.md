# Contributing to World Outlook Protocol

Thank you for considering a contribution to World Outlook Protocol / 梦划奇点资料协议.

This repository is intentionally scoped to the public protocol layer. It is not the full World Outlook application repository.

## Scope

Accepted contributions include:

- Protocol documentation improvements
- JSON Schema corrections
- TypeScript protocol type corrections
- Validator bug fixes
- Example bundle fixes
- Migration-policy suggestions
- Compatibility and interoperability proposals

Out of scope for this repository:

- Complete application UI features
- Angular implementation details
- Local database implementation requests
- Commercial writing Skill prompts
- Private workflow templates
- time-shards / skreeb-new integration internals
- Personal workflow customization that does not generalize to the protocol

If a request belongs to the application layer rather than the protocol layer, it may be closed or redirected.

## Before opening an issue

Please check:

1. Whether the issue concerns the public protocol layer.
2. Whether the example data can reproduce the problem without exposing private worldbuilding content.
3. Whether the proposal can apply broadly across different genres, settings, and creator workflows.

Do not upload private worldbuilding projects, unpublished manuscripts, client materials, personal data, or confidential collaboration records.

## Development

Install dependencies and build:

```bash
pnpm install
pnpm build
```

Validate examples:

```bash
pnpm validate:example
node dist/cli.js examples/fantasy-template.json
```

## Pull requests

A pull request should include:

- A clear explanation of the protocol problem being solved
- Updated docs when the public shape changes
- Updated examples when relevant
- Updated validator tests or manual validation notes when relevant

For protocol-breaking changes, open an issue first and describe:

- The affected fields
- The migration impact
- Whether old bundles can be detected and migrated
- Why the change should be part of the public protocol rather than an application-only feature

## Versioning policy

Before `v1.0`, this protocol is experimental and may change. Breaking changes should still be documented in `CHANGELOG.md` and `docs/migration-policy.md`.

After `v1.0`, public fields should avoid breaking changes unless a migration path is provided.
