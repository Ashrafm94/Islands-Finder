import React from 'react';

import {Row, Col} from 'react-bootstrap';

const Board = ({ matrix, solvedMatrix, isSolved, isRandom, onPress }) => {

    //Get Main Matrix
    //Cell is Clickable Only if
    // 'isRandom' is false
    const getUnSolvedMatrix = () => {
        return (
            matrix.map((row, rowIndex) => <Row key={rowIndex} className="justify-content-center">
            {
                row.map((col, colIndex) => <Col key={colIndex}
                    className={"p-0 m-0 fixed-width block-size " + (
                        col === 0 ? "border border-dark" : ""
                    )}>
                    <div className="block-size shadow-sm" style={{ background: col === 1 ? "black" : "white" }}
                        onClick={() => isRandom ? {} : onPress(rowIndex, colIndex)}></div>
                </Col>)
            }
            </Row>)
        )
    }

    //Get Solved Matrix with Colored Background
    const getSolvedMatrix = () => {
        return (
            solvedMatrix.map((row, ind) => <Row key={ind} className="justify-content-center">
                {
                    row.map((bg, index) => <Col key={index}
                        className={"p-0 m-0 fixed-width block-size " + (
                            bg === "white" ? "border border-dark" : ""
                        )}>
                        <div className="block-size shadow-sm" style={{ background: bg }}></div>
                    </Col>)
                }
            </Row>)
        )
    };

    return (
        <div className="text-center">
            {
                isSolved ? 
                getSolvedMatrix()
                : 
                getUnSolvedMatrix()
            }
        </div>
    )
};

export default Board;