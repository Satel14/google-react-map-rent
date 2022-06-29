import React, { useState } from 'react'
import { Flex } from "@chakra-ui/react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceDetail from './PlaceDetail';
import Map from './Map'
import data from '../data.json'
const Directory = ({ place, places }) => {
    const [showsecondModal, setshowsecondModal] = useState(false);
    const handleCloseSecond = () => setshowsecondModal(false)
    const handleShowSecond = () => setshowsecondModal(true)
    return (

        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            px={4}
            py={2}
            bg={'white'}
            rounded={'full'}
            ml={4}
            shadow='lg'
            cursor={'pointer'}
            _hover={{ bg: 'gray.100' }}
            transition={'ease-in-out'}
            transitionDuration={'0.3s'}>

            <div
                className="d-flex align-items-center justify-content-center"
                style={{ marginTop: '-98.2%', zIndex: '101', marginRight: '27%' }}
            >
                <Button variant="primary" onClick={handleShowSecond} style={{ backgroundColor: 'white', color: 'black' }}>
                    Довідник із містами
                </Button>
            </div>

            <Modal show={showsecondModal} onHide={handleCloseSecond}>
                <Modal.Header closeButton>
                    <Modal.Title>Довідник із містами</Modal.Title>
                </Modal.Header>
                <div className='city'>Місто,область</div>
                <Flex style={{marginLeft: '85%', marginTop: '-27px'}}>Рейтинг</Flex>

                {data.map((place, index) => {
                    return (
                        <div className="services">

                            <Flex
                                className="first-division">
                                {place.location_string}
                            </Flex>
                            <Flex
                                bg={"whiteAlpha.900"}
                                px={4}
                                py={2}
                                mb={2}
                                shadow="lg"
                                direction={"column"}
                                alignItems={"start"}
                                justifyContent="space-between"
                            >{place.price}</Flex>
                            <Flex
                                px={4}
                                py={2}
                                mb={2}
                                direction={"column"}
                                alignItems={"start"}
                                justifyContent="space-between"
                                marginLeft={'88%'}
                            >{place.rating}</Flex>
                        </div>

                    )
                })}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSecond}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </Flex>
    )
}

export default Directory