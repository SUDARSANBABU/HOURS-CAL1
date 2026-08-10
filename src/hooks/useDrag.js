import { useEffect, useRef, useState } from "react";

export default function useDrag(initialPosition = { x: 100, y: 100 }) {

    const [position, setPosition] = useState(initialPosition);

    const dragging = useRef(false);

    const offset = useRef({
        x: 0,
        y: 0,
    });

    const startDrag = (e) => {

        dragging.current = true;

        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };

        document.body.style.userSelect = "none";

        e.preventDefault();
    };

    useEffect(() => {

        const handleMove = (e) => {

            if (!dragging.current) return;

            let x = e.clientX - offset.current.x;
            let y = e.clientY - offset.current.y;

            const maxX = window.innerWidth - 60;
            const maxY = window.innerHeight - 60;

            x = Math.max(0, Math.min(x, maxX));
            y = Math.max(0, Math.min(y, maxY));

            setPosition({ x, y });

        };

        const handleUp = () => {

            dragging.current = false;

            document.body.style.userSelect = "";

        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {

            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);

        };

    }, [position]);

    return {
        position,
        setPosition,
        startDrag,
    };
}