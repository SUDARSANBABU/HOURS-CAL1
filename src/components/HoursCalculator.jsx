import { useEffect, useState } from "react";

import Dialog from "./Dialog";
import { calculateHours } from "../utils/calculator";

export default function HoursCalculator({
    position,
    setPosition,
    onClose,
    onMinimize,
}) {
    const [hours, setHours] = useState("");
    const [result, setResult] = useState("");

    // Automatically calculate while typing.
    useEffect(() => {
        if (hours === "") {
            setResult("");
            return;
        }

        setResult(calculateHours(hours));
    }, [hours]);

    return (
        <Dialog
            position={position}
            setPosition={setPosition}
            onClose={onClose}
            onMinimize={onMinimize}
        >
            <div className="calculator">
                <label className="label">
                    Enter Hours
                </label>

                <input
                    type="number"
                    min="0"
                    className="hours-input"
                    placeholder="Example : 48"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    autoFocus
                />

                {result && (
                    <div className="result-box">
                        {result}
                    </div>
                )}
            </div>
        </Dialog>
    );
}
