import { each } from '@developwithpassion/arrays_js';
import curry from '@developwithpassion/curry_js';

export const nested_property_setter = curry((dotted_accessor, value, object) => {
  let current_parent = object;
  const attributes = dotted_accessor.split('.');
  const traversal_attributes = attributes.slice(0, attributes.length - 1);
  const last_attribute = attributes[attributes.length - 1];

  each(value => {
    current_parent = current_parent[value];
  }, traversal_attributes);

  current_parent[last_attribute] = value;

  return object;
});
