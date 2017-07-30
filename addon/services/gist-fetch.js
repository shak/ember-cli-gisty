import AjaxService from 'ember-ajax/services/ajax';

const GITHUB_GIST_HOST = 'https://gist.github.com';

import RSVP from 'rsvp';

export default AjaxService.extend({
  /**
   * Github Gist default host
   *
   * @property host
   * @type String
   * @default 'https://gist.github.com'
   */
  host: GITHUB_GIST_HOST,

  request() {
    return new RSVP.Promise(
      (resolve) => {
        resolve({"description":"Ember CLI Gisty","public":true,"created_at":"2017-07-28T13:47:51+01:00","files":["controller.js","template.hbs"],"owner":"shahrukhomar","div":"<div id=\"gist72642362\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-controller-js\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-javascript\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-controller-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"></td>\n        <td id=\"file-controller-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import</span> <span class=\"pl-smi\">Service</span> <span class=\"pl-k\">from</span> <span class=\"pl-s\"><span class=\"pl-pds\">&#39;</span>@ember/service<span class=\"pl-pds\">&#39;</span></span>;</td>\n      </tr>\n      <tr>\n        <td id=\"file-controller-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"></td>\n        <td id=\"file-controller-js-LC2\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">export</span> <span class=\"pl-c1\">default</span> <span class=\"pl-smi\">Service</span>.<span class=\"pl-en\">extend</span>({</td>\n      </tr>\n      <tr>\n        <td id=\"file-controller-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"></td>\n        <td id=\"file-controller-js-LC3\" class=\"blob-code blob-code-inner js-file-line\">  service<span class=\"pl-k\">:</span> <span class=\"pl-c1\">this</span></td>\n      </tr>\n      <tr>\n        <td id=\"file-controller-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"></td>\n        <td id=\"file-controller-js-LC4\" class=\"blob-code blob-code-inner js-file-line\">});</td>\n      </tr>\n</table>\n\n\n  </div>\n\n  </div>\n  \n</div>\n\n      </div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/shahrukhomar/b4601431db22efbe1376bb768a5c4dae/raw/3591459081163f0126aa3df501b9b209e0643448/controller.js\" style=\"float:right\">view raw</a>\n        <a href=\"https://gist.github.com/shahrukhomar/b4601431db22efbe1376bb768a5c4dae#file-controller-js\">controller.js</a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub</a>\n      </div>\n    </div>\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-template-hbs\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-handlebars\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-template-hbs-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"></td>\n        <td id=\"file-template-hbs-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c1\">{{</span><span class=\"pl-v\">ember-gisty</span> <span class=\"pl-e\"><span class=\"pl-v\">user</span>=</span><span class=\"pl-s\"><span class=\"pl-pds\">&quot;</span>shahrukhomar<span class=\"pl-pds\">&quot;</span></span> <span class=\"pl-e\"><span class=\"pl-v\">gist</span>=</span><span class=\"pl-s\"><span class=\"pl-pds\">&quot;</span>b4601431db22efbe1376bb768a5c4dae<span class=\"pl-pds\">&quot;</span></span><span class=\"pl-c1\">}}</span></td>\n      </tr>\n</table>\n\n\n  </div>\n\n  </div>\n  \n</div>\n\n      </div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/shahrukhomar/b4601431db22efbe1376bb768a5c4dae/raw/3591459081163f0126aa3df501b9b209e0643448/template.hbs\" style=\"float:right\">view raw</a>\n        <a href=\"https://gist.github.com/shahrukhomar/b4601431db22efbe1376bb768a5c4dae#file-template-hbs\">template.hbs</a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub</a>\n      </div>\n    </div>\n</div>\n","stylesheet":"https://assets-cdn.github.com/assets/gist-embed-40aceec172c5b3cf62f5333920ddab3a7342a1d12dfdd1581f49f0f35fc0de4a.css"});
      }
    );
  }
});
