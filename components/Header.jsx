import React from 'react'
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import {
  BiHotel,
  BiSearch,
} from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


const Headers = ({ setType, setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null)
  const onLoad = (autoC) => setAutocomplete(autoC)
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({ lat, lng })
  }

  return (
    <Flex
      position={'absolute'}
      top={0}
      left={0}
      width={'full'}
      px={4}
      py={2}
      zIndex={101}
    >
      <Flex>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputGroup width={'25vw'} shadow='lg'>
            <InputRightElement
              pointerEvents={'none'}
              children={<BiSearch color='gray' fontSize={20} />}
            />
            <Input
              type={'text'}
              placeholder='Search Google Map'
              variant={'filled'}
              fontSize={18}
              bg={'white'}
              color={'gray.700'}
              _hover={{ bg: 'whiteAlpha.800' }}
              _focus={{ bg: 'whiteAlpha.800' }}
              _placeholder={{ color: 'gray.700' }}
            />
          </InputGroup>
        </Autocomplete>
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
        >
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
            transitionDuration={'0.3s'}
            onClick={() => setType('hotels')}>
            <BiHotel fontSize={25} />
            <Text ml={3} fontSize={16} fontWeight={500}>Hotel</Text>
          </Flex>

        </Flex>
      </Flex>
    </Flex >
  )
}

export default Headers