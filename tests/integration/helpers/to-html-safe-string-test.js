
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('to-html-safe-string', 'helper:to-html-safe-string', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{to-html-safe-string inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

