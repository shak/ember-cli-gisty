import Ember from 'ember';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';

export function toHtmlSafeString([query]) {
  if (typeOf(query) === 'string') {
    return htmlSafe(query);
  }

  return '';
}

export default Ember.Helper.helper(toHtmlSafeString);
