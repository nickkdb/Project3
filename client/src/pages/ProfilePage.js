import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import { auth } from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import Banner from "../components/Banner";
import { Modal, Button, Form } from "react-bootstrap";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [avail, setAvail] = useState("Yes");
  const [uuid, setuuid] = useState("");
  // const [reRender, setReRender] = useState(false);


  const user = useContext(UserContext);
  const { photoURL, displayName, email, uid } = user;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateCard = (event) => {
    handleClose();
    let newAvail;

    if (avail === "Yes") {
      newAvail = true;
    } else {
      newAvail = false;
    }

    // data.price = price;
    // data.description = descr;

    const data = {
      available: newAvail,
      price: price,
      description: descr,
      uuid: uuid
    }

    console.log(data);
    API.updateCard(user.mongo._id, data).then((res) => console.log(res));
  };



  function deleteCard(id, uuid) {
    console.log(id, uuid)
    API.deleteCard(id, uuid)
    .then((res) => console.log(res));
  }

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL ||
              "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
              })  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <h3 className="italic">{email}</h3>
          <h3 className="italic">{uid}</h3>
        </div>
      </div>
      <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
      {user &&
        user.mongo.products.map((card) => {
          return (
            <div key={card.uuid} className="col-6">
              <MyCard
                key={card.uuid}
                uuid={card.uuid}
                name={card.name}
                category={card.category}
                description={card.description}
                available={card.available}
                image={card.image}
                price={card.price}
                attributes={card.attributes}
                openModal={handleShow}
                // addCard={updateCard}
                setuuid={setuuid}
              // deleteCard={deleteCard}
              ></MyCard>
              <button
          type="button" className="btn btn-primary" onClick={() => deleteCard(user.mongo._id, card.uuid)}>
            Delete
        </button>
            </div>
          );
        })}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              as="textarea"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              rows={2}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              rows={2}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Available?</Form.Label>
            <Form.Control
              onChange={(e) => setAvail(e.target.value)}
              as="select"
            >
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCard}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
