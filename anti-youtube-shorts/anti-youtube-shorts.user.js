// ==UserScript==
// @name         Anti Youtube Shorts
// @namespace    https://ansari.sh/
// @version      0.1
// @author       Rayyan Ansari
// @description  Removes Youtube Shorts sidebar button, and redirects to normal video page to bypass Shorts UI
// @match        *://*.youtube.com/*
// @icon         anti-youtube-shorts.png
// @grant        none
// @license      MIT
// ==/UserScript==

function removeShortTab() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                var guideEntries = document.getElementsByTagName('ytd-guide-entry-renderer');
                for (var i = 0; i < guideEntries.length; i++) {
                    if (guideEntries[i].innerText.includes('Shorts')) {
                        guideEntries[i].remove();
                    }
                }
            }
        });
    });
    var config = { childList: true, subtree: true };
    observer.observe(document.body, { childList: true, subtree: true });
}

function redirectShort() {
    function redirect() {
        if (window.location.href.includes('youtube.com/shorts')) {
            window.location.replace(window.location.href.replace('/shorts/', '/watch?v='));
        }
    }
    redirect();

    var oldHref = document.location.href;
    function locationChanged(mutations) {
        mutations.forEach(function (mutation) {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                redirect();
            }
        });
    }
    var observer = new MutationObserver(locationChanged);
    observer.observe(document.body, { childList: true, subtree: true });
}

(function() {
    redirectShort();
    removeShortTab();
})();