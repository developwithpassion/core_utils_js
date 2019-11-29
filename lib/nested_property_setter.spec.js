import { expect } from 'chai';
import { nested_property_setter as sut } from './nested_property_setter';

describe('setting value of a nested attribute', function() {
  let target = {};
  let result;
  describe('and the attribute exists', function() {
    beforeEach(function() {
      target = {
        parent: {
          children: {
            johndoe: {
              age: 23
            }
          }
        }
      };
    });

    beforeEach(function() {
      result = sut('parent.children.johndoe.age', 42, target);
    });

    it('set the last attribute in the chain', function() {
      expect(target.parent.children.johndoe.age).to.eql(42);
    });

    it('returns initial target', function() {
      expect(result).to.equal(target);
    });
  });
});