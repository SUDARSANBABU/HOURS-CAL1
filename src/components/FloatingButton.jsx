import {
    FaCalculator
} from "react-icons/fa";

import { useEffect } from "react";

import useDrag from "../hooks/useDrag";

export default function FloatingButton({
    position,
    setPosition,
    onOpen,
}) {
    const drag = useDrag(position);

    useEffect(() => {
        setPosition(drag.position);
    }, [
        drag.position,
        setPosition
    ]);

    const handleClick = () => {

        if (!drag.wasMovedRef.current) {
            onOpen();
        }

    };

    return (
        <div
            data-hours-calculator-window="true"

            className="floating-button"

            style={{
                left:
                    `${drag.position.x}px`,

                top:
                    `${drag.position.y}px`,
            }}

            onPointerDown={drag.startDrag}

            onClick={handleClick}

            title="Click to open • Drag to move"

            role="button"

            tabIndex={0}

            aria-label="Open Hours Calculator"
        >
            <FaCalculator />
        </div>
    );
}