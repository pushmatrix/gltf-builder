import { describe, it, beforeEach } from 'mocha';

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
    accessor
      .name()
      .componentType()
      .type()
      .should.equal(accessor);
  });

  it('can have a component type', () => {
    accessor.componentType(5120);

    accessor.build().should.deepEqual({ componentType: 5120 });
  });

  it('can have a data type', () => {
    accessor.type('SCALAR');

    accessor.build().should.deepEqual({ type: 'SCALAR' });
  });

  it.skip('can have a bufferView', () => {
    accessor.bufferView();

    accessor.build().should.deepEqual({});
  });
});
