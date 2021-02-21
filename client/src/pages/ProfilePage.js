import React, { useContext, useEffect, useState, useCallback } from "react";
import UserContext from "../utils/UserContext";
import { auth, storage } from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import ProfileBanner from "../components/ProfileBanner";
import { Modal, Button, Form } from "react-bootstrap";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropper";

const ProfilePage = () => {
  // updating products
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [avail, setAvail] = useState("Yes");
  const [uuid, setuuid] = useState("");
  const [modalSource, setModalSource] = useState("");

  // cropping an iamge
  const [tempImg, setTempImg] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  //uploading image to FB
  const [imageAsFile, setImageAsFile] = useState("");
  const [finalImage, setFinalImage] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [profilePic, setProfilePic] = useState("");
  // const [reRender, setReRender] = useState(false);


  const user = useContext(UserContext);
  const { displayName, email, uid } = user;

  const handleFile = (e) => {
    // console.log(e);
    const img = e.target.files[0];
    console.log(img);
    setTempImg(URL.createObjectURL(img));
    setImageAsFile(img);
  };

  const handleFile2 = (e) => {
    const img = e.target.files[0];
    console.log(img);
    setFinalImage(img);
  };


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


  const generateImg = async () => {
    try {
      const a = await getCroppedImg(tempImg, croppedAreaPixels, rotation);
      const tempFile = new File([a], 'uhhh', {type: "image/jpeg"})
      setCroppedImage(a);
      console.log(tempFile)
    } catch (e) {
      console.error(e);
    }
  };


  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    handleClose();
    console.log("start of upload");

    const uploadTask = storage.ref(`/images/${user.mongo._id}`).put( finalImage );

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(user.mongo._id)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };

  // YOU NEED TO STORE THE IMAGE AS THE ACTUAL FILENAME W/ THEIR ID ATTACHED
  // WHEN STORING, SEND THE SAME INFO TO MONGO
  // SO WHEN CALLED, YOU CAN USE MONGO TO INFER TO ROUTE FOR THE IMAGE 

  useEffect(() => {
    storage
      .ref("images")
      .child(user.mongo._id)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        console.log(fireBaseUrl);
        setProfilePic(fireBaseUrl);
      });
  }, [user.mongo._id]);

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

    const data = {
      available: newAvail,
      price: price,
      description: descr,
      uuid: uuid,
    };

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
        {profilePic ? (
          <div>
          <div
            style={{
              background: `url(${profilePic})  no-repeat center center`,
              backgroundSize: "cover",
              height: "300px",
              width: "300px",
            }}
            className="border border-blue-300"
          ></div>
          <button
          className="btn btn-primary mt-3"
          onClick={() => {
            handleShow();
            setModalSource("profilePic");
          }}
        >
          Update Profile Pic
        </button>
        </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => {
              handleShow();
              setModalSource("profilePic");
            }}
          >
            Set Profile Pic
          </button>
        )}
        {/* <img src={croppedImage}></img> */}

        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">
            Display Name: {displayName}
          </h2>
          <h3 className="italic">Email: {email}</h3>
          <h3 className="italic">UID: {uid}</h3>
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
                setModalSource={setModalSource}
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
                    <div className="m-3">
                    <div className="mb-2">
                      <h5>Choose the Image</h5>
                        <input type="file" onChange={handleFile}></input>
                      </div>
                      <div className="mb-2">
                        <h5>Once you're done cropping, click "Crop Image", then "Download".</h5>
                      <button className="btn btn-primary" onClick={generateImg}>Crop Image</button>
                      <span className="ml-2"><a href={croppedImage} download="nerherdprofile.jpeg">
                        Download
                      </a></span>
                      </div>
                    </div>
                    <div
                      style={
                        tempImg.length > 1
                          ? { display: "block", height: "25rem", margin: "2rem"}
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
                        style={{containerStyle: {margin: "12rem 3rem 5rem 3rem"}}}
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
                <div>
                <div>
                  {croppedImage ?
                  <div>
                    <h5>Drag your downloaded image over here, and click "Save".</h5>
                    <input type="file" onChange={handleFile2}></input>
                    </div>
                    :
                    ""
                  }
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
  );
};

export default ProfilePage;
