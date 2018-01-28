import 'should';
import 'should-sinon';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Asset from './';

describe('Asset', () => {
  let asset;
  beforeEach(() => {
    asset = new Asset();
  });
  it('contains an asset section', () => {
    const generated = asset.build();

    generated.should.have.property('asset');
  });

  it('specifies a version', () => {
    const generated = asset.build();

    generated.asset.should.have.property('version', '2.0');
  });

  it('represents indexed entities at the top level', () => {
    const sceneStub = {
      build: indexer => {
        indexer.indexOf('plumbus', {});
        indexer.indexOf('schmeckel', {});
        indexer.indexOf('schmeckel', {});
      }
    };

    asset.addScene(sceneStub);

    const generated = asset.build();

    generated.should.have.property('plumbus');
    generated.should.have.property('schmeckel');
    generated.plumbus.length.should.equal(1);
    generated.schmeckel.length.should.equal(2);
  });

  describe('contains a list of scenes', () => {
    it('has no scenes property by default', () => {
      asset.build().should.not.have.property('scenes');
    });

    it('can have scenes added', () => {
      const sceneStub = {
        build: stub()
      };
      const builtScene = {};
      sceneStub.build.returns(builtScene);
      asset.addScene(sceneStub);

      const generated = asset.build();

      generated.should.have.property('scenes');
      sceneStub.build.should.be.calledOnce();
      generated.scenes.length.should.equal(1);
      generated.scenes[0].should.equal(builtScene);
    });
  });
});
