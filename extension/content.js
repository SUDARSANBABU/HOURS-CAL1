(() => {
    "use strict";

    const HOST_ID = "sbandapa-hours-calculator-extension";

    if (document.getElementById(HOST_ID)) {
        return;
    }

    const host = document.createElement("div");
    host.id = HOST_ID;

    Object.assign(host.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483647",
        pointerEvents: "none",
    });

    document.documentElement.appendChild(host);

    const root = document.createElement("div");
    root.id = "root";
    root.style.width = "100%";
    root.style.height = "100%";
    root.style.pointerEvents = "none";

    host.appendChild(root);

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = browser.runtime.getURL("assets/index.css");
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = browser.runtime.getURL("assets/index.js");
    script.dataset.hoursCalculator = "true";
    document.documentElement.appendChild(script);
})();
