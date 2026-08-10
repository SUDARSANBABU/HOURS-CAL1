import { useEffect, useState } from "react";

import Dialog from "./Dialog";

import { calculateHours } from "../utils/calculator";

export default function HoursCalculator({
    onClose,
    onMinimize,
}) {
    const [hours, setHours] = useState("");

    const [result, setResult] = useState("");

    useEffect(() => {

        console.log(
            "[CAL] Input:",
            hours
        );

        if (hours === "") {
            setResult("");
            return;
        }

        const calculated =
            calculateHours(hours);

        console.log(
            "[CAL] Result:",
            calculated
        );

        setResult(calculated);

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
                    step="any"
                    placeholder="Example : 48"
                    value={hours}
                    onChange={(e) => {
                        setHours(
                            e.target.value
                        );
                    }}
                    autoFocus
                />

                <div className="result-box">

                    {result ? (
                        <>
                            <span className="result-label">
                                RESULT
                            </span>

                            <span className="result-value">
                                {result}
                            </span>
                        </>
                    ) : (
                        <span className="result-empty">
                            Type hours above
                        </span>
                    )}

                </div>

            </div>

        </Dialog>
    );
}