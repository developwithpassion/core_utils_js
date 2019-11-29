import curry from '@developwithpassion/curry_js';
import { nested_property_accessor } from './nested_property_accessor';

export const nested_property_setter = curry((dotted_accessor, value, object) => {
  const attributes = dotted_accessor.split('.');
  const traversal_attributes = attributes.slice(0, attributes.length - 1);
  const target_path = traversal_attributes.join('.');
  const last_attribute = attributes[attributes.length - 1];
  const target = nested_property_accessor(target_path, object);

  target[last_attribute] = value;

  return object;
});
