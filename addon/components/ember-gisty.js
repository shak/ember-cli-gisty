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
   * Ajax service
   *
   * @private
   * @property gistFetch
   * @type Ember.Service
   */
  gistFetch: inject(),

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
      const $responceDiv = jQuery(responseDiv);
      this.$().append($responceDiv);

      return true;
    }

    this.set('error', true);
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
        return this
          .get('gistFetch')
          .request(gistURL, { dataType: 'jsonp' })
          .then(
            (response) => {
              if (this.processMarkup(response)) {
                // rpocess stylesheet
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
