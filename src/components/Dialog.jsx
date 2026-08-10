import { FaMinus, FaTimes } from "react-icons/fa";
import useDrag from "../hooks/useDrag";
import { useEffect } from "react";

export default function Dialog({
    children,
    position,
    setPosition,
    onClose,
    onMinimize,
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
            className="dialog"
            style={{
                left: drag.position.x,
                top: drag.position.y,
            }}
        >
            <div
                className="dialog-header"
                onMouseDown={drag.startDrag}
            >
                <span>⏱ Hours Cal(sbandapa)</span>

                <div className="dialog-buttons">

                    <button
                        className="icon-btn"
                        onClick={onMinimize}
                        title="Minimize"
                    >
                        <FaMinus />
                    </button>

                    <button
                        className="icon-btn"
                        onClick={onClose}
                        title="Close"
                    >
                        <FaTimes />
                    </button>

                </div>
            </div>

            <div className="dialog-body">
                {children}
            </div>

        </div>
    );
}