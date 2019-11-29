import { expect } from 'chai';
import sut from './miscellaneous';

describe('miscellaneous utilities', () => {
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
      expect(frozen).to.be.true;
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
        expect(ran).to.be.false;
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
        expect(ran).to.be.true;
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
        }).to.eql(result);
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
        }).to.eql(result);
      });
    });

    describe('when matchers are provided', () => {
      beforeEach(() => {
        result = sut.exclude_keys([key => true], target);
      });

      it('returns an object that does not include the any of keys that match the matchers', () => {
        expect({}).to.eql(result);
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
      expect(result).to.eql([1, 2, 3]);
    });
  });
});
