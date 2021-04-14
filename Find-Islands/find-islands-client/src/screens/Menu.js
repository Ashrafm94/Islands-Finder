import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { DIMENSIONS, SCREEN_URLS } from '../constants';
import { setDimensions } from '../Redux/actions/board';

const Menu = () => {

    const [bitmapSize, setBitmapSize] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();


    //Check Boundries and Open Home screen
    const checkBoundriesAndOpenHome = (isRandom) => {
        validateAndOpenHomeScreen(isRandom);
    }

    //Open Home Screen
    const openHomeScreen = (isRandom, n, m) => {

        //save into redux store
        let dimensions = {
            n,
            m
        };

        dispatch(setDimensions(dimensions, isRandom));

        //Navigate to home
        history.push(SCREEN_URLS.HOME);
    }

    //Check If Boundries are valid
    const validateAndOpenHomeScreen = (isRandom) => {
        try {

            setErrorMessage("");
            setSuccessMessage("");

            //Empty Field
            if (!bitmapSize) {
                setErrorMessage("You must insert n,m Dimensions")
                return;
            }

            //Parse Dimentsions
            let n = parseInt(bitmapSize.split(",")[0])
            let m = parseInt(bitmapSize.split(",")[1])

            //If One of them is not a number
            if (isNaN(n) || isNaN(m)) {
                setErrorMessage("Invalid Dimensions")
                return;
            }

            if (n > 0 && m > 0 && n <= DIMENSIONS.MAX_N && m <= DIMENSIONS.MAX_M){
                setSuccessMessage(" ");

                setTimeout(() => {
                    openHomeScreen(isRandom, n, m)
                }, 1500)
            } else {
                setErrorMessage("Dimensions Out of Range")
            }
            
        } catch (e) {
            console.log(e)
            setErrorMessage(JSON.stringify(e))
        }
    }

    //render success message alert
    const renderSuccessMessage = () => {
        if (!successMessage) {
            return null;
        }

        return (
            <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
                <Alert.Heading>Correct Dimensions</Alert.Heading>
                <p>
                    Redirecting to home screen ...
                </p>
            </Alert>
        )
    }

    //render error message alert
    const renderErrorMessage = () => {
        if (!errorMessage) {
            return null;
        }

        return (
            <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                <Alert.Heading>Invalid Dimensions</Alert.Heading>
                <p>
                    {errorMessage}
                </p>
            </Alert>
        )
    }

    return (
        <Container className="justify-content-center align-items-center h-100v mx-auto text-center">
            <Row className="h-100 row-max-size text-center mx-auto">
                <Col className="my-auto">
                    <Card className="text-center shadow rounded">
                        <Card.Header>Create your own Bitmap Board</Card.Header>
                        <Card.Body>
                            {renderSuccessMessage()}
                            {renderErrorMessage()}

                            <Card.Title>Enter a Dimentions</Card.Title>

                            <div className="mt-4 input-container mx-auto text-center">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Bitmap size n,m"
                                        aria-describedby="basic-addon1"
                                        value={bitmapSize}
                                        onChange={(e) => setBitmapSize(e.target.value)}
                                    />
                                </InputGroup>
                            </div>

                            <div className="mt-5">
                                <Button className="input-container" variant="primary" onClick={() => checkBoundriesAndOpenHome(true)}>Random</Button>
                            </div>
                            <div className="mt-3 mb-3">
                                <Button className="input-container" variant="primary" onClick={() => checkBoundriesAndOpenHome(false)}>Draw</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Menu;