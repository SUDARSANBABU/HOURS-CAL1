import { useEffect, useRef, useState } from "react";

export default function useDrag(initialPosition = { x: 100, y: 100 }) {
    const [position, setPosition] = useState(() => ({
        x: Number(initialPosition?.x) || 100,
        y: Number(initialPosition?.y) || 100,
    }));

    const positionRef = useRef(position);

    const dragRef = useRef({
        active: false,
        offsetX: 0,
        offsetY: 0,
        width: 60,
        height: 60,
    });

    const wasMovedRef = useRef(false);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    const startDrag = (e) => {
        if (e.button !== undefined && e.button !== 0) {
            return;
        }

        const target =
            e.currentTarget.closest(
                "[data-hours-calculator-window]"
            ) || e.currentTarget;

        const rect = target.getBoundingClientRect();

        dragRef.current = {
            ...dragRef.current,

            active: true,

            offsetX:
                e.clientX - positionRef.current.x,

            offsetY:
                e.clientY - positionRef.current.y,

            width: rect.width,
            height: rect.height,
        };

        wasMovedRef.current = false;

        if (e.currentTarget.setPointerCapture) {
            e.currentTarget.setPointerCapture(
                e.pointerId
            );
        }

        document.body.style.userSelect = "none";

        e.preventDefault();
    };

    useEffect(() => {
        const handleMove = (e) => {
            if (!dragRef.current.active) {
                return;
            }

            const maxX = Math.max(
                0,
                window.innerWidth -
                    dragRef.current.width
            );

            const maxY = Math.max(
                0,
                window.innerHeight -
                    dragRef.current.height
            );

            const rawX =
                e.clientX -
                dragRef.current.offsetX;

            const rawY =
                e.clientY -
                dragRef.current.offsetY;

            if (
                Math.abs(
                    rawX -
                        positionRef.current.x
                ) > 3 ||
                Math.abs(
                    rawY -
                        positionRef.current.y
                ) > 3
            ) {
                wasMovedRef.current = true;
            }

            const x = Math.max(
                0,
                Math.min(rawX, maxX)
            );

            const y = Math.max(
                0,
                Math.min(rawY, maxY)
            );

            setPosition({
                x,
                y,
            });
        };

        const stopDrag = () => {
            dragRef.current.active = false;

            document.body.style.userSelect = "";
        };

        window.addEventListener(
            "pointermove",
            handleMove
        );

        window.addEventListener(
            "pointerup",
            stopDrag
        );

        window.addEventListener(
            "pointercancel",
            stopDrag
        );

        return () => {
            window.removeEventListener(
                "pointermove",
                handleMove
            );

            window.removeEventListener(
                "pointerup",
                stopDrag
            );

            window.removeEventListener(
                "pointercancel",
                stopDrag
            );

            document.body.style.userSelect = "";
        };
    }, []);

    return {
        position,
        setPosition,
        startDrag,
        wasMovedRef,
    };
}