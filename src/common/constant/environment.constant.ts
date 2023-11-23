// Path: src/common/constant/message-type.constant.ts
// DESC: general message types
// 'use strict';

// enum ENVIRONMENT_TYPES {
//   ENVIRONMENT_TYPES_UNSPECIFIED = 0,
//   ENVIRONMENT_TYPES_LOCAL = 1,
//   ENVIRONMENT_TYPES_REMOTE = 2,
//   ENVIRONMENT_TYPES_DOCKER = 3,
//   ENVIRONMENT_TYPES_KUBERNETES = 4,
//   UNRECOGNIZED = -1,
// }

enum ENVIRONMENT_TYPES {
  ENVIRONMENT_TYPES_UNSPECIFIED = 'ENVIRONMENT_TYPES_UNSPECIFIED',
  ENVIRONMENT_TYPES_LOCAL = 'ENVIRONMENT_TYPES_LOCAL', // Local environment
  ENVIRONMENT_TYPES_REMOTE = 'ENVIRONMENT_TYPES_REMOTE', // Remote environment
  ENVIRONMENT_TYPES_DOCKER = 'ENVIRONMENT_TYPES_DOCKER', // Docker environment
  ENVIRONMENT_TYPES_KUBERNETES = 'ENVIRONMENT_TYPES_KUBERNETES', // Kubernetes environment
  UNRECOGNIZED = 'UNRECOGNIZED',
}

// type ENVIRONMENT_TYPE = keyof typeof ENVIRONMENT_TYPES;
type ENVIRONMENT_TYPE = (typeof ENVIRONMENT_TYPES)[keyof typeof ENVIRONMENT_TYPES];

// Create an object with enum keys as keys and enum values as values
const ENVIRONMENT_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(ENVIRONMENT_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const ENVIRONMENT_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(ENVIRONMENT_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const ENVIRONMENT_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(ENVIRONMENT_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const ENVIRONMENT_TYPE_ARRAY: ENVIRONMENT_TYPES[] = Object.values(ENVIRONMENT_TYPES).filter(
  (value) => typeof value === 'number',
) as ENVIRONMENT_TYPES[];

const ENVIRONMENT_TYPE_KEYS: (keyof typeof ENVIRONMENT_TYPES)[] = Object.keys(
  ENVIRONMENT_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof ENVIRONMENT_TYPES)[];

const DEFAULT_ENVIRONMENT_TYPE: ENVIRONMENT_TYPES = ENVIRONMENT_TYPES.ENVIRONMENT_TYPES_UNSPECIFIED;

function isValidEnvironmentType(environmentType: string): boolean {
  return ENVIRONMENT_TYPE_ARRAY.includes(environmentType as unknown as ENVIRONMENT_TYPES);
}

function isValidEnvironmentTypes(environmentTypes: string[]): boolean {
  return environmentTypes.every((environmentType) => isValidEnvironmentType(environmentType));
}

function convertStringToEnvironmentTypes(input: string): ENVIRONMENT_TYPES {
  const type: keyof typeof ENVIRONMENT_TYPES = input.trim() as keyof typeof ENVIRONMENT_TYPES;
  if (!ENVIRONMENT_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid environment types: ' + input);
  }
  return ENVIRONMENT_TYPES[type];
}

function convertStringToEnvironmentTypesArray(input: string): ENVIRONMENT_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const environmentTypes: ENVIRONMENT_TYPES[] = typeNames.map((typeName: string) => {
    if (!ENVIRONMENT_TYPE_KEYS.includes(typeName as keyof typeof ENVIRONMENT_TYPES)) {
      throw new Error('Invalid environment types: ' + typeName);
    }
    return ENVIRONMENT_TYPES[typeName as keyof typeof ENVIRONMENT_TYPES];
  });
  return environmentTypes;
}

export {
  ENVIRONMENT_TYPES,
  ENVIRONMENT_TYPE,
  ENVIRONMENT_TYPES_ENUM_KEY_TO_VALUE,
  ENVIRONMENT_TYPES_ENUM_VALUE_TO_KEY,
  ENVIRONMENT_TYPES_ENUM_KEY_TO_KEY,
  ENVIRONMENT_TYPE_ARRAY,
  ENVIRONMENT_TYPE_KEYS,
  DEFAULT_ENVIRONMENT_TYPE,
  isValidEnvironmentType,
  isValidEnvironmentTypes,
  convertStringToEnvironmentTypes,
  convertStringToEnvironmentTypesArray,
};
