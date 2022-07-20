import { Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import PlaceDetail from "../components/PlaceDetail";
import React from "react";
import { useState, useEffect } from "react";
import { getPlacesData } from "./api";
import Head from 'next/head'

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({ lat: 50, lng: 30 })
  const [bounds, setBounds] = useState(null)
  const [type, setType] = useState('hotels');
  const [rent, setRent] = useState(false)
  const [ratings, setRatings] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const Toggle = () => setRent(!rent);


  useEffect(() => {
    // get the users current location on intial login

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log({ latitude, longitude });
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true)
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      console.log(data);
      setPlaces(data)
      setIsLoading(false)
    })
  }, [type, coordinates, bounds])

  useEffect(() => {
    const filteredData = places.filter((place) => place.ratings > ratings)
    setFilteredPlaces(filteredData)
    console.log({ ratings });
  }, [ratings])

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      width={'100vw'}
      height={'100vh'}
      maxWidth={'100vw'}
      maxHeight={'100vh'}
      position={'fixed'}
    >
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCWVsv8X_PlKn-Y8nMQhJGLvxA3QKy8MxY"></script>
      </Head>
      <Header
        setType={setType}
        setRatings={setRatings}
        setCoordinates={setCoordinates}
      />
      <List places={filteredPlaces.length ? filteredPlaces : places} isLoading={isLoading} />
      <Map setCoordinates={setCoordinates} coordinates={coordinates} setBounds={setBounds} places={filteredPlaces.length ? filteredPlaces : places} />
          
    </Flex>
  )
}

export default React.memo(Home);
