import { default_key_mapper, to_object as sut } from './to_object';
import { generate } from '@developwithpassion/arrays_js';

describe('default key mapper', () => {
  let target;
  let result;

  beforeEach(() => {
    target = { id: 42 };
  });

  beforeEach(() => {
    result = default_key_mapper(target);
  });

  it('returns the id of the target', () => {
    expect(result).toEqual(target.id);
  });
});

describe('converting an arrray to an object', () => {
  let target = [];
  let result;

  describe('and only the key mapper is provided', () => {
    let final_result;

    beforeEach(() => {
      target = generate(2, index => ({
        id: index + 1,
        name: `Name: ${index + 1}`
      }));
    });

    beforeEach(() => {
      result = sut(({ name }) => name);
      final_result = result(target);
    });

    it('returns a function that is waiting for the array argument', () => {
      expect(typeof result).toEqual('function');
    });

    it('function builds object according to mapper', () => {
      expect(final_result).toEqual({
        [target[0].name]: target[0],
        [target[1].name]: target[1]
      });
    });
  });

  describe('and both the key mapper and target are provided', () => {
    beforeEach(() => {
      target = generate(2, index => ({
        id: index + 1,
        name: `Name: ${index + 1}`
      }));
    });

    beforeEach(() => {
      result = sut(({ name }) => name, target);
    });

    it('builds object according to mapper', () => {
      expect(result).toEqual({
        [target[0].name]: target[0],
        [target[1].name]: target[1]
      });
    });
  });
});
