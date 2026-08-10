import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "hours-calculator-position";

const DEFAULT_POSITION = {
    x: Math.max(20, Math.round(window.innerWidth / 2 - 195)),
    y: 80,
};

function loadPosition() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (
                typeof parsed.x === "number" &&
                typeof parsed.y === "number"
            ) {
                return parsed;
            }
        }
    } catch (error) {
        console.log("[CAL] Position load failed");
    }

    return DEFAULT_POSITION;
}

function clampPosition(x, y) {
    const width = 390;
    const height = 260;

    const maxX = Math.max(10, window.innerWidth - width - 10);
    const maxY = Math.max(10, window.innerHeight - height - 10);

    return {
        x: Math.max(10, Math.min(x, maxX)),
        y: Math.max(10, Math.min(y, maxY)),
    };
}

export default function Dialog({
    children,
    onClose,
    onMinimize,
}) {
    const [minimized, setMinimized] = useState(false);

    const [position, setPosition] = useState(loadPosition);

    const dragging = useRef(false);

    const dragData = useRef({
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
    });

    // ---------------------------------------------------------
    // Save position
    // ---------------------------------------------------------

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(position)
        );
    }, [position]);

    // ---------------------------------------------------------
    // Keep inside browser window
    // ---------------------------------------------------------

    useEffect(() => {
        const handleResize = () => {
            setPosition((current) =>
                clampPosition(
                    current.x,
                    current.y
                )
            );
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

    // ---------------------------------------------------------
    // Start dragging
    // ---------------------------------------------------------

    const startDrag = (e) => {
        if (e.button !== 0) return;

        e.preventDefault();

        dragging.current = true;

        dragData.current = {
            startX: e.clientX,
            startY: e.clientY,
            startLeft: position.x,
            startTop: position.y,
        };

        document.body.style.userSelect = "none";
    };

    // ---------------------------------------------------------
    // Drag movement
    // ---------------------------------------------------------

    useEffect(() => {
        const handleMove = (e) => {
            if (!dragging.current) return;

            const dx =
                e.clientX -
                dragData.current.startX;

            const dy =
                e.clientY -
                dragData.current.startY;

            const next = clampPosition(
                dragData.current.startLeft + dx,
                dragData.current.startTop + dy
            );

            setPosition(next);
        };

        const stopDrag = () => {
            if (!dragging.current) return;

            dragging.current = false;

            document.body.style.userSelect = "";
        };

        window.addEventListener(
            "mousemove",
            handleMove
        );

        window.addEventListener(
            "mouseup",
            stopDrag
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMove
            );

            window.removeEventListener(
                "mouseup",
                stopDrag
            );
        };
    }, []);

    // ---------------------------------------------------------
    // Minimize
    // ---------------------------------------------------------

    const minimize = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setMinimized(true);

        if (onMinimize) {
            onMinimize();
        }
    };

    // ---------------------------------------------------------
    // Restore
    // ---------------------------------------------------------

    const restore = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setMinimized(false);
    };

    // ---------------------------------------------------------
    // CLOSE = MINIMIZE
    // ---------------------------------------------------------

    const close = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setMinimized(true);

        if (onClose) {
            onClose();
        }
    };

    // =========================================================
    // MINIMIZED ICON
    // =========================================================

    if (minimized) {
        return (
            <button
                type="button"
                className="floating-button"
                style={{
                    left: position.x,
                    top: position.y,
                }}
                onClick={restore}
                onMouseDown={startDrag}
                title="Open Hours Calculator"
            >
                <span className="floating-icon">
                    ⏱
                </span>
            </button>
        );
    }

    // =========================================================
    // DIALOG
    // =========================================================

    return (
        <div
            className="dialog"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            {/* HEADER */}

            <div
                className="dialog-header"
                onMouseDown={startDrag}
            >
                <div className="dialog-title">
                    <span className="title-icon">
                        ⏱
                    </span>

                    <span>
                        Hours Calculator
                    </span>
                </div>

                <div className="dialog-buttons">

                    {/* MINIMIZE */}

                    <button
                        type="button"
                        className="icon-btn"
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                        onClick={minimize}
                        title="Minimize"
                    >
                        −
                    </button>

                    {/* CLOSE = MINIMIZE */}

                    <button
                        type="button"
                        className="icon-btn close-btn"
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                        onClick={close}
                        title="Minimize"
                    >
                        ×
                    </button>

                </div>
            </div>

            {/* BODY */}

            <div className="dialog-body">
                {children}
            </div>
        </div>
    );
}