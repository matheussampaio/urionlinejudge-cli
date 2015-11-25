import { expect } from 'chai';

import BrowserWrapper from '../src/BrowserWrapper';

/** @test {BrowserWrapper} */
describe('BrowserWrapper', () => {
  let browserWrapper;

  before(() => {
    browserWrapper = new BrowserWrapper();
  });

    /** @test {BrowserWrapper#start} */
  it('should return a promise when start is called', () => {
    expect(browserWrapper.start()).to.be.an.instanceof(Promise);
  });

    /** @test {BrowserWrapper#actions} */
  describe('#actions', () => {
    it('should contains an actions array', () => {
      expect(browserWrapper.actions).to.be.a('array');
    });

    it('should start with empty actions', () => {
      expect(browserWrapper.actions).to.be.empty;
    });

    it('should have length equal to 1 after add one element', () => {
      expect(browserWrapper.actions).to.be.empty;

      browserWrapper.add({id: 'test'});

      expect(browserWrapper.actions).to.have.length(1);
    });
  });

  describe('#browser', () => {
    it('should contains a browser', () => {
      expect(browserWrapper.browser).to.exist;
    });
  });
});
