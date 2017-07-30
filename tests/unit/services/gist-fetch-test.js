import { moduleFor, test } from 'ember-qunit';

moduleFor('service:gist-fetch', 'Unit | Service | gist fetch');

test('it has the host set correctly', function(assert) {
  assert.expect(1);

  const service = this.subject();

  assert.equal(
    service.get('host'),
    'https://gist.github.com'
  );
});
