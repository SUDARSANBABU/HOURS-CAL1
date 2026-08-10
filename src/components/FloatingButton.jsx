import { FaCalculator } from "react-icons/fa";
import useDrag from "../hooks/useDrag";
import { useEffect } from "react";

export default function FloatingButton({
    position,
    setPosition,
    onOpen,
}) {

    const drag = useDrag(position);

    useEffect(() => {
        drag.setPosition(position);
    }, []);

    useEffect(() => {
        setPosition(drag.position);
    }, [drag.position]);

    return (
        <div
            className="floating-button"
            style={{
                left: drag.position.x,
                top: drag.position.y,
            }}
            onMouseDown={drag.startDrag}
            onDoubleClick={onOpen}
            title="Double Click to Open Calculator"
        >
            <FaCalculator />
        </div>
    );
}