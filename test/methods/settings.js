const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const SDK = require('../../remote');

describe('Settings', function() {
  let client;

  beforeEach(function() {
    client = new SDK({
      url: 'https://demo-api.getdirectus.com'
    });

    const responseJSON = {
      data: {
        data: {}
      }
    };

    sinon.stub(client, 'get').resolves(responseJSON);
    sinon.stub(client, 'put').resolves(responseJSON);
    sinon.stub(client, 'patch').resolves(responseJSON);
    sinon.stub(client, 'post').resolves(responseJSON);
    sinon.stub(client, 'delete').resolves(responseJSON);
  });

  afterEach(function() {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe('#getCollections()', function() {
    it('Defaults to an empty object if no parameters are passed', function() {
      client.getSettings();
      expect(client.get).to.have.been.calledWith('/settings', {});
    });

    it('Errors if parameter `params` is of a wrong type', function() {
      expect(() => client.getSettings('params')).to.throw();
    });

    it('Calls get() for the right endpoint', function() {
      client.getSettings({ limit: 50 });
      expect(client.get).to.have.been.calledWith('/settings', { limit: 50 });
    });
  });
});
