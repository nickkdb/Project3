import React, { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import { auth } from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import ProfileBanner from "../components/ProfileBanner";
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
    <div>
      <ProfileBanner pageTitle={displayName} profileImg="https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png" email={email} userId={uid} />
      <div className="container">
        <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
          {user &&
            user.mongo.products.map((card) => {
              return (
                <div key={card.uuid}>
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
                  <Button
                    type="button" className="btn btn-primary delBtn-margin" onClick={() => deleteCard(user.mongo._id, card.uuid)}>
                    Delete
                  </Button>
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
      </div>
    </div>
  );
};

export default ProfilePage;
