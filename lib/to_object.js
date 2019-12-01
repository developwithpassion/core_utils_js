import { reduce } from '@developwithpassion/arrays_js';
import curry from '@developwithpassion/curry_js';

const default_key_mapper = data => data.id;

const core_to_object = curry((key_mapper, data) =>
  reduce(
    {},
    (acc, cur) => {
      acc[key_mapper(cur)] = cur;
      return acc;
    },
    data
  )
);

export const to_object = (key_mapper_or_data, ...rest) => {
  if (Array.isArray(key_mapper_or_data)) return core_to_object(default_key_mapper, key_mapper_or_data);
  return core_to_object(key_mapper_or_data, ...rest);
};
