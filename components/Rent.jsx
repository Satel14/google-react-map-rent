import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Box, Image, Text } from "@chakra-ui/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { IoLocationOutline } from "react-icons/io5";
function Rent() {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [map,setMap] = useState()
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
      >
        <Button variant="primary" onClick={handleShow}>
          Здати в аренду
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заповніть дані про ваш готель</Modal.Title>
        </Modal.Header>
        <Form.Control
          placeholder="Назва готеля"
          autoFocus
        />
        <Form.Group
        >
          <Form.Label>Ціна</Form.Label>
          <Form.Control as="textarea" placeholder='$150-$500' rows={3} />
           <Form.Label >Довжина lat: {lat}</Form.Label>
          <Form.Control onChange={(e) => setLat(e.target.value)} as="textarea" placeholder='50' rows={3} />
          <Form.Label >Ширина lng: {lng}</Form.Label>
          <Form.Control onChange={(e) => setLng(e.target.value)} as="textarea" placeholder='30' rows={3} />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Marker
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Rent;