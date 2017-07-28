import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { getWithDefault } from '@ember/object';

import layout from '../templates/components/ember-gisty';
import jQuery from 'jquery';

/**
 * @static
 * @final
 * @public
 * @property GITHUB_GIST_HOST
 * @type String
 * @default https://gist.github.com
 */
export const GITHUB_GIST_HOST = 'https://gist.github.com';

export default Component.extend({
  layout,
  /**
   * User name for the gist, defaults to anonymous
   *
   * @property user
   * @type String
   * @default anonymous
   */
  user: 'anonymous',

  /**
   * Gist hash
   *
   * @property gist
   * @type String | null
   * @default null
   */
  gist: null,

  /**
   * Returns the fill json URL for retrieving the GIST
   *
   * @private
   * @property url
   * @type String | Boolean
   */
  url: computed('user', 'gist', {
    get() {
      const gist = this.get('gist');
      const user = this.get('user');

      if (typeOf(gist)) {
        return `${GITHUB_GIST_HOST}/${user}/${gist}.json`;
      }

      return false;
    }
  }),

  /**
   * Markup returned by Git for the requested gist
   *
   * @private
   * @property markup
   * @type String | null
   * @default null
   */
  markup: null,

  /**
   * Returns the html safe markup that can be rendered by the template
   *
   * @private
   * @property html
   * @type String.htmlSafe
   */
  html: computed('markup', {
    get() {
      return htmlSafe(this.get('markup.div'));
    }
  }),

  /**
   * Retrieves gist from Github
   *
   * @protected
   * @method didReceiveAttrs
   */
  didReceiveAttrs() {
    const url = this.get('url');

    if (url) {
      jQuery
        .ajax({
          url: url,
          dataType: 'jsonp'
        })
        .done(
          (data) => {
            // ensure gist has valid markup
            const markupDiv = getWithDefault(data || {}, 'div', false);
            if (markupDiv) {
              this.set('markup', data);
            }
          }
        )
        .fail(
          () => {
            this.set('error', true);
          }
        )
      ;
    }
  }
});
