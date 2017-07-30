import { moduleFor, test } from 'ember-qunit';

moduleFor('service:gisty-ajax', 'Unit | Service | gisty ajax');

test('it has the host set correctly', function(assert) {
  assert.expect(1);

  const service = this.subject();

  assert.equal(
    service.get('host'),
    'https://gist.github.com'
  );
});
