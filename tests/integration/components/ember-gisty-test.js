import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import wait from 'ember-test-helpers/wait';

import RSVP from 'rsvp';

moduleForComponent('ember-gisty', 'Integration | Component | ember gisty', {
  integration: true,
  beforeEach() {
    this.register('service:gist-fetch', Service.extend());
    this.inject.service('gist-fetch', { as: 'gistFetchService' });
  }
});

test('it yields error as true if gist not provided', function(assert) {
  assert.expect(1);

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

test('it requests gist from the correct URL when user name is provided', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistFetchService.request', (url) => {
    assert.equal(
      url,
      `${user}/${gist}.json`
    );

    return new RSVP.Promise((resolve) => { resolve(); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`{{ember-gisty user=user gist=gist}}`);

  return wait();
});

test('it yields isLoading when request is being processed', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistFetchService.request', () => {
    return new RSVP.Promise(() => { }); // unresolved promise
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`
    {{#ember-gisty user=user gist=gist as |gisty|}}
      {{#if gisty.isLoading}}
        <p id="isLoading">Loading state</p>
      {{/if}}
    {{/ember-gisty}}
  `);

  assert.equal(
    this.$('#isLoading').length,
    1
  );
});
