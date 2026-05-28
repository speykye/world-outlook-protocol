# Migration Policy / 迁移策略

Before protocol `v1.0`, breaking changes are allowed but must be documented.

After protocol `v1.0`, the preferred policy is:

1. Additive changes should be backward compatible.
2. Readers should ignore unknown fields.
3. Writers should preserve unknown fields when possible.
4. Destructive migrations must provide a migration note and, when possible, a script.
5. Deprecated fields should remain readable for at least one major protocol cycle.

## Suggested migration file naming

```text
migrations/
  001-1.8.0-to-1.9.0.md
  002-world-outlook-v0.1-to-v0.2.md
```

## Suggested migration metadata

```json
{
  "from": "world-outlook-v0.1",
  "to": "world-outlook-v0.2",
  "breaking": false,
  "summary": "Adds mapAssets summary and temporalIndexes section."
}
```
