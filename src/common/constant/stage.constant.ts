// Path: src/common/constant/message-type.constant.ts
// DESC: general message types
// 'use strict';

// enum STAGE_TYPES {
//   STAGE_TYPES_UNSPECIFIED = 0,
//   STAGE_TYPES_DEVELOPMENT = 1,
//   STAGE_TYPES_STAGING = 2,
//   STAGE_TYPES_PRODUCTION = 3,
//   UNRECOGNIZED = -1,
// }

enum STAGE_TYPES {
  STAGE_TYPES_UNSPECIFIED = 'STAGE_TYPES_UNSPECIFIED',
  STAGE_TYPES_DEVELOPMENT = 'STAGE_TYPES_DEVELOPMENT', // Development environment
  STAGE_TYPES_STAGING = 'STAGE_TYPES_STAGING', // Staging environment
  STAGE_TYPES_PRODUCTION = 'STAGE_TYPES_PRODUCTION', // Production environment
  UNRECOGNIZED = 'UNRECOGNIZED',
}

// type STAGE_TYPE = keyof typeof STAGE_TYPES;
type STAGE_TYPE = (typeof STAGE_TYPES)[keyof typeof STAGE_TYPES];

// Create an object with enum keys as keys and enum values as values
const STAGE_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(STAGE_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const STAGE_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(STAGE_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const STAGE_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(STAGE_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const STAGE_TYPE_ARRAY: STAGE_TYPES[] = Object.values(STAGE_TYPES).filter(
  (value) => typeof value === 'number',
) as STAGE_TYPES[];

const STAGE_TYPE_KEYS: (keyof typeof STAGE_TYPES)[] = Object.keys(STAGE_TYPES).filter((key) =>
  isNaN(Number(key)),
) as (keyof typeof STAGE_TYPES)[];

const DEFAULT_STAGE_TYPE: STAGE_TYPES = STAGE_TYPES.STAGE_TYPES_UNSPECIFIED;

function isValidStageType(stageType: string): boolean {
  return STAGE_TYPE_ARRAY.includes(stageType as unknown as STAGE_TYPES);
}

function isValidStageTypes(stageTypes: string[]): boolean {
  return stageTypes.every((stageType) => isValidStageType(stageType));
}

function convertStringToStageTypes(input: string): STAGE_TYPES {
  const type: keyof typeof STAGE_TYPES = input.trim() as keyof typeof STAGE_TYPES;
  if (!STAGE_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid stage types: ' + input);
  }
  return STAGE_TYPES[type];
}

function convertStringToStageTypesArray(input: string): STAGE_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const stageTypes: STAGE_TYPES[] = typeNames.map((typeName: string) => {
    if (!STAGE_TYPE_KEYS.includes(typeName as keyof typeof STAGE_TYPES)) {
      throw new Error('Invalid stage types: ' + typeName);
    }
    return STAGE_TYPES[typeName as keyof typeof STAGE_TYPES];
  });
  return stageTypes;
}

export {
  STAGE_TYPES,
  STAGE_TYPE,
  STAGE_TYPES_ENUM_KEY_TO_VALUE,
  STAGE_TYPES_ENUM_VALUE_TO_KEY,
  STAGE_TYPES_ENUM_KEY_TO_KEY,
  STAGE_TYPE_ARRAY,
  STAGE_TYPE_KEYS,
  DEFAULT_STAGE_TYPE,
  isValidStageType,
  isValidStageTypes,
  convertStringToStageTypes,
  convertStringToStageTypesArray,
};
