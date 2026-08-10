import React from "react";
import { createRoot } from "react-dom/client";

import HoursCalculator from "./components/HoursCalculator";

import calculatorCSS from "./styles/calculator.css?inline";

let root = null;
let host = null;

function createCalculator() {

    // Prevent duplicate calculator
    if (
        document.getElementById(
            "amazon-hours-calculator-host"
        )
    ) {
        console.log(
            "[CAL] Calculator already exists"
        );

        return;
    }

    console.log(
        "[CAL] Creating calculator"
    );

    // Host
    host = document.createElement("div");

    host.id =
        "amazon-hours-calculator-host";

    host.style.position = "fixed";
    host.style.top = "80px";
    host.style.left = "50%";
    host.style.zIndex = "2147483647";

    document.body.appendChild(host);

    // Shadow DOM
    const shadow = host.attachShadow({
        mode: "open"
    });

    // CSS INSIDE SHADOW DOM
    const style =
        document.createElement("style");

    style.textContent = `
        ${calculatorCSS}

        * {
            box-sizing: border-box;
        }

        :host {
            all: initial;
            font-family: Arial, sans-serif;
        }

        button,
        input {
            font-family: Arial, sans-serif;
        }
    `;

    shadow.appendChild(style);

    // React container
    const container =
        document.createElement("div");

    shadow.appendChild(container);

    // React root
    root = createRoot(container);

    root.render(
        <React.StrictMode>
            <HoursCalculator
                onClose={() => {
                    console.log(
                        "[CAL] Close requested"
                    );
                }}
                onMinimize={() => {
                    console.log(
                        "[CAL] Calculator minimized"
                    );
                }}
            />
        </React.StrictMode>
    );

    console.log(
        "[CAL] Calculator mounted"
    );
}

// Global function for Tampermonkey
window.mountHoursCalculator =
    createCalculator;

console.log(
    "[CAL] mountHoursCalculator registered"
);

// Automatically start
createCalculator();