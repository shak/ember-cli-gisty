import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';
import { next } from '@ember/runloop';

import { GIST_BASE_URL } from 'ember-cli-gisty/components/ember-gisty';

module('Integration | Component | ember gisty', function(hooks) {
  setupRenderingTest(hooks);

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

    this.setProperties({
      gist,
      fetchGist: (url) => {
        assert.strictEqual(
          url,
          `${GIST_BASE_URL}/anonymous/${gist}.json`
        );

        return new RSVP.Promise((resolve) => {
          resolve();
        });
      }
    });

    await render(hbs`{{ember-gisty gist=gist fetchGist=fetchGist}}`);

    return settled();
  });

  test('it requests gist from the correct URL when user name is provided', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';

    assert.expect(1);

    this.setProperties({
      gist,
      user,
      fetchGist: (url) => {
        assert.strictEqual(
          url,
          `${GIST_BASE_URL}/${user}/${gist}.json`
        );

        return new RSVP.Promise((resolve) => {
          resolve();
        });
      }
    });

    await render(hbs`{{ember-gisty gist=gist user=user fetchGist=fetchGist}}`);

    return settled();
  });

  test('it sets the file query param when particular file is required', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';
    const user = 'shahrukhomar';
    const filename = 'test.js';

    assert.expect(1);

    this.setProperties({
      gist,
      user,
      filename,
      fetchGist: (url) => {
        assert.strictEqual(
          url,
          `${GIST_BASE_URL}/${user}/${gist}.json?file=${filename}`
        );

        return new RSVP.Promise((resolve) => {
          resolve();
        });
      }
    });

    await render(hbs`{{ember-gisty gist=gist user=user filename=filename fetchGist=fetchGist}}`);

    return settled();
  });

  test('it yields isLoading when request is being processed', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';

    this.setProperties({
      gist,
      fetchGist: () => {
        return new RSVP.Promise(() => {});
      }
    });

    await render(hbs`
      {{#ember-gisty gist=gist fetchGist=fetchGist as |gisty|}}
        {{#if gisty.isLoading}}
          <p id="isLoading">Loading state</p>
        {{/if}}
      {{/ember-gisty}}
    `);

    await assert.dom('#isLoading').exists({ count: 1 });

    return settled();
  });

  test('it yields error when request fails', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';

    this.setProperties({
      gist,
      fetchGist: () => {
        return new RSVP.Promise((resolve, reject) => {
          next(() => { reject(); });
        });
      }
    });

    await render(hbs`
      {{#ember-gisty gist=gist fetchGist=fetchGist as |gisty|}}
        {{#if gisty.isError}}
          <p id="error">error state</p>
        {{/if}}
      {{/ember-gisty}}
    `);

    assert.dom('#error').exists({ count: 1 });

    return settled();
  });

  test('it yields error when response does not have the div property', async function(assert) {
    assert.expect(1);

    const gist = '1234567789';

    this.setProperties({
      gist,
      fetchGist: () => {
        return new RSVP.Promise((resolve) => {
          resolve();
        });
      }
    });

    await render(hbs`
      {{#ember-gisty gist=gist fetchGist=fetchGist as |gisty|}}
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

    this.setProperties({
      gist,
      fetchGist: () => {
        return new RSVP.Promise((resolve) => {
          resolve({ div: '<div id="success">Success</div>' });
        });
      }
    });

    await render(hbs`{{ember-gisty fetchGist=fetchGist gist=gist}}`);

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

    this.setProperties({
      gist,
      fetchGist: () => {
        return new RSVP.Promise((resolve) => {
          resolve({ div: '<div></div>', stylesheet: 'stub' });
        });
      }
    });

    await render(hbs`{{ember-gisty fetchGist=fetchGist gist=gist}}`);
    return settled()
      .then(
        () => {
          const links = document.getElementsByTagName('link');
          for (let link in links) {
            if (links[link].getAttribute) {
              if (links[link].getAttribute('href') === 'stub') {
                assert.ok(true);
                // remove extra stylsheet
                document.head.removeChild(links[link]);
              }
            }
          }
        }
      )
    ;
  });

  test('it does not insert the stylesheet when there is no div set', async function(assert) {
    assert.expect(0);

    const gist = '1234567789';

    this.setProperties({
      gist,
      fetchGist: () => {
        return new RSVP.Promise((resolve) => {
          resolve({ stylesheet: 'stub' });
        });
      }
    });

    await render(hbs`{{ember-gisty fetchGist=fetchGist gist=gist}}`);

    return settled()
      .then(
        () => {
          const links = document.getElementsByTagName('link');
          for (let link in links) {
            if (links[link].getAttribute) {
              if (links[link].getAttribute('href') === 'stub') {
                assert.ok(false);
              }
            }
          }
        }
      );
  });
});
