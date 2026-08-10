import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const ROOT_ID = "sbandapa-hours-calculator-root";

window.mountHoursCalculator = function () {

    if (document.getElementById(ROOT_ID)) {
        return;
    }

    const container = document.createElement("div");

    container.id = ROOT_ID;

    Object.assign(container.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483647",
        pointerEvents: "none",
        background: "transparent"
    });

    document.body.appendChild(container);

    const root = createRoot(container);

    root.render(
        <div
            style={{
                width: "100%",
                height: "100%",
                pointerEvents: "none"
            }}
        >
            <div
                style={{
                    pointerEvents: "auto"
                }}
            >
                <App />
            </div>
        </div>
    );
};