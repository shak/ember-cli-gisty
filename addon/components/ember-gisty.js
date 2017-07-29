import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { typeOf } from '@ember/utils';
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
   * payload returned by Git for the requested gist
   *
   * @private
   * @property payload
   * @type String | null
   * @default null
   */
  payload: null,

  /**
   * Returns the html from the github gist payload
   *
   * @private
   * @property gistMarkup
   * @type String
   */
  gistMarkup: alias('payload.div'),


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
            // ensure gist has valid payload
            const payloadDiv = getWithDefault(data || {}, 'div', false);
            if (payloadDiv) {
              this.set('payload', data);
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
