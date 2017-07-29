import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

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
