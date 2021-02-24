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
    API.updateCard(user.mongo._id, data).then((res) => window.location.reload());
  };



  function deleteCard(id, uuid) {
    console.log(id, uuid);
    API.deleteCard(id, uuid).then((res) => window.location.reload());
  }

  return (
    <div>
      <ProfileBanner
        pageTitle={displayName}
        avatar={avatar}
        fbImage={profilePic}
        email={email}
        userId={uid}
      />
      <div className="container">
        <div className="row">
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
                    setModalSource={setModalSource}
                    // deleteCard={deleteCard}

                  ></MyCard>
                  <Button
                    type="button"
                    className="btn btn-primary delBtn-margin"
                    onClick={() => deleteCard(user.mongo._id, card.uuid)}
                  >
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
          size="lg"
        >
          <div>
            {modalSource === "card" ? (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>Update Card</Modal.Title>
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
              </div>
            ) : (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>Set Profile Pic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <div>
                      <div>
                        {!imageAsFile && !downloaded ? (
                          <div className="m-3">
                            <div className="mb-2">
                              <h6>Choose the Image</h6>
                              <input type="file" onChange={handleFile}></input>
                            </div>
                          </div>
                        ) : tempImg && !downloaded ? (
                          <div className="m-3">
                            <div className="mb-2">
                              <h6>
                                Once you're done cropping, click "Crop Image".
                              </h6>
                              <button
                                className="btn btn-primary"
                                onClick={generateImg}
                              >
                                Crop Image
                              </button>
                            </div>
                            <div
                              style={
                                tempImg.length > 1
                                  ? {
                                      display: "block",
                                      height: "25rem",
                                      margin: "2rem",
                                    }
                                  : { display: "none" }
                              }
                            >
                              <Cropper
                                image={tempImg}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={3 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                showGrid={true}
                                style={{
                                  containerStyle: {
                                    margin: "12rem 3rem 5rem 3rem",
                                  },
                                }}
                              />
                              <RangeSlider
                                value={zoom}
                                label="Zoom"
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(changeEvent) =>
                                  setZoom(changeEvent.target.value)
                                }
                              />
                            </div>
                          </div>
                        ) : downloaded ? (
                          <div>
                            <div className="mb-3">
                              <h6>Click Download</h6>
                              <span className="ml-2">
                                <a
                                  href={croppedImage}
                                  download="croppedNerdHerd.jpeg"
                                  className="btn btn-danger"
                                  // onClick={() => {
                                  //   setDownloaded(true)
                                  // }}
                                >
                                  Download
                                  <span className={"ml-2"}></span>
                                  <FontAwesomeIcon icon={faDownload} />
                                </a>
                              </span>
                            </div>
                            <div>
                              <h6>
                                Drag your downloaded image over here, and click
                                "Save".
                              </h6>
                              <input type="file" onChange={handleFile2}></input>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleFireBaseUpload}>
                    Save
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;
