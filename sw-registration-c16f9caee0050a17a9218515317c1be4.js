(function(){"use strict"
var e=[],r=[]
"serviceWorker"in navigator&&navigator.serviceWorker.register("{{ROOT_URL}}sw.js",{scope:"{{ROOT_URL}}"}).then(function(r){for(var n=Promise.resolve(),o=0;o<e.length;o++)(function(o){n=n.then(function(){return e[o](r)})})(o)
return n.then(function(){console.log("Service Worker registration succeeded. Scope is "+r.scope)})}).catch(function(e){for(var n=Promise.resolve(),o=0;o<r.length;o++)(function(o){n=n.then(function(){return r[o](e)})})(o)
return n.then(function(){console.log("Service Worker registration failed with "+e)})})})()
