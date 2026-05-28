# Export Bundle Format / 导出包格式

A World Outlook export bundle is a single JSON object.

Minimum required fields:

```json
{
  "version": "1.9.0",
  "exportedAt": "2026-05-28T00:00:00.000Z",
  "world": {},
  "modules": [],
  "entries": [],
  "relations": []
}
```

Recommended public protocol metadata:

```json
{
  "meta": {
    "protocol": "world-outlook-v0.1",
    "appName": "梦划奇点",
    "appVersion": "0.x",
    "exportedBy": "local-user"
  }
}
```

## Core entities

### World

The world is the root object. Every other entity should reference `world.id` through `worldId`.

### Modules

Modules define author-facing categories such as characters, factions, locations, events, items and rules. Each module owns a list of fields.

### Entries

Entries are the user's actual worldbuilding records. Each entry belongs to one module and stores field data in `fieldValues`.

### Relations

Relations connect two entries. They are intentionally lightweight and can express relationship labels, bilateral role labels, role/title assignment, term text and notes.

### Calendar / timeline

Calendar systems, regimes, holidays, eras and temporal indexes are optional protocol sections. They support custom calendars, era display and timeline sorting without forcing real-world date assumptions.

### Map index

Map data is an index layer, not a full drawing format. Map features can bind visual points, lines and polygons to entries.

## Compatibility principle

Readers should ignore unknown fields. Writers should preserve unknown fields when possible.
