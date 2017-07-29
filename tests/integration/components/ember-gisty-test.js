import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import wait from 'ember-test-helpers/wait';

import RSVP from 'rsvp';

const GITHUB_GIST_HOST = 'https://gist.github.com';

moduleForComponent('ember-gisty', 'Integration | Component | ember gisty', {
  integration: true,
  beforeEach() {
    this.register('service:gist-fetch', Service.extend());
    this.inject.service('gist-fetch', { as: 'gistFetchService' });
  }
});

test('it displays error if gist not provided', function(assert) {
  this.render(hbs`
    {{#ember-gisty as |gisty|}}
      {{#if gisty.error}}
        <p id="error">There was an error loading gist</p>
      {{/if}}
    {{/ember-gisty}}
  `);

  assert.equal(
    this.$('#error').length,
    1
  );
});

test('it requests gist from the correct URL when no user name is provided', function(assert) {
  assert.expect(1);

  const gist = '1234567789';

  this.set('gistFetchService.request', (url) => {
    assert.equal(
      url,
      `anonymous/${gist}.json`
    );

    return new RSVP.Promise((resolve) => { resolve(); });
  });

  this.set('gist', gist);

  this.render(hbs`{{ember-gisty gist=gist}}`);

  return wait();
});
