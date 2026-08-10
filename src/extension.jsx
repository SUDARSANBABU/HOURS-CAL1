import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import HoursCalculator from "./components/HoursCalculator";
import cssText from "./index.css?inline";

const HOST_ID = "sbandapa-hours-calculator-host";

export function mountHoursCalculator() {
    const existing = document.getElementById(HOST_ID);
    if (existing) return existing;

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

    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = cssText;
    shadow.appendChild(style);

    const mount = document.createElement("div");
    mount.style.width = "100%";
    mount.style.height = "100%";
    mount.style.pointerEvents = "none";
    shadow.appendChild(mount);

    function ExtensionApp() {
        const [position, setPosition] = useState({ x: 150, y: 120 });

        const remove = () => host.remove();

        return (
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100vw",
                    height: "100vh",
                    pointerEvents: "none",
                }}
            >
                <div style={{ pointerEvents: "auto" }}>
                    <HoursCalculator
                        position={position}
                        setPosition={setPosition}
                        onClose={remove}
                        onMinimize={remove}
                    />
                </div>
            </div>
        );
    }

    const root = createRoot(mount);
    root.render(<ExtensionApp />);

    return host;
}

if (typeof window !== "undefined") {
    window.mountHoursCalculator = mountHoursCalculator;
}
