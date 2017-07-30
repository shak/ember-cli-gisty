
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('to-html-safe-string', 'helper:to-html-safe-string', {
  integration: true
});

test('it outputs an html safe string that can be output by the browser', function(assert) {
  // ensure the string is being rendered by the browser
  this.set('inputValue', '<div id="test"></div>');

  this.render(hbs`{{to-html-safe-string inputValue}}`);

  assert.equal(this.$('#test').length, 1);
});

