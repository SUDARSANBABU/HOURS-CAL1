import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { calculateHours } from "../utils/calculator";

export default function HoursCalculator({
    onClose,
    onMinimize
}) {
    const [hours, setHours] = useState("");
    const [result, setResult] = useState("");

    /*
     * AUTO CALCULATE
     *
     * Whenever the user types a number,
     * calculation happens automatically.
     */
    useEffect(() => {
        if (hours === "") {
            setResult("");
            return;
        }

        setResult(calculateHours(hours));
    }, [hours]);

    return (
        <Dialog
            onClose={onClose}
            onMinimize={onMinimize}
        >
            <div className="calculator">

                <label className="label">
                    Enter Hours
                </label>

                <input
                    className="hours-input"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Example : 48"
                    value={hours}
                    onChange={(e) => {
                        setHours(e.target.value);
                    }}
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