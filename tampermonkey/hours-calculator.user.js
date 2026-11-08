// ==UserScript==
// @name         Amazon Hours Calculator
// @namespace    https://sbandapa143.netlify.app/
// @version      3.0.0
// @description  Hours calculator injected directly into Amazon Transportation pages - NO IFRAME
// @match        https://trans-logistics.amazon.com/fmc/scheduling/clone/plan/*
// @match        https://trans-logistics.amazon.com/fmc/scheduling/clone/plan/*/edit
// @grant        none
// @run-at       document-idle
// @require      https://sbandapa143.netlify.app/hours-calculator.js
// ==/UserScript==

(function () {
    "use strict";

    if (document.getElementById("sbandapa-hours-calculator-host")) {
        return;
    }

    if (typeof window.mountHoursCalculator === "function") {
        window.mountHoursCalculator();
    } else {
        console.error("Hours Calculator: hours-calculator.js did not load.");
    }
})();
