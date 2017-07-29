import AjaxService from 'ember-ajax/services/ajax';

const GITHUB_GIST_HOST = 'https://gist.github.com';

export default AjaxService.extend({
  /**
   * Github Gist default host
   *
   * @property host
   * @type String
   * @default 'https://gist.github.com'
   */
  host: GITHUB_GIST_HOST
});
