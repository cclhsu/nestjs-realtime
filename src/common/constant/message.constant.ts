// Path: src/common/constant/message-types.constant.ts
// DESC: general message types
'use strict';

// enum MESSAGE_TYPES {
//   MESSAGE_TYPES_UNSPECIFIED = 0,
//   MESSAGE_TYPES_UNICAST = 1,
//   MESSAGE_TYPES_BROADCAST = 2,
//   MESSAGE_TYPES_ECHO = 3,
//   MESSAGE_TYPES_HEALTH = 4,
//   MESSAGE_TYPES_TASK = 5,
//   MESSAGE_TYPES_CONNECTION = 6,
//   MESSAGE_TYPES_SUBSCRIPTION = 7,
//   MESSAGE_TYPES_REGISTRATION = 8,
//   MESSAGE_TYPES_SYSTEM = 9,
//   MESSAGE_TYPES_EVENT = 10,
//   UNRECOGNIZED = -1,
// }

enum MESSAGE_TYPES {
  MESSAGE_TYPES_UNSPECIFIED = 'MESSAGE_TYPES_UNSPECIFIED', // Unspecified message type
  MESSAGE_TYPES_UNICAST = 'MESSAGE_TYPES_UNICAST', // Directed to a specific recipient
  MESSAGE_TYPES_BROADCAST = 'MESSAGE_TYPES_BROADCAST', // Sent to all connected clients
  MESSAGE_TYPES_ECHO = 'MESSAGE_TYPES_ECHO', // Sent to the sender
  MESSAGE_TYPES_HEALTH = 'MESSAGE_TYPES_HEALTH', // Health/status update (e.g., heartbeat)
  MESSAGE_TYPES_TASK = 'MESSAGE_TYPES_TASK', // Task to be executed by the recipient (e.g., execute, complete)
  MESSAGE_TYPES_CONNECTION = 'MESSAGE_TYPES_CONNECTION', // Connection to the server (e.g., connect, disconnect)
  MESSAGE_TYPES_SUBSCRIPTION = 'MESSAGE_TYPES_SUBSCRIPTION', // Subscription to receive messages from the server (e.g., subscribe, unsubscribe)
  MESSAGE_TYPES_REGISTRATION = 'MESSAGE_TYPES_REGISTRATION', // Registration with the server (e.g., register, unregister)
  MESSAGE_TYPES_SYSTEM = 'MESSAGE_TYPES_SYSTEM', // System message (e.g., error, warning)
  MESSAGE_TYPES_EVENT = 'MESSAGE_TYPES_EVENT', // Event message (e.g., webhook)
  UNRECOGNIZED = 'UNRECOGNIZED', // Unrecognized message type
}

// type MESSAGE_TYPE = keyof typeof MESSAGE_TYPES;
type MESSAGE_TYPE = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

// Create an object with enum keys as keys and enum values as values
const MESSAGE_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(MESSAGE_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const MESSAGE_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(MESSAGE_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const MESSAGE_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(MESSAGE_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const MESSAGE_TYPE_ARRAY: MESSAGE_TYPES[] = Object.values(MESSAGE_TYPES).filter(
  (value) => typeof value === 'number',
) as MESSAGE_TYPES[];

const MESSAGE_TYPE_KEYS: (keyof typeof MESSAGE_TYPES)[] = Object.keys(MESSAGE_TYPES).filter((key) =>
  isNaN(Number(key)),
) as (keyof typeof MESSAGE_TYPES)[];

const DEFAULT_MESSAGE_TYPE: MESSAGE_TYPES = MESSAGE_TYPES.MESSAGE_TYPES_UNSPECIFIED;

function isValidMESSAGE_TYPES(MESSAGE_TYPES: string): boolean {
  return MESSAGE_TYPE_ARRAY.includes(MESSAGE_TYPES as unknown as MESSAGE_TYPES);
}

function isValidMESSAGE_TYPESs(MESSAGE_TYPESs: string[]): boolean {
  return MESSAGE_TYPESs.every((MESSAGE_TYPES) => isValidMESSAGE_TYPES(MESSAGE_TYPES));
}

function convertStringToMESSAGE_TYPESs(input: string): MESSAGE_TYPES {
  const type: keyof typeof MESSAGE_TYPES = input.trim() as keyof typeof MESSAGE_TYPES;
  if (!MESSAGE_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid MESSAGE types: ' + input);
  }
  return MESSAGE_TYPES[type];
}

function convertStringToMESSAGE_TYPESsArray(input: string): MESSAGE_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const MESSAGE_TYPESs: MESSAGE_TYPES[] = typeNames.map((typeName: string) => {
    if (!MESSAGE_TYPE_KEYS.includes(typeName as keyof typeof MESSAGE_TYPES)) {
      throw new Error('Invalid MESSAGE types: ' + typeName);
    }
    return MESSAGE_TYPES[typeName as keyof typeof MESSAGE_TYPES];
  });
  return MESSAGE_TYPESs;
}

export {
  MESSAGE_TYPES,
  MESSAGE_TYPE,
  MESSAGE_TYPES_ENUM_KEY_TO_VALUE,
  MESSAGE_TYPES_ENUM_VALUE_TO_KEY,
  MESSAGE_TYPES_ENUM_KEY_TO_KEY,
  MESSAGE_TYPE_ARRAY,
  MESSAGE_TYPE_KEYS,
  DEFAULT_MESSAGE_TYPE,
  isValidMESSAGE_TYPES,
  isValidMESSAGE_TYPESs,
  convertStringToMESSAGE_TYPESs,
  convertStringToMESSAGE_TYPESsArray,
};
