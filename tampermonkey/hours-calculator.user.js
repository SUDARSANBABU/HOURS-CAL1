// ==UserScript==
// @name         Amazon Hours Calculator
// @namespace    https://sbandapa143.netlify.app/
// @version      3.0.0
// @description  Hours calculator injected directly into Amazon Transportation pages - NO IFRAME
// @match        https://trans-logistics.amazon.com/fmc/scheduling/clone/plan/*

// @match        https://trans-logistics.amazon.com/fmc/execution/load/*/edit
// @grant        none
// @run-at       document-idle
// @require      https://sbandapa143.netlify.app/hours-calculator.js
// ==/UserScript==

(function () {
    "use strict";

    const HOST_ID = "amazon-hours-calculator-host";

    function isSupportedPage() {
        const path = window.location.pathname;
        return (
            path.startsWith("/fmc/scheduling/clone/plan/") ||
            /^\/fmc\/execution\/load\/.+\/edit\/?$/.test(path)
        );
    }

    function ensureCalculator() {
        if (
            !isSupportedPage() ||
            document.getElementById(HOST_ID)
        ) {
            return;
        }

        if (typeof window.mountHoursCalculator === "function") {
            window.mountHoursCalculator();
        } else {
            console.error("Hours Calculator: hours-calculator.js did not load.");
        }
    }

    ensureCalculator();

    const observer = new MutationObserver(ensureCalculator);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();
