import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

import RSVP from 'rsvp';

module('Integration | Component | ember gisty', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:gist-ajax', Service.extend());
    this.gistyAjaxService = this.owner.lookup('service:gisty-ajax');
  });

  test('it yields error as true if gist not provided', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#ember-gisty as |gisty|}}
        {{#if gisty.isError}}
          <p id="error">There was an error loading gist</p>
        {{/if}}
      {{/ember-gisty}}
    `);

    assert.dom('#error').exists({ count: 1 });
  });

  test('it requests gist from the correct URL when no user name is provided', async function(assert) {
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

    await render(hbs`{{ember-gisty gist=gist}}`);

    return settled();
  });

  test('it requests gist from the correct URL when user name is provided', async function(assert) {
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

    await render(hbs`{{ember-gisty user=user gist=gist}}`);

    return settled();
  });

  test('it sets the dataType to jsonp always', async function(assert) {
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

    await render(hbs`{{ember-gisty user=user gist=gist}}`);

    return settled();
  });

  test('it sets the file query param when particular file is required', async function(assert) {
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

    await render(hbs`{{ember-gisty user=user gist=gist filename=filename}}`);

    return settled();
  });

  test('it yields isLoading when request is being processed', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    this.set('gistyAjaxService.request', () => {
      return new RSVP.Promise(() => { }); // unresolved promise
    });

    this.set('gist', gist);
    this.set('user', user);

    await render(hbs`
      {{#ember-gisty user=user gist=gist as |gisty|}}
        {{#if gisty.isLoading}}
          <p id="isLoading">Loading state</p>
        {{/if}}
      {{/ember-gisty}}
    `);

    assert.dom('#isLoading').exists({ count: 1 });
  });

  test('it yields error when request fails', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    this.set('gistyAjaxService.request', () => {
      return new RSVP.Promise((resolve, reject) => { reject(); });
    });

    this.set('gist', gist);
    this.set('user', user);

    await render(hbs`
      {{#ember-gisty user=user gist=gist as |gisty|}}
        {{#if gisty.isError}}
          <p id="error">error state</p>
        {{/if}}
      {{/ember-gisty}}
    `);

    assert.dom('#error').exists({ count: 1 });
  });

  test('it yields error when response does not have the div property', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    this.set('gistyAjaxService.request', () => {
      return new RSVP.Promise((resolve) => { resolve({}); });
    });

    this.set('gist', gist);
    this.set('user', user);

    await render(hbs`
      {{#ember-gisty user=user gist=gist as |gisty|}}
        {{#if gisty.isError}}
          <p id="error">error state</p>
        {{/if}}
      {{/ember-gisty}}
    `);

    assert.dom('#error').exists({ count: 1 });
  });

  test('it renders the markup when returned successfully', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    this.set('gistyAjaxService.request', () => {
      return new RSVP.Promise((resolve) => { resolve({ div: '<div id="success">Success</div>' }); });
    });

    this.set('gist', gist);
    this.set('user', user);

    await render(hbs`{{ember-gisty user=user gist=gist}}`);

    return settled()
      .then(
        () => {
          assert.dom('#success').exists({ count: 1 });
        }
      );
  });

  test('it inserts the stylesheet when set with div', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    this.set('gistyAjaxService.request', () => {
      return new RSVP.Promise((resolve) => { resolve({ div: '<div></div>', stylesheet: 'stub' }); });
    });

    this.set('gist', gist);
    this.set('user', user);

    await render(hbs`{{ember-gisty user=user gist=gist}}`);

    return settled()
      .then(
        () => {
          assert.equal(
            this.$().parents('html').find('head').find('link[href="stub"]').length,
            1
          );
        }
      );
  });

  test('it does not insert the stylesheet when there is no div set', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    this.set('gistyAjaxService.request', () => {
      return new RSVP.Promise((resolve) => { resolve({ stylesheet: 'stub' }); });
    });

    this.set('gist', gist);
    this.set('user', user);

    await render(hbs`{{ember-gisty user=user gist=gist}}`);

    return settled()
      .then(
        () => {
          assert.dom('link[href="stub"]').doesNotExist();
        }
      );
  });
});
