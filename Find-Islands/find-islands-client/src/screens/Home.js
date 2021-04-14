import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ENV, SCREEN_URLS } from '../constants';
import { useHistory } from 'react-router';
import { removeDimensions } from '../Redux/actions/board';
import { Board } from '../components';

const Home = () => {

    const dimensions = useSelector(state => state.boardReducer.dimensions);
    const isRandom = useSelector(state => state.boardReducer.isRandom);
    const [isSolved, setIsSolved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [islandsCount, setIslandsCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const n = dimensions.n || 1;
    const m = dimensions.m || 1;
    const [matrix, setMatrix] = useState([]);
    const [solvedMatrix, setSolvedMatrix] = useState([]);

    useEffect(() => {
        generateMatrix();
        // eslint-disable-next-line
    }, []);

    const generateMatrix = () => {
        let matrix = [];

        for (let i = 0; i < n; i++) {
            let row = [];

            for (let j = 0; j < m; j++) {
                
                let num = isRandom ? Math.floor(Math.random() * 2) : 0;
                row.push(num);
            }

            matrix.push(row);
        }

        setMatrix(matrix);
    }

    const solve = async () => {
        try{
            setIsLoading(true);
            setErrorMessage("");

            let url = `${ENV.API_URL}/${ENV.ISLANDS_ROUTE}/find`;
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    matrix
                })
            });

            if (response.ok){
                let res = await response.json();

                if (res.success){
                    setSolveMatrixByCoords(res.coords);
                    setIsSolved(true);
                    setIslandsCount(res.count);
                } else {
                    setErrorMessage(
                        typeof(res.message) === typeof("") ? 
                        res.message : JSON.stringify(res.message)
                    );
                }
            }

        } catch (e){
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const setSolveMatrixByCoords = (coords) => {
        let solMat = [...matrix];
        solMat = solMat.map((val) => val.map((num) => num === 0 ? "white" : "black"))

        let keys = Object.keys(coords);

        for(let i = 0; i < keys.length; i++){
            let bg = generateColor();
            let values = coords[keys[i]];
            for(let j = 0; j < values.length; j++){

                let rowIndex = values[j].i;
                let colIndex = values[j].j;

                let row = solMat[rowIndex];
                row[colIndex] = bg;
                solMat[rowIndex] = row;
            }
        }

        setSolvedMatrix(solMat);
    }

    const generateColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    const restart = () => {
        dispatch(removeDimensions());
        history.replace(SCREEN_URLS.MENU);
    }

    const onPress = (i, j) => {
        let matrixCpy = [...matrix];
        let row = matrixCpy[i];
        if (row[j] === 0){
            row[j] = 1;
        } else {
            row[j] = 0;
        }
        matrixCpy[i] = row;
        setMatrix(matrixCpy);
    }

    return (

        <Container className="justify-content-center align-items-center h-100v mx-auto text-center">
            <Row className="h-100 row-max-size text-center mx-auto">
                <Col className="my-auto">
                    <Card className="text-center shadow rounded">
                        <Card.Header>Islands Finder</Card.Header>
                        <Card.Body>

                            <Board matrix={matrix} solvedMatrix={solvedMatrix} 
                                isSolved={isSolved} isRandom={isRandom}
                                onPress={onPress.bind(this)} />


                            <div className="mt-3 mb-3">
                                {
                                    isLoading ? 
                                    (
                                        <div>Loading ...</div>
                                    )
                                    : (
                                        isSolved ? 
                                        <Fragment>
                                            <p>Found {islandsCount} {`Island${islandsCount === 1 ? "" : "s"}`}!</p>
                                            <Button className="input-container" variant="primary" onClick={restart}>Restart</Button>        
                                        </Fragment>
                                        :
                                        <Button className="input-container" variant="primary" onClick={solve}>Solve</Button>
                                    )
                                }
                                
                            </div>
                            {
                                errorMessage && errorMessage.length > 0 ? 
                                <div className="mb-3">
                                    <p className="text-danger">{errorMessage}</p>
                                </div>
                                : null
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;