import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { notEmpty } from '@ember/object/computed';
import { getWithDefault } from '@ember/object';

import layout from '../templates/components/ember-gisty';

const GIST_BASE_URL = 'https://gist.github.com';

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
   * True if there is a filename to retrieve
   *
   * @property hasRequestedFilename
   * @type String | null
   * @default null
   */
  hasRequestedFilename: notEmpty('filename'),

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

      if (typeOf(gist) === 'string') {
        const url = `${GIST_BASE_URL}/${this.get('user')}/${gist}.json`;

        if (this.get('hasRequestedFilename')) {
          return `${url}?file=${this.get('filename')}`;
        }

        return url;
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
      this.element.innerHTML = responseDiv;
      this.processStylesheet(response);
      this.set('isLoading', false);

      return true;
    }

    this.set('isError', true);

    return false;
  },

  /**
   * Inserts stylesheet into the head when it is set
   *
   * @private
   * @method processMarkup
   *
   * @return Boolean
   */
  processStylesheet(response) {
    const stylesheetHref = getWithDefault(response || {}, 'stylesheet', false);

    if (stylesheetHref) {
      const linkTag = document.createElement('link');
      const head = document.getElementsByTagName('head')[0];

      linkTag.type = 'text/css';
      linkTag.rel = 'stylesheet';
      linkTag.href = response.stylesheet;
      head.appendChild(linkTag);
    }
  },

  actions: {
    /**
     * Fetches the gist from the web
     *
     * @method action.fetch
     */
    fetch() {
      const gistURL = this.get('gistURL');

      this.setProperties({
        isError: false,
        isLoading: true
      });

      if (gistURL) {
        const script = document.createElement('script');
        const callbackName = 'ember_gisty_cb_' + Math.round(100000 * Math.random());
        window[callbackName] = (response) => {
          delete window[callbackName];
          document.body.removeChild(script);
          this.processMarkup(response);
        };

        script.src = `${gistURL}${gistURL.indexOf('?') >= 0 ? '&' : '?'}callback=${callbackName}`;
        script.type = 'application/javascript';

        script.onerror = () => {
          this.set('isError', true);
        }

        return document.body.appendChild(script);
      }

      this.set('isError', true);
    }
  }
});
