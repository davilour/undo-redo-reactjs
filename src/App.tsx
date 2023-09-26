import React, { useState } from "react";
import "./App.css";

interface ClickedProps {
    clientX: number;
    clientY: number;
}

function App() {
    const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
    const [UndoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

    function GetCordenates(e: React.MouseEvent<HTMLElement>) {
        const { clientX, clientY } = e;

        setClickedPoints([...clickedPoints, { clientX, clientY }]);
    }

    function UndoButton() {
        const NewClickedPoints = [...clickedPoints];
        const UndoPoint = NewClickedPoints.pop();
        setClickedPoints(NewClickedPoints);
        if (!UndoPoint) return;
        setUndoPoints([...UndoPoints, UndoPoint]);
    }

    function RedoButton() {
        const newUndoPoints = [...UndoPoints];
        const RedoPoint = newUndoPoints.pop();
        setUndoPoints(newUndoPoints);
        if (!RedoPoint) return;
        setClickedPoints([...clickedPoints, RedoPoint]);
    }

    return (
        <>
            <button disabled={clickedPoints.length == 0} onClick={UndoButton}>
                Desfazer
            </button>
            <button onClick={RedoButton}>Refazer</button>
            <div className="App" onClick={GetCordenates}>
                {clickedPoints.map((clickedPoint, index) => {
                    return (
                        <div
                            key={index}
                            className="ClickedPoint"
                            style={{
                                left: clickedPoint.clientX - 5,
                                top: clickedPoint.clientY - 5,
                            }}
                        ></div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
