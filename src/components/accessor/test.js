import 'should';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import chainMethods from '../../test-util/chain-methods';

import Accessor from './index';

describe('Accessor', () => {
  let accessor;

  beforeEach(() => {
    accessor = new Accessor();
  });

  it('has no properties defined by default', () => {
    accessor.build().should.deepEqual({});
  });

  it('can have a name', () => {
    accessor.name('accessor name');

    accessor.build().should.have.property('name', 'accessor name');
  });

  it('can have its setters chained', () => {
    chainMethods(accessor).should.equal(accessor);
  });

  it('can have a component type', () => {
    accessor.componentType(5120);

    accessor.build().should.deepEqual({ componentType: 5120 });
  });

  it('can have a data type', () => {
    accessor.type('SCALAR');

    accessor.build().should.deepEqual({ type: 'SCALAR' });
  });

  it('can have a min value', () => {
    accessor.min([1, 2, 3]);

    accessor.build().should.deepEqual({ min: [1, 2, 3] });
  });

  it('can have a max value', () => {
    accessor.max([1, 2, 3]);

    accessor.build().should.deepEqual({ max: [1, 2, 3] });
  });

  it.skip('matches the min value precision to the data type', () => {});

  it.skip('matches the max value precision to the data type', () => {});

  it('can have a bufferView', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const bufferViewStub = {
      build: stub().returns({})
    };

    accessor.bufferView(bufferViewStub);

    accessor.build(indexStub).should.deepEqual({ bufferView: 42 });
  });

  it('can have a count', () => {
    accessor.count(42);

    accessor.build().should.deepEqual({ count: 42 });
  });
});
