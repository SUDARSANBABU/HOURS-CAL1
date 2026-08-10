import { useEffect, useRef, useState } from "react";

export default function Dialog({
    children,
    onClose,
    onMinimize
}) {
    const dialogRef = useRef(null);

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const [dragging, setDragging] = useState(false);

    const dragData = useRef({
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0
    });

    useEffect(() => {
        const saved = localStorage.getItem(
            "hours-calculator-position"
        );

        if (saved) {
            try {
                setPosition(JSON.parse(saved));
            } catch {
                console.log("Invalid saved position");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "hours-calculator-position",
            JSON.stringify(position)
        );
    }, [position]);

    const startDrag = (e) => {
        e.preventDefault();

        setDragging(true);

        dragData.current = {
            startX: e.clientX,
            startY: e.clientY,
            startLeft: position.x,
            startTop: position.y
        };
    };

    useEffect(() => {
        const move = (e) => {
            if (!dragging) return;

            const dx =
                e.clientX - dragData.current.startX;

            const dy =
                e.clientY - dragData.current.startY;

            setPosition({
                x: dragData.current.startLeft + dx,
                y: dragData.current.startTop + dy
            });
        };

        const stop = () => {
            setDragging(false);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", stop);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", stop);
        };
    }, [dragging, position.x, position.y]);

    return (
        <div
            ref={dialogRef}
            className="hours-dialog"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        >
            <div
                className="dialog-header"
                onMouseDown={startDrag}
            >
                <div className="dialog-title">
                    ⏱ Hours Calculator
                </div>

                <div className="dialog-actions">

                    <button
                        type="button"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={onMinimize}
                        className="header-button"
                    >
                        −
                    </button>

                    <button
                        type="button"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={onClose}
                        className="header-button"
                    >
                        ×
                    </button>

                </div>
            </div>

            <div className="dialog-body">
                {children}
            </div>
        </div>
    );
}