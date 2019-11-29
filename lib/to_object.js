import { reduce } from '@developwithpassion/arrays_js';

const default_key_mapper = data => data.id;

export const to_object = (data = [], key_mapper = default_key_mapper) =>
  reduce(
    {},
    (acc, cur) => {
      acc[key_mapper(cur)] = cur;
      return acc;
    },
    data
  );
