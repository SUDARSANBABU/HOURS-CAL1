import React from "react";
import { createRoot } from "react-dom/client";
import HoursCalculator from "./components/HoursCalculator";
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
        inset: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483647",
        pointerEvents: "none"
    });

    document.body.appendChild(container);

    const root = createRoot(container);

    root.render(
        <div
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none"
            }}
        >
            <div
                style={{
                    pointerEvents: "auto"
                }}
            >
                <HoursCalculator />
            </div>
        </div>
    );
};