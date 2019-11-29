import { expect } from 'chai';
import { nested_property_accessor } from './nested_property_accessor';

describe('nested property accessor', () => {
  describe('accessing a nested attribute', function() {
    let root;
    let result;
    describe('and the attribute exists', function() {
      beforeEach(function() {
        root = {
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
        result = nested_property_accessor('parent.children.johndoe.age', root);
      });

      it('returns the last attribute in the chain', function() {
        expect(result).to.eql(23);
      });
    });
  });

  describe('accessing a non nested attribute', function() {
    let root;
    let result;
    describe('and the attribute exists', function() {
      beforeEach(function() {
        root = {
          parent: 2
        };
      });

      beforeEach(function() {
        result = nested_property_accessor('parent', root);
      });

      it('returns the last attribute in the chain', function() {
        expect(result).to.eql(2);
      });
    });
  });

  describe('accessing a nested indexed attribute', () => {
    let root;
    let result;

    beforeEach(() => {
      root = {
        child: {
          items: [
            {
              name: 'Indexed item'
            }
          ]
        }
      };
    });

    beforeEach(() => {
      result = nested_property_accessor('child.items.0', root);
    });

    it('returns the element at the index', () => {
      expect(result).to.eql(root.child.items[0]);
    });
  });
});
