import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import wait from 'ember-test-helpers/wait';

import RSVP from 'rsvp';

moduleForComponent('ember-gisty', 'Integration | Component | ember gisty', {
  integration: true,
  beforeEach() {
    this.register('service:gist-ajax', Service.extend());
    this.inject.service('gisty-ajax', { as: 'gistyAjaxService' });
  }
});

test('it yields error as true if gist not provided', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#ember-gisty as |gisty|}}
      {{#if gisty.isError}}
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

  this.set('gistyAjaxService.request', (url) => {
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

  this.set('gistyAjaxService.request', (url) => {
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

test('it sets the dataType to jsonp always', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', (url, options) => {
    assert.equal(
      options.dataType,
      'jsonp'
    );

    return new RSVP.Promise((resolve) => { resolve(); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`{{ember-gisty user=user gist=gist}}`);

  return wait();
});

test('it sets the file query param when particular file is required', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';
  const filename = 'test.js';

  this.set('gistyAjaxService.request', (url, options) => {
    assert.deepEqual(
      options.data,
      { file: filename }
    );

    return new RSVP.Promise((resolve) => { resolve(); });
  });

  this.set('gist', gist);
  this.set('user', user);
  this.set('filename', filename);

  this.render(hbs`{{ember-gisty user=user gist=gist filename=filename}}`);

  return wait();
});

test('it yields isLoading when request is being processed', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', () => {
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

test('it yields error when request fails', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', () => {
    return new RSVP.Promise((resolve, reject) => { reject(); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`
    {{#ember-gisty user=user gist=gist as |gisty|}}
      {{#if gisty.isError}}
        <p id="error">error state</p>
      {{/if}}
    {{/ember-gisty}}
  `);

  assert.equal(
    this.$('#error').length,
    1
  );
});

test('it yields error when response does not have the div property', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', () => {
    return new RSVP.Promise((resolve) => { resolve({}); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`
    {{#ember-gisty user=user gist=gist as |gisty|}}
      {{#if gisty.isError}}
        <p id="error">error state</p>
      {{/if}}
    {{/ember-gisty}}
  `);

  assert.equal(
    this.$('#error').length,
    1
  );
});

test('it renders the markup when returned successfully', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', () => {
    return new RSVP.Promise((resolve) => { resolve({ div: '<div id="success">Success</div>' }); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`{{ember-gisty user=user gist=gist}}`);

  return wait()
    .then(
      () => {
        assert.equal(
          this.$('#success').length,
          1
        );
      }
    )
  ;
});

test('it inserts the stylesheet when set with div', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', () => {
    return new RSVP.Promise((resolve) => { resolve({ div: '<div></div>', stylesheet: 'stub' }); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`{{ember-gisty user=user gist=gist}}`);

  return wait()
    .then(
      () => {
        assert.equal(
          this.$().parents('html').find('head').find('link[href="stub"]').length,
          1
        );
      }
    )
  ;
});

test('it does not insert the stylesheet when there is no div set', function(assert) {
  assert.expect(1);

  const gist = '1234567789';
  const user = 'shahrukhomar';

  this.set('gistyAjaxService.request', () => {
    return new RSVP.Promise((resolve) => { resolve({ stylesheet: 'stub' }); });
  });

  this.set('gist', gist);
  this.set('user', user);

  this.render(hbs`{{ember-gisty user=user gist=gist}}`);

  return wait()
    .then(
      () => {
        assert.equal(
          this.$('link[href="stub"]').length,
          0
        );
      }
    )
  ;
});
