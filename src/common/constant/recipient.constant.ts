// Path: src/common/constant/recipient-types.constant.ts
// DESC: general recipient types
'use strict';

// enum RECIPIENT_TYPES {
//   RECIPIENT_TYPES_UNSPECIFIED = 0,
//   RECIPIENT_TYPES_SERVER = 1,
//   RECIPIENT_TYPES_CLIENT = 2,
//   RECIPIENT_TYPES_INDIVIDUAL = 3,
//   RECIPIENT_TYPES_GROUP = 4,
//   UNRECOGNIZED = -1,
// }

enum RECIPIENT_TYPES {
  RECIPIENT_TYPES_UNSPECIFIED = 'RECIPIENT_TYPES_UNSPECIFIED',
  RECIPIENT_TYPES_SERVER = 'RECIPIENT_TYPES_SERVER', // Server (e.g., generic-client-server)
  RECIPIENT_TYPES_CLIENT = 'RECIPIENT_TYPES_CLIENT', // Client (e.g., generic-client)
  RECIPIENT_TYPES_INDIVIDUAL = 'RECIPIENT_TYPES_INDIVIDUAL', // Individual (e.g., user)
  RECIPIENT_TYPES_GROUP = 'RECIPIENT_TYPES_GROUP', // Group (e.g., team)
  UNRECOGNIZED = 'UNRECOGNIZED',
}

// type RECIPIENT_TYPE = keyof typeof RECIPIENT_TYPES;
type RECIPIENT_TYPE = (typeof RECIPIENT_TYPES)[keyof typeof RECIPIENT_TYPES];

// Create an object with enum keys as keys and enum values as values
const RECIPIENT_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(RECIPIENT_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const RECIPIENT_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(RECIPIENT_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const RECIPIENT_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(RECIPIENT_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const RECIPIENT_TYPE_ARRAY: RECIPIENT_TYPES[] = Object.values(RECIPIENT_TYPES).filter(
  (value) => typeof value === 'number',
) as RECIPIENT_TYPES[];

const RECIPIENT_TYPE_KEYS: (keyof typeof RECIPIENT_TYPES)[] = Object.keys(RECIPIENT_TYPES).filter(
  (key) => isNaN(Number(key)),
) as (keyof typeof RECIPIENT_TYPES)[];

const DEFAULT_RECIPIENT_TYPE: RECIPIENT_TYPES = RECIPIENT_TYPES.RECIPIENT_TYPES_UNSPECIFIED;

function isValidRecipientType(RECIPIENT_TYPES: string): boolean {
  return RECIPIENT_TYPE_ARRAY.includes(RECIPIENT_TYPES as unknown as RECIPIENT_TYPES);
}

function isValidRecipientTypes(RecipientTypes: string[]): boolean {
  return RecipientTypes.every((RECIPIENT_TYPES) => isValidRecipientType(RECIPIENT_TYPES));
}

function convertStringToRecipientTypes(input: string): RECIPIENT_TYPES {
  const type: keyof typeof RECIPIENT_TYPES = input.trim() as keyof typeof RECIPIENT_TYPES;
  if (!RECIPIENT_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid RECIPIENT types: ' + input);
  }
  return RECIPIENT_TYPES[type];
}

function convertStringToRecipientTypesArray(input: string): RECIPIENT_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const RecipientTypes: RECIPIENT_TYPES[] = typeNames.map((typeName: string) => {
    if (!RECIPIENT_TYPE_KEYS.includes(typeName as keyof typeof RECIPIENT_TYPES)) {
      throw new Error('Invalid RECIPIENT types: ' + typeName);
    }
    return RECIPIENT_TYPES[typeName as keyof typeof RECIPIENT_TYPES];
  });
  return RecipientTypes;
}

export {
  RECIPIENT_TYPES,
  RECIPIENT_TYPE,
  RECIPIENT_TYPES_ENUM_KEY_TO_VALUE,
  RECIPIENT_TYPES_ENUM_VALUE_TO_KEY,
  RECIPIENT_TYPES_ENUM_KEY_TO_KEY,
  RECIPIENT_TYPE_ARRAY,
  RECIPIENT_TYPE_KEYS,
  DEFAULT_RECIPIENT_TYPE,
  isValidRecipientType,
  isValidRecipientTypes,
  convertStringToRecipientTypes,
  convertStringToRecipientTypesArray,
};
