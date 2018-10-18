import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | gisty ajax', function(hooks) {
  setupTest(hooks);

  test('it has the host set correctly', function(assert) {
    assert.expect(1);

    const service = this.owner.lookup('service:gisty-ajax');

    assert.equal(
      service.get('host'),
      'https://gist.github.com'
    );
  });
});
