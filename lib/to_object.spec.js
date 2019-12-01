import { expect } from 'chai';
import { to_object as sut } from './to_object';
import { generate } from '@developwithpassion/arrays_js';

describe('converting an arrray to an object', () => {
  let target = [];
  let result;

  describe('and only the target array is provided', () => {
    beforeEach(() => {
      target = generate(2, index => ({
        id: index + 1,
        name: `Name: ${index + 1}`
      }));
    });

    beforeEach(() => {
      result = sut(target);
    });

    it('builds an object with the id used as the key', () => {
      expect(result).to.eql({
        1: target[0],
        2: target[1]
      });
    });
  });

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
      expect(typeof result).to.eql('function');
    });

    it('function builds object according to mapper', () => {
      expect(final_result).to.eql({
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
      expect(result).to.eql({
        [target[0].name]: target[0],
        [target[1].name]: target[1]
      });
    });
  });
});
