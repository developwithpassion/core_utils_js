import { reduce } from '@developwithpassion/arrays_js';
import curry from '@developwithpassion/curry_js';

export const nested_property_accessor = curry((dotted_accessor, object) =>
  reduce(
    object,
    (current_target, next_attribute) => current_target[next_attribute],
    dotted_accessor.split('.')
  )
);
