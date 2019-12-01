import { reduce } from '@developwithpassion/arrays_js';
import curry from '@developwithpassion/curry_js';

export const default_key_mapper = ({ id }) => id;

export const to_object = curry((key_mapper, data) =>
  reduce(
    {},
    (acc, cur) => {
      acc[key_mapper(cur)] = cur;
      return acc;
    },
    data
  )
);
