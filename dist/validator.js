function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function hasString(value, key) {
    return typeof value[key] === 'string' && value[key].length > 0;
}
function push(issueList, code, path, message, severity = 'error') {
    issueList.push({ severity, code, path, message });
}
export function validateWorldExportBundle(input) {
    const errors = [];
    const warnings = [];
    if (!isObject(input)) {
        push(errors, 'BUNDLE_NOT_OBJECT', '$', 'Bundle must be a JSON object.');
        return { valid: false, errors, warnings };
    }
    if (!hasString(input, 'version'))
        push(errors, 'MISSING_VERSION', '$.version', 'Bundle version is required.');
    if (!hasString(input, 'exportedAt'))
        push(errors, 'MISSING_EXPORTED_AT', '$.exportedAt', 'Export time is required.');
    if (!isObject(input.world))
        push(errors, 'MISSING_WORLD', '$.world', 'World object is required.');
    if (!Array.isArray(input.modules))
        push(errors, 'MISSING_MODULES', '$.modules', 'Modules array is required.');
    if (!Array.isArray(input.entries))
        push(errors, 'MISSING_ENTRIES', '$.entries', 'Entries array is required.');
    if (!Array.isArray(input.relations))
        push(errors, 'MISSING_RELATIONS', '$.relations', 'Relations array is required.');
    if (errors.length > 0)
        return { valid: false, errors, warnings };
    const bundle = input;
    const worldId = bundle.world.id;
    if (!worldId)
        push(errors, 'WORLD_ID_REQUIRED', '$.world.id', 'World id is required.');
    if (!bundle.world.name)
        push(errors, 'WORLD_NAME_REQUIRED', '$.world.name', 'World name is required.');
    const moduleIds = new Set();
    const entryIds = new Set();
    bundle.modules.forEach((module, index) => {
        if (!module.id)
            push(errors, 'MODULE_ID_REQUIRED', `$.modules[${index}].id`, 'Module id is required.');
        if (module.id && moduleIds.has(module.id))
            push(errors, 'DUPLICATE_MODULE_ID', `$.modules[${index}].id`, `Duplicate module id: ${module.id}.`);
        if (module.id)
            moduleIds.add(module.id);
        if (module.worldId !== worldId)
            push(errors, 'MODULE_WORLD_MISMATCH', `$.modules[${index}].worldId`, 'Module worldId must match world.id.');
        if (!Array.isArray(module.fields))
            push(errors, 'MODULE_FIELDS_REQUIRED', `$.modules[${index}].fields`, 'Module fields must be an array.');
        const fieldKeys = new Set();
        module.fields?.forEach((field, fieldIndex) => {
            if (!field.key)
                push(errors, 'FIELD_KEY_REQUIRED', `$.modules[${index}].fields[${fieldIndex}].key`, 'Field key is required.');
            if (field.key && fieldKeys.has(field.key))
                push(errors, 'DUPLICATE_FIELD_KEY', `$.modules[${index}].fields[${fieldIndex}].key`, `Duplicate field key in module ${module.id}: ${field.key}.`);
            if (field.key)
                fieldKeys.add(field.key);
        });
    });
    bundle.entries.forEach((entry, index) => {
        if (!entry.id)
            push(errors, 'ENTRY_ID_REQUIRED', `$.entries[${index}].id`, 'Entry id is required.');
        if (entry.id && entryIds.has(entry.id))
            push(errors, 'DUPLICATE_ENTRY_ID', `$.entries[${index}].id`, `Duplicate entry id: ${entry.id}.`);
        if (entry.id)
            entryIds.add(entry.id);
        if (entry.worldId !== worldId)
            push(errors, 'ENTRY_WORLD_MISMATCH', `$.entries[${index}].worldId`, 'Entry worldId must match world.id.');
        if (!moduleIds.has(entry.moduleId))
            push(errors, 'ENTRY_MODULE_MISSING', `$.entries[${index}].moduleId`, `Entry points to missing module: ${entry.moduleId}.`);
        if (!entry.title)
            push(errors, 'ENTRY_TITLE_REQUIRED', `$.entries[${index}].title`, 'Entry title is required.');
        if (!isObject(entry.fieldValues))
            push(errors, 'ENTRY_FIELD_VALUES_REQUIRED', `$.entries[${index}].fieldValues`, 'Entry fieldValues must be an object.');
    });
    bundle.relations.forEach((relation, index) => {
        if (relation.worldId !== worldId)
            push(errors, 'RELATION_WORLD_MISMATCH', `$.relations[${index}].worldId`, 'Relation worldId must match world.id.');
        if (!entryIds.has(relation.fromEntryId))
            push(errors, 'RELATION_FROM_ENTRY_MISSING', `$.relations[${index}].fromEntryId`, `Relation source entry does not exist: ${relation.fromEntryId}.`);
        if (!entryIds.has(relation.toEntryId))
            push(errors, 'RELATION_TO_ENTRY_MISSING', `$.relations[${index}].toEntryId`, `Relation target entry does not exist: ${relation.toEntryId}.`);
        if (!relation.relationType)
            push(errors, 'RELATION_TYPE_REQUIRED', `$.relations[${index}].relationType`, 'Relation type is required.');
    });
    bundle.eras?.forEach((era, index) => {
        if (era.worldId !== worldId)
            push(errors, 'ERA_WORLD_MISMATCH', `$.eras[${index}].worldId`, 'Era worldId must match world.id.');
    });
    bundle.treeNodes?.forEach((node, index) => {
        if (node.worldId !== worldId)
            push(errors, 'TREE_NODE_WORLD_MISMATCH', `$.treeNodes[${index}].worldId`, 'Tree node worldId must match world.id.');
        if (node.refType === 'entry' && node.refId && !entryIds.has(node.refId)) {
            push(warnings, 'TREE_NODE_ENTRY_REF_MISSING', `$.treeNodes[${index}].refId`, `Tree node points to a missing entry: ${node.refId}.`, 'warning');
        }
        if (node.refType === 'module' && node.refId && !moduleIds.has(node.refId)) {
            push(warnings, 'TREE_NODE_MODULE_REF_MISSING', `$.treeNodes[${index}].refId`, `Tree node points to a missing module: ${node.refId}.`, 'warning');
        }
    });
    bundle.mapFeatures?.forEach((feature, index) => {
        if (feature.worldId !== worldId)
            push(errors, 'MAP_FEATURE_WORLD_MISMATCH', `$.mapFeatures[${index}].worldId`, 'Map feature worldId must match world.id.');
        if (feature.bindEntryId && !entryIds.has(feature.bindEntryId)) {
            push(warnings, 'MAP_FEATURE_ENTRY_REF_MISSING', `$.mapFeatures[${index}].bindEntryId`, `Map feature binds to a missing entry: ${feature.bindEntryId}.`, 'warning');
        }
    });
    bundle.writingContextPacks?.forEach((pack, index) => {
        if (pack.worldId !== worldId)
            push(errors, 'WRITING_PACK_WORLD_MISMATCH', `$.writingContextPacks[${index}].worldId`, 'Writing context pack worldId must match world.id.');
        pack.selectedEntryIds.forEach((entryId, entryIndex) => {
            if (!entryIds.has(entryId))
                push(warnings, 'WRITING_PACK_ENTRY_REF_MISSING', `$.writingContextPacks[${index}].selectedEntryIds[${entryIndex}]`, `Writing context pack points to a missing entry: ${entryId}.`, 'warning');
        });
    });
    return { valid: errors.length === 0, errors, warnings };
}
