import React from "react";
import { createRoot } from "react-dom/client";
import HoursCalculator from "./components/HoursCalculator";
import "./styles/calculator.css";

let root = null;
let host = null;

function createCalculator() {
    if (document.getElementById("amazon-hours-calculator-host")) {
        console.log("[CAL] Calculator already mounted");
        return;
    }

    console.log("[CAL] Creating calculator");

    host = document.createElement("div");

    host.id = "amazon-hours-calculator-host";

    host.style.position = "fixed";
    host.style.top = "80px";
    host.style.left = "50%";
    host.style.transform = "translateX(-50%)";
    host.style.zIndex = "2147483647";

    document.body.appendChild(host);

    // Shadow DOM prevents Amazon CSS from affecting calculator
    const shadow = host.attachShadow({
        mode: "open"
    });

    const style = document.createElement("style");

    style.textContent = `
        * {
            box-sizing: border-box;
        }

        :host {
            all: initial;
        }

        button,
        input {
            font-family: Arial, sans-serif;
        }
    `;

    shadow.appendChild(style);

    const container = document.createElement("div");

    shadow.appendChild(container);

    root = createRoot(container);

    root.render(
        <React.StrictMode>
            <HoursCalculator
                onClose={() => {
                    destroyCalculator();
                }}
                onMinimize={() => {
                    console.log("[CAL] Minimize");
                }}
            />
        </React.StrictMode>
    );

    console.log("[CAL] Calculator mounted");
}

function destroyCalculator() {
    if (root) {
        root.unmount();
        root = null;
    }

    if (host) {
        host.remove();
        host = null;
    }
}

window.mountHoursCalculator = createCalculator;

console.log("[CAL] mountHoursCalculator registered");

createCalculator();