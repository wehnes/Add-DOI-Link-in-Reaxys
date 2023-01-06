// ==UserScript==
// @name         Add DOI Link in Reaxys
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Add a doi direct link after 'Full Text'
// @author       Wehnes
// @match        https://www.reaxys.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reaxys.com
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onhashchange = function () {
        var i = 0;
        waitForKeyElements(".els-btn.els-btn-link.blue-compact.els-btn-xs.e2e-full-text", re);
        setTimeout(re, 1000);
        function re(){
            var li,doi,a,doi_a;
            li = $(".els-btn.els-btn-link.blue-compact.els-btn-xs.e2e-full-text");
            for (var len = li.length; i<len ; i++){
                doi = li[i].getAttribute("data-doi");
                if (doi != null){
                    doi_a = doi.replace(/\//g,'_');
                    if ($("a#settled_doi_" + i).length != 1){
                        doi = "https://doi.org/" + doi;
                        a = document.createElement("a");
                        li[i].after(a);
                        a.setAttribute("href", doi);
                        a.setAttribute("id", "settled_doi_" + i);
                        a.setAttribute("target","_blank");
                        a.innerHTML = 'DOI';
                    }
                }
            }
            console.log('doi link done');
        }
    };
})();
