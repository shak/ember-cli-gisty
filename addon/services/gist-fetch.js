import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  /**
   * Github Gist default host
   *
   * @property host
   * @type String
   * @default 'https://gist.github.com'
   */
  host: 'https://gist.github.com'
});
