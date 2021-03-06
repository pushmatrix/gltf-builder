import NamedComponent from '../named-component';
import pickBuiltProperties from '../../util/pick-built-properties';

export default class Mesh extends NamedComponent {
  constructor() {
    super({ indexName: 'meshes', defaultProperties: { primitives: [] } });
  }

  /**
   * Adds a primitive to the mesh
   *
   * @param {Primitive} primitive
   * @returns {Mesh} this
   * @memberof Mesh
   */
  addPrimitive(primitive) {
    this.properties.primitives.push(primitive);

    return this;
  }

  build(indexer) {
    const { primitives, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      primitives: primitives.map(primitive => primitive.build(indexer))
    });
  }
}
