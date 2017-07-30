import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { inject } from '@ember/service';
import { getWithDefault } from '@ember/object';
import jQuery from 'jquery';

import layout from '../templates/components/ember-gisty';

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
   * Gist filename to retrieve
   *
   * @property filename
   * @type String | null
   * @default null
   */
  filename: null,

  /**
   * Ajax service
   *
   * @private
   * @property gistyAjax
   * @type Ember.Service
   */
  gistyAjax: inject(),

  /**
   * Returns the fill json gistURL for retrieving the GIST
   *
   * @private
   * @property gistURL
   * @type String | Boolean
   */
  gistURL: computed('user', 'gist', {
    get() {
      const gist = this.get('gist');
      const user = this.get('user');

      if (typeOf(gist) === 'string') {
        return `${user}/${gist}.json`;
      }

      return false;
    }
  }),

  /**
   * Retrieves gist from Github on `didReceiveAttrs` event
   *
   * @protected
   * @method didReceiveAttrs
   */
  didReceiveAttrs() {
    this.send('fetch');
  },

  /**
   * Appends markup to the component
   *
   * @private
   * @method processMarkup
   *
   * @return Boolean
   */
  processMarkup(response) {
    const responseDiv = getWithDefault(response || {}, 'div', false);

    if (responseDiv) {
      const $responseDiv = jQuery(responseDiv);
      this.$().append($responseDiv);

      return true;
    }

    this.set('error', true);

    return false;
  },

  actions: {
    /**
     * Fetches the gist from the web
     *
     * @method action.fetch
     */
    fetch() {
      const gistURL = this.get('gistURL');
      // reset state
      this.setProperties({
        error: false,
        isLoading: true
      });

      if (gistURL) {
        const request = { dataType: 'jsonp' };
        const filename = this.get('filename');

        if (filename) {
          request.data = { file: filename };
        }

        return this
          .get('gistyAjax')
          .request(gistURL, request)
          .then(
            (response) => {
              if (this.processMarkup(response)) {
                // process stylesheet
              }
            },
            () => {
              this.set('error', true);
            }
          )
          .finally(
            () => {
              this.set('isLoading', false);
            }
          )
        ;
      }
      this.set('error', true);
    }
  }
});
