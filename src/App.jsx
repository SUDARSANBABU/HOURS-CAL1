import { useEffect } from "react";

import FloatingButton from "./components/FloatingButton";
import HoursCalculator from "./components/HoursCalculator";

import useStorage from "./hooks/useStorage";


export default function App() {


    const [isOpen, setIsOpen] = useStorage(
        "calculator-open",
        true
    );


    const [position, setPosition] = useStorage(
        "calculator-position",
        {
            x: 150,
            y: 120,
        }
    );


    // Keyboard Shortcut
    // Ctrl + Shift + H

    useEffect(() => {


        const handleShortcut = (e) => {


            if (
                e.ctrlKey &&
                e.shiftKey &&
                e.key.toLowerCase() === "h"
            ) {

                e.preventDefault();

                setIsOpen(prev => !prev);

            }


        };


        window.addEventListener(
            "keydown",
            handleShortcut
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleShortcut
            );

        };


    }, []);



    return (

        <>

            {
                isOpen ? (

                    <HoursCalculator

                        position={position}

                        setPosition={setPosition}

                        onClose={() => setIsOpen(false)}

                        onMinimize={() => setIsOpen(false)}

                    />

                ) : (

                    <FloatingButton

                        position={position}

                        setPosition={setPosition}

                        onOpen={() => setIsOpen(true)}

                    />

                )

            }


        </>

    );

}