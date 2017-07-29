import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { typeOf } from '@ember/utils';
import { inject } from '@ember/service';
import { getWithDefault } from '@ember/object';

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
   * Returns the stylesheet href for the gist from the payload
   * when available
   *
   * @private
   * @property gistMarkup
   * @type String
   */
  gistStylesheet: alias('payload.stylesheet'),

  /**
   * Retrieves gist from Github on `didReceiveAttrs` event
   *
   * @protected
   * @method didReceiveAttrs
   */
  didReceiveAttrs() {
    this.send('fetch');
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
              const payloadDiv = getWithDefault(response || {}, 'div', false);
              if (payloadDiv) {
                return this.set('payload', response);
              } else {
                this.set('error', true);
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
