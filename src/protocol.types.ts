export type ID = string;
export type ISODateTime = string;

export const WORLD_OUTLOOK_PROTOCOL_ID = 'world-outlook-v0.1' as const;
export type WorldOutlookProtocolId = typeof WORLD_OUTLOOK_PROTOCOL_ID;

export type ProtocolMeta = {
  protocol: WorldOutlookProtocolId;
  appName?: string;
  appVersion?: string;
  exportedBy?: string;
  note?: string;
};

export type WorldFeatureKey =
  | 'guide'
  | 'tags'
  | 'collections'
  | 'materials'
  | 'timeline'
  | 'calendar'
  | 'relations'
  | 'map'
  | 'consistency'
  | 'law'
  | 'lab';

export type WorldFeatureSettings = Partial<Record<WorldFeatureKey, boolean>>;

export type World = {
  id: ID;
  name: string;
  description: string;
  genre?: string;
  tags: string[];
  featureSettings?: WorldFeatureSettings;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type DatePrecision = 'exact_day' | 'month' | 'year' | 'era' | 'unknown';
export type DateConfidence = 'confirmed' | 'legendary' | 'disputed' | 'estimated' | 'symbolic';
export type TimelineImportance = 'none' | 'primary' | 'secondary' | 'tertiary';
export type CharacterRolePosition = 'main' | 'secondary' | 'npc';

export type WorldDateValue = {
  type: 'world_date';
  calendarSystemId: ID;
  calendarRegimeId?: ID;
  absoluteDay: string;
  year: number;
  monthOrder: number;
  day: number;
  displaySnapshot: string;
  precision: DatePrecision;
  confidence: DateConfidence;
  inputMode?: 'calendar_date' | 'absolute_day' | 'relative' | 'unknown' | 'approximate';
};

export type WorldDateRangeValue = {
  type: 'world_date_range';
  calendarSystemId: ID;
  start?: WorldDateValue;
  end?: WorldDateValue;
  rangeType: 'fixed' | 'open_start' | 'open_end' | 'ongoing' | 'cyclic' | 'symbolic';
  label?: string;
  startPrecision?: DatePrecision;
  endPrecision?: DatePrecision;
  startConfidence?: DateConfidence;
  endConfidence?: DateConfidence;
};

export type ModuleTone = 'character' | 'location' | 'faction' | 'event' | 'item' | 'rule';

export type ModuleFieldType =
  | 'text'
  | 'textarea'
  | 'singleSelect'
  | 'multiSelect'
  | 'number'
  | 'dateText'
  | 'worldDate'
  | 'worldDateRange'
  | 'tags'
  | 'entryRef';

export type ModuleFieldOptionGroup = {
  id: ID;
  name: string;
  options: string[];
};

export type ModuleFieldVisibilityCondition = {
  enabled: boolean;
  mode: 'always' | 'byTag' | 'byFieldValue';
  sourceFieldKey?: string;
  operator?: 'equals' | 'includes';
  values?: string[];
  tags?: string[];
};

export type ModuleField = {
  id: ID;
  key: string;
  label: string;
  type: ModuleFieldType;
  required: boolean;
  placeholder?: string;
  groupName?: string;
  advanced?: boolean;
  visibilityCondition?: ModuleFieldVisibilityCondition;
  options?: string[];
  optionGroups?: ModuleFieldOptionGroup[];
  order: number;
  calendarRole?: 'primary_time' | 'birth' | 'death' | 'active_period' | 'existence_period' | 'custom';
  timeline?: boolean;
  allowedPrecisions?: DatePrecision[];
  timelineDisplay?: 'point' | 'range' | 'hidden';
  allowedModuleIds?: ID[];
  referenceMode?: 'single' | 'multiple';
  filterable?: boolean;
  conditionable?: boolean;
};

export type WorldModule = {
  id: ID;
  worldId: ID;
  name: string;
  description?: string;
  colorTone?: ModuleTone;
  icon?: string;
  isSystem: boolean;
  groupName?: string;
  sortOrder?: number;
  fields: ModuleField[];
  capabilities?: {
    timeline?: boolean;
    calendarBindable?: boolean;
  };
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type EntryFieldValues = Record<string, unknown>;

export type Entry = {
  id: ID;
  worldId: ID;
  moduleId: ID;
  title: string;
  summary?: string;
  notes?: string;
  tags: string[];
  fieldValues: EntryFieldValues;
  isFavorite?: boolean;
  timelineImportance?: TimelineImportance;
  timelineHighlighted?: boolean;
  rolePosition?: CharacterRolePosition;
  roleHighlighted?: boolean;
  sortOrder?: number;
  eraIds?: ID[];
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type EntryRelationTypeCategory = 'character' | 'faction' | 'location' | 'general' | 'custom';
export type EntryRelationTermStatus = 'unknown' | 'current' | 'former' | 'vacant';

export type EntryRelation = {
  id: ID;
  worldId: ID;
  fromEntryId: ID;
  toEntryId: ID;
  relationType: string;
  relationTypeCategory?: EntryRelationTypeCategory;
  fromRoleLabel?: string;
  toRoleLabel?: string;
  roleName?: string;
  termStatus?: EntryRelationTermStatus;
  termStartText?: string;
  termEndText?: string;
  note?: string;
  createdAt: ISODateTime;
};

export type CalendarSystemType = 'main' | 'religious' | 'dynasty' | 'regional' | 'academic' | 'custom';
export type CalendarTransitionMode = 'continuous' | 'skip_days' | 'insert_days' | 'relabel_only' | 'era_reset';
export type CalendarYearNumberingMode = 'signed_world_year' | 'astronomical' | 'historical_bc_ad' | 'custom_era';
export type CalendarRegimeStatus = 'draft' | 'active' | 'retired' | 'future';

export type CalendarMonth = { id: ID; order: number; name: string; days: number; alias?: string };
export type CalendarWeekday = { id: ID; order: number; name: string };
export type CalendarYearRule = { mode: CalendarYearNumberingMode; allowYearZero: boolean; zeroYearLabel?: string };
export type CalendarLeapRule = { type: 'none' | 'interval'; every?: number; addDays?: number; dayName?: string; position?: 'year_end' };

export type CalendarSystem = {
  id: ID;
  worldId: ID;
  name: string;
  description?: string;
  type: CalendarSystemType;
  isDefault: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type CalendarRegime = {
  id: ID;
  worldId: ID;
  calendarSystemId: ID;
  name: string;
  description?: string;
  status: CalendarRegimeStatus;
  effectiveFromDay: string;
  effectiveToDay?: string;
  reformEventId?: ID;
  reformYear: number;
  transitionMode: CalendarTransitionMode;
  yearRule: CalendarYearRule;
  months: CalendarMonth[];
  weekdays: CalendarWeekday[];
  leapRule: CalendarLeapRule;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type CalendarHolidayType = 'festival' | 'memorial' | 'seasonal' | 'custom';
export type CalendarHolidayRecurrence = 'yearly' | 'once';

export type CalendarHoliday = {
  id: ID;
  worldId: ID;
  calendarSystemId: ID;
  calendarRegimeId?: ID;
  name: string;
  type: CalendarHolidayType;
  monthOrder: number;
  day: number;
  durationDays: number;
  recurrence: CalendarHolidayRecurrence;
  year?: number;
  description?: string;
  color?: string;
  showInTimeline: boolean;
  relatedEntryIds?: ID[];
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WorldEra = {
  id: ID;
  worldId: ID;
  name: string;
  description?: string;
  startDate?: WorldDateValue;
  endDate?: WorldDateValue;
  absoluteDayStart?: string;
  absoluteDayEnd?: string;
  color?: string;
  sortOrder: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WorldTemporalIndex = {
  id: ID;
  worldId: ID;
  entryId: ID;
  moduleId: ID;
  fieldKey: string;
  fieldLabel?: string;
  calendarSystemId?: ID;
  calendarRegimeId?: ID;
  displaySnapshot?: string;
  rangeType?: WorldDateRangeValue['rangeType'];
  absoluteDayStart?: string;
  absoluteDayEnd?: string;
  precision: DatePrecision;
  confidence?: DateConfidence;
  startPrecision?: DatePrecision;
  endPrecision?: DatePrecision;
  startConfidence?: DateConfidence;
  endConfidence?: DateConfidence;
  isPrimaryTime: boolean;
  isApproximate?: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WorldTreeType = 'moduleEntryTree' | 'worldEntryCollection';
export type WorldTreeScopeType = 'world' | 'module' | 'entry';
export type WorldTreeNodeType = 'folder' | 'entry';
export type WorldTreeRefType = 'entry' | 'module' | 'era' | 'region' | 'faction';

export type WorldTreeNode = {
  id: ID;
  worldId: ID;
  treeType: WorldTreeType;
  scopeType: WorldTreeScopeType;
  scopeId: ID;
  nodeType: WorldTreeNodeType;
  title: string;
  parentId?: ID | null;
  refType?: WorldTreeRefType;
  refId?: ID;
  sortOrder: number;
  collapsed?: boolean;
  description?: string;
  linkedEntryId?: ID;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WorldMapCoordinateSystem = {
  type: 'cartesian-2d';
  origin: 'top-left';
  unit: 'px' | 'world-unit';
  width: number;
  height: number;
};

export type WorldMapBaseLayer = {
  type: 'image';
  assetId: ID;
  width: number;
  height: number;
  name?: string;
};

export type WorldMap = {
  id: ID;
  worldId: ID;
  name: string;
  description?: string;
  mapType: 'image-map';
  coordinateSystem: WorldMapCoordinateSystem;
  baseLayer?: WorldMapBaseLayer;
  viewport?: { zoom: number; center: { x: number; y: number } };
  isActive?: boolean;
  schemaVersion: 1;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type MapLayer = {
  id: ID;
  worldId: ID;
  mapId: ID;
  name: string;
  type: 'base' | 'terrain' | 'political' | 'route' | 'event' | 'custom';
  visible: boolean;
  locked: boolean;
  order: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type MapFeatureType = 'point' | 'line' | 'polygon' | 'label';
export type MapFeatureSemanticType =
  | 'city' | 'town' | 'capital' | 'ruin' | 'port' | 'country' | 'province' | 'territory'
  | 'river' | 'road' | 'sea_route' | 'migration_route' | 'battle_route' | 'danger_zone'
  | 'biome' | 'event_site' | 'custom';

export type WorldMapPoint = [number, number];
export type MapFeatureGeometry =
  | { type: 'Point'; coordinates: WorldMapPoint }
  | { type: 'LineString'; coordinates: WorldMapPoint[] }
  | { type: 'Polygon'; coordinates: WorldMapPoint[][] };

export type MapFeatureStyle = {
  color?: string;
  fillColor?: string;
  opacity?: number;
  strokeWidth?: number;
  icon?: string;
  labelVisible?: boolean;
};

export type MapFeature = {
  id: ID;
  worldId: ID;
  mapId: ID;
  layerId: ID;
  featureType: MapFeatureType;
  semanticType: MapFeatureSemanticType;
  name: string;
  description?: string;
  geometry: MapFeatureGeometry;
  style?: MapFeatureStyle;
  bindEntryId?: ID;
  metadata?: Record<string, unknown>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type MapAssetSummary = {
  id: ID;
  worldId: ID;
  type: 'image';
  name: string;
  mimeType: string;
  width: number;
  height: number;
  size: number;
  hash?: string;
  createdAt: ISODateTime;
};

export type WorldMapExportBundle = {
  version: 'map-p0.1';
  exportedAt: ISODateTime;
  map: WorldMap;
  layers: MapLayer[];
  features: MapFeature[];
  assets: MapAssetSummary[];
};

export type WikiEntryType = 'character' | 'location' | 'faction' | 'race' | 'event' | 'term' | 'item' | 'system' | 'other';
export type WikiEntryVisibility = 'private' | 'shareable';
export type WikiFragmentSourceType = 'paste' | 'file' | 'manual';

export type WikiEntry = {
  id: ID;
  worldId: ID;
  title: string;
  aliases: string[];
  type: WikiEntryType;
  summary: string;
  content: string;
  sourceFragmentIds: ID[];
  relatedEntryIds: ID[];
  tags: string[];
  visibility: WikiEntryVisibility;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WikiFragment = {
  id: ID;
  worldId: ID;
  sourceType: WikiFragmentSourceType;
  sourceName?: string;
  content: string;
  contentHash?: string;
  createdAt: ISODateTime;
};

export type SettingMaterialStatus = 'inbox' | 'converted' | 'linked' | 'ignored';
export type SettingMaterialSourceType = 'paste' | 'file' | 'manual';

export type SettingMaterial = {
  id: ID;
  worldId: ID;
  title: string;
  content: string;
  sourceType: SettingMaterialSourceType;
  sourceName?: string;
  sourceFileName?: string;
  status: SettingMaterialStatus;
  tags: string[];
  linkedEntryIds: ID[];
  createdEntryId?: ID;
  contentHash?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WritingContextPackStatus = 'draft' | 'checking' | 'passed' | 'warning' | 'blocked';

export type WritingContextPack = {
  id: ID;
  worldId: ID;
  title: string;
  userIntent: string;
  writingGoalType?: string;
  outputType?: string;
  hardConstraints: string[];
  softPreferences: string[];
  selectedEntryIds: ID[];
  selectedRelationIds: ID[];
  selectedTimelineEventIds: ID[];
  status: WritingContextPackStatus;
  contextSnapshot: string;
  sourceUpdatedAtFingerprint: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type WorldExportBundleVersion =
  | '1.0.0' | '1.1.0' | '1.2.0' | '1.3.0' | '1.4.0'
  | '1.5.0' | '1.6.0' | '1.7.0' | '1.8.0' | '1.9.0';

export type WorldExportBundle = {
  meta?: ProtocolMeta;
  version: WorldExportBundleVersion;
  exportedAt: ISODateTime;
  world: World;
  modules: WorldModule[];
  entries: Entry[];
  relations: EntryRelation[];
  wikiEntries?: WikiEntry[];
  wikiFragments?: WikiFragment[];
  calendarSystems?: CalendarSystem[];
  calendarRegimes?: CalendarRegime[];
  calendarHolidays?: CalendarHoliday[];
  eras?: WorldEra[];
  temporalIndexes?: WorldTemporalIndex[];
  maps?: WorldMap[];
  mapLayers?: MapLayer[];
  mapFeatures?: MapFeature[];
  mapAssets?: MapAssetSummary[];
  settingMaterials?: SettingMaterial[];
  writingContextPacks?: WritingContextPack[];
  treeNodes?: WorldTreeNode[];
};
