import sut from './miscellaneous';

describe('miscellaneous utilities', () => {
  describe('preventing modifications', () => {
    let target;
    let result;
    let frozen = false;

    beforeEach(() => {
      target = {
        frozen: true
      };
    });

    beforeEach(() => {
      result = sut.prevent_modifications(target);
    });

    it('disallows changes to attributes', () => {
      try {
        result.frozen = false;
      } catch (e) {
        frozen = true;
      }
      expect(frozen).toBeTruthy();
    });

    it('prevents extensions to the target', () => {
      try {
        Object.defineProperty(result, 'newProp', {
          get: function result__getter() {
            return 1;
          }
        });
      } catch (e) {
        frozen = true;
      }

      expect(frozen).toBeTruthy();
    });
  });

  describe('creating an immutable builder', () => {
    let target;
    let result;
    let frozen = false;

    beforeEach(() => {
      target = {
        frozen: true
      };
    });

    beforeEach(() => {
      result = sut.create_immutable_builder(() => target)();
    });

    it('returns a function that returns objects that cant be changed', () => {
      try {
        result.frozen = false;
      } catch (e) {
        frozen = true;
      }
      expect(frozen).toBeTruthy();
    });
  });

  describe('freezing an object', () => {
    let target;
    let result;
    let frozen = false;

    beforeEach(() => {
      target = {
        frozen: true
      };
    });

    beforeEach(() => {
      result = sut.freeze(target);
    });

    beforeEach(() => {
      try {
        result.frozen = false;
      } catch (e) {
        frozen = true;
      }
    });

    it('delegates freezings to the Object utility', () => {
      expect(frozen).toBeTruthy();
    });
  });

  describe('unless blocks', () => {
    describe('when the condition is true', () => {
      let ran = false;

      beforeEach(() => {
        sut.unless(true, () => {
          ran = true;
        });
      });

      it('does not run the block', () => {
        expect(ran).toBeFalsy;
      });
    });

    describe('when the condition is true', () => {
      let ran = false;

      beforeEach(() => {
        sut.unless(false, () => {
          ran = true;
        });
      });

      it('runs the block', () => {
        expect(ran).toBeTruthy();
      });
    });
  });

  describe('excluding keys from a target object', () => {
    let target;
    let result;

    beforeEach(() => {
      target = {
        a: 1,
        b: 2,
        b_some_name: 3,
        c_ending_index: 4,
        d_ending_index: 5
      };
    });

    describe('when only key names are provided', () => {
      beforeEach(() => {
        result = sut.exclude_keys(['a', 'b'], target);
      });

      it('returns an object that does not include the excluded key names', () => {
        expect({
          b_some_name: 3,
          c_ending_index: 4,
          d_ending_index: 5
        }).toEqual(result);
      });
    });

    describe('when key names and matchers are provided', () => {
      beforeEach(() => {
        result = sut.exclude_keys(['a', key => key.indexOf('_index') >= 0], target);
      });

      it('returns an object that does not include the any of the matchers or keys', () => {
        expect({
          b: 2,
          b_some_name: 3
        }).toEqual(result);
      });
    });

    describe('when matchers are provided', () => {
      beforeEach(() => {
        result = sut.exclude_keys([key => true], target);
      });

      it('returns an object that does not include the any of keys that match the matchers', () => {
        expect({}).toEqual(result);
      });
    });
  });

  describe('getting the values of an object', () => {
    let result;

    beforeEach(() => {
      result = sut.values({
        a: 1,
        b: 2,
        c: 3
      });
    });

    it('returns all of the values from the object', () => {
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('creating a delegator for missing methods', () => {
    let original;
    let the_target;
    let result;

    beforeEach(() => {
      original = {
        add: (first, second) => first + second,
        name: 'Doe'
      };

      the_target = {
        subtract: (first, second) => first - second
      };
    });

    beforeEach(() => {
      result = sut.create_delegator_for_missing_methods(the_target, original);
    });

    it('returns a proxy that dispatches missing invocations to the original target', () => {
      expect(result.name).toEqual('Doe');
      expect(result.subtract(5, 3)).toEqual(2);
    });
  });
});
