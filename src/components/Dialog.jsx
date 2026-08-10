import { useEffect, useRef, useState } from "react";

const DIALOG_WIDTH = 390;
const DIALOG_HEIGHT = 260;

const ICON_SIZE = 64;

const POSITION_KEY = "hours-calculator-position";

function getDefaultPosition() {
    if (typeof window === "undefined") {
        return {
            x: 100,
            y: 100
        };
    }

    return {
        x: Math.max(
            10,
            Math.round(
                (window.innerWidth - DIALOG_WIDTH) / 2
            )
        ),

        y: Math.max(
            10,
            Math.round(
                (window.innerHeight - DIALOG_HEIGHT) / 2
            )
        )
    };
}

function loadPosition() {
    try {
        const saved =
            localStorage.getItem(POSITION_KEY);

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
        console.warn(
            "Hours Calculator position load failed:",
            error
        );
    }

    return getDefaultPosition();
}

function clampPosition(x, y) {
    if (typeof window === "undefined") {
        return {
            x,
            y
        };
    }

    const maxX = Math.max(
        10,
        window.innerWidth - DIALOG_WIDTH - 10
    );

    const maxY = Math.max(
        10,
        window.innerHeight - DIALOG_HEIGHT - 10
    );

    return {
        x: Math.min(
            Math.max(10, x),
            maxX
        ),

        y: Math.min(
            Math.max(10, y),
            maxY
        )
    };
}

export default function Dialog({
    children,
    onClose,
    onMinimize
}) {
    const [minimized, setMinimized] =
        useState(false);

    const [position, setPosition] =
        useState(loadPosition);

    const [dragging, setDragging] =
        useState(false);

    const dragData = useRef({
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0
    });

    /*
     * SAVE POSITION
     */
    useEffect(() => {
        try {
            localStorage.setItem(
                POSITION_KEY,
                JSON.stringify(position)
            );
        } catch (error) {
            console.warn(
                "Hours Calculator position save failed:",
                error
            );
        }
    }, [position]);

    /*
     * KEEP DIALOG INSIDE SCREEN
     */
    useEffect(() => {
        const handleResize = () => {
            setPosition((current) => {
                return clampPosition(
                    current.x,
                    current.y
                );
            });
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

    /*
     * START DRAG
     */
    const startDrag = (e) => {
        /*
         * Only left mouse button
         */
        if (
            e.button !== undefined &&
            e.button !== 0
        ) {
            return;
        }

        e.preventDefault();

        setDragging(true);

        dragData.current = {
            startX: e.clientX,
            startY: e.clientY,

            startLeft: position.x,
            startTop: position.y
        };
    };

    /*
     * DRAG MOVEMENT
     */
    useEffect(() => {
        if (!dragging) {
            return;
        }

        const handleMove = (e) => {
            const dx =
                e.clientX -
                dragData.current.startX;

            const dy =
                e.clientY -
                dragData.current.startY;

            const next =
                clampPosition(
                    dragData.current.startLeft +
                        dx,

                    dragData.current.startTop +
                        dy
                );

            setPosition(next);
        };

        const handleStop = () => {
            setDragging(false);
        };

        window.addEventListener(
            "mousemove",
            handleMove
        );

        window.addEventListener(
            "mouseup",
            handleStop
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMove
            );

            window.removeEventListener(
                "mouseup",
                handleStop
            );
        };
    }, [dragging]);

    /*
     * MINIMIZE
     *
     * Both - and X minimize.
     * Calculator is NOT destroyed.
     */
    const minimize = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setMinimized(true);

        if (onMinimize) {
            onMinimize();
        }
    };

    /*
     * RESTORE
     */
    const restore = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setMinimized(false);
    };

    /*
     * =====================================================
     * MINIMIZED ICON
     * =====================================================
     */
    if (minimized) {
        return (
            <button
                type="button"
                className="floating-button"
                style={{
                    left: `${Math.min(
                        position.x,
                        Math.max(
                            10,
                            window.innerWidth -
                                ICON_SIZE -
                                10
                        )
                    )}px`,

                    top: `${Math.min(
                        position.y,
                        Math.max(
                            10,
                            window.innerHeight -
                                ICON_SIZE -
                                10
                        )
                    )}px`
                }}
                onClick={restore}
                onMouseDown={startDrag}
                title="Open Hours Calculator"
                aria-label="Open Hours Calculator"
            >
                ⏱
            </button>
        );
    }

    /*
     * =====================================================
     * FULL DIALOG
     * =====================================================
     */

    return (
        <div
            className="dialog"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >

            {/* =========================================
                HEADER
            ========================================= */}

            <div
                className="dialog-header"
                onMouseDown={startDrag}
            >

                <div className="dialog-title">
                    <span>⏱</span>

                    <span>
                        Hours Cal (sbandapa)
                    </span>
                </div>

                <div className="dialog-buttons">

                    {/* MINIMIZE */}

                    <button
                        type="button"
                        className="icon-btn"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={minimize}
                        title="Minimize"
                        aria-label="Minimize"
                    >
                        −
                    </button>

                    {/* CLOSE = MINIMIZE */}

                    <button
                        type="button"
                        className="icon-btn"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={minimize}
                        title="Minimize"
                        aria-label="Minimize"
                    >
                        ×
                    </button>

                </div>
            </div>

            {/* =========================================
                BODY
            ========================================= */}

            <div className="dialog-body">
                {children}
            </div>

        </div>
    );
}