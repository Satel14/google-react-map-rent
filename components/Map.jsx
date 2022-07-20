import { Box, Image, Text } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { IoLocationSharp, IoLocation } from "react-icons/io5";
import { BiX } from "react-icons/bi";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Directory from "./Directory";
import mapStyles from "./mapStyles";
import useStyles from './style';
const Map = ({ coordinates, setCoordinates, setBounds, places, place }) => {
    const [isCard, setIsCard] = useState(false)
    const [cardData, setCardData] = useState(null)
    const [isRent, setIsRent] = useState(false)
    const [added, setAdded] = useState(false)
    //popup
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };
    const classes = useStyles();

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };
    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(1, 2);
        setServiceList(list);
    };


    return (
        <Box style={{ height: '100vh', width: '100%' }}>
            
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCWVsv8X_PlKn-Y8nMQhJGLvxA3QKy8MxY' }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={10}
            margin={[50, 50, 50, 50]}
            options={{
                mapTypeControl: false,
            }}

            onChange={(e) => {
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            }}
            onChildClick={(child) => {
                setCardData(places[child])
                setIsCard(true)
            }}
            onClick={(child) => {
                setCardData(places[child])
                setIsRent(false)
                setAdded(true)
            }}
        >
                       {places?.map((place, i) => (
                <Box
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    cursor='pointer'
                >
                    <IoLocationSharp color='red' fontSize={30} />
                </Box>
            ))}
            {isCard && (
                <Box
                    width={'200px'}
                    height={'150px'}
                    bg={'whiteAlpha.900'}
                    position={'absolute'}
                    top={-12}
                    left={0}
                    shadow={'lg'}
                    rounded={'lg'}
                >
                    <Image
                        objectFit={"cover"}
                        width={"full"}
                        height={"120px"}
                        rounded="lg"
                        src={
                            cardData?.photo
                                ? cardData?.photo?.images?.large?.url
                                : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
                        }

                    />
                    <Text
                        textTransform={"capitalize"}
                        width={"40"}
                        fontSize={"lg"}
                        fontWeight={"500"}
                        isTruncated
                    >
                        {cardData.name}

                    </Text>
                    <Box
                        cursor={"pointer"}
                        position={"absolute"}
                        top={2}
                        right={2}
                        width={"30px"}
                        height={"30px"}
                        bg={"red.300"}
                        rounded={"full"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={() => {
                            setIsCard(false);
                        }}
                    >
                        <BiX fontSize={30} />
                    </Box>
                </Box>

            )}
            {serviceList.length <= 1 ? true : <IoLocation color='blue' fontSize={50} />}

            {isRent && (
                <Box
                    width={'200px'}
                    height={'210px'}
                    bg={'whiteAlpha.900'}
                    position={'absolute'}
                    top={24}
                    left={0}
                    shadow={'lg'}
                    rounded={'lg'}
                >
                    <Image
                        objectFit={"cover"}
                        width={"full"}
                        height={"140px"}
                        rounded="lg"
                        src='https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg'
                    />
                    <Text
                        textTransform={"capitalize"}
                        width={"40"}
                        fontSize={"lg"}
                        fontWeight={"500"}
                        isTruncated
                    >

                        {serviceList &&
                            serviceList.map((singleService, index) => (
                                <ul key={index}>
                                    {singleService.service && <li>{singleService.service}
                                        {singleService.city && <li>{singleService.city}</li>}
                                        {singleService.adress && <li>{singleService.adress}</li>}
                                    </li>}
                                </ul>
                            ))}
                    </Text>

                    <Box
                        cursor={"pointer"}
                        position={"absolute"}
                        top={2}
                        right={2}
                        width={"30px"}
                        height={"30px"}
                        bg={"red.300"}
                        rounded={"full"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={() => {
                            setIsRent(false);

                        }}
                    >
                        <BiX fontSize={30} />
                    </Box>
                </Box>
            )}

        </GoogleMapReact>
        
        <Directory />
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
                style={{ marginTop: '-99.9%', zIndex: '101', marginRight: '6%' }}
            >
                <Button variant="primary" onClick={handleShow} style={{ backgroundColor: 'white', color: 'black' }}>
                    Здати в аренду
                </Button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Заповніть дані про ваш готель</Modal.Title>
                </Modal.Header>

                {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division">
                            <Form.Label >Назва</Form.Label>
                            <Form.Control
                                name="service"
                                type="text"
                                placeholder="Назва готеля"
                                id="service" rows={3}
                                value={singleService.service}
                                onChange={(e) => handleServiceChange(e, index)}
                            />
                            <Form.Group
                            >
                                <Form.Label>Ціна</Form.Label>
                                <Form.Control as="textarea" placeholder='$150-$500' rows={3} />
                                <Form.Label >Місто: {lat}</Form.Label>
                                <Form.Control name="city" type="text" id="city" value={singleService.city} onChange={(e) => handleServiceChange(e, index)} as="textarea" placeholder='Kiev Oblast' rows={3} />
                                <Form.Label >Адреса готеля: </Form.Label>
                                <Form.Control name="adress" id="adress" value={singleService.adress} onChange={(e) => handleServiceChange(e, index)} as="textarea" placeholder='88, Dzvinkove' rows={3} />
                            </Form.Group>
                        </div>
                    </div>
                ))}

                <Modal.Footer>
                    {serviceList.length !== 1 && (
                        <Button variant="secondary" onClick={handleServiceRemove}>
                            Reset
                        </Button>
                    )}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            handleClose();
                            handleServiceAdd();
                            setIsRent(true)
                            setAdded(true)
                        }}>
                        Add Marker
                    </Button>
                </Modal.Footer>
                {serviceList &&
                    serviceList.map((singleService, index) => (
                        <ul key={index}>
                            {singleService.service && <li>{singleService.service}</li>}
                            {singleService.city && <li>{singleService.city}</li>}
                            {singleService.adress && <li>{singleService.adress}</li>}
                        </ul>
                    ))}
            </Modal>
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
        >
            {added && (
                <div style={{ marginTop: '-11%', zIndex: 1, backgroundColor: 'white', border: '2px solid black', width: '22%', padding: '2%' }}
                >
                    <Image
                        top={'82.7%'}
                        direction={'column'}
                        width={'7.7%'}
                        height={'15.6%'}
                        position={'absolute'}
                        left={'286px'}
                        zIndex={1}
                        overflow={'hidden'}
                        px={2}
                        src='https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg'
                    />

                    {serviceList &&
                        serviceList.map((singleService, index) => (
                            <ul key={index}>
                                {singleService.service && <div>{singleService.service}
                                    {singleService.city && <div>{singleService.city}</div>}

                                    {singleService.adress && <div>Адрес готеля: {singleService.adress}</div>}
                                </div>}
                            </ul>
                        ))}

                </div>
            )}
        </Flex>
    </Box>
    )
}

export default React.memo(Map)