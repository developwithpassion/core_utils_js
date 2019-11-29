import each_property_pair from '@developwithpassion/simple_object_iterator_js';
import { any, map, reduce } from '@developwithpassion/arrays_js';
import curry from '@developwithpassion/curry_js';

export const freeze = Object.freeze;

export const prevent_modifications = the_target => {
  freeze(the_target);
  Object.preventExtensions(the_target);
  return the_target;
};

export const unless = (condition, block) => {
  if (condition) return;
  block();
};

export const create_immutable_builder = builder => (...args) => {
  const instance = builder.apply(null, args);
  prevent_modifications(instance);
  return instance;
};

export const exclude_keys = curry((keys_and_key_specs, target) => {
  const normalized_specs = map(
    spec_or_key => (typeof spec_or_key === 'string' ? value => value === spec_or_key : spec_or_key),
    keys_and_key_specs
  );

  const result = {};

  each_property_pair(target, (key, value) => {
    if (!any(spec => spec(key), normalized_specs, target)) result[key] = value;
  });

  return result;
});

export const create_delegator_for_missing_methods = (initial, missing_target) =>
  new Proxy(initial, {
    get(object, property) {
      let actual_target = Reflect.has(object, property) ? object : missing_target;
      return Reflect.get(actual_target, property);
    }
  });

export const values = target =>
  reduce(
    [],
    (acc, key) => {
      acc.push(target[key]);
      return acc;
    },
    Object.keys(target)
  );

export default {
  freeze,
  values,
  prevent_modifications,
  unless,
  create_immutable_builder,
  create_delegator_for_missing_methods,
  exclude_keys
};
