import React, { useContext, useEffect, useState, useCallback } from "react";
import UserContext from "../utils/UserContext";
import { auth, storage } from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import { Modal, Button, Form } from "react-bootstrap";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import Cropper from "react-easy-crop";
import getCroppedImg from '../utils/cropper'
import Base64 from "base64-img"

const ProfilePage = () => {
  // updating products
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [avail, setAvail] = useState("Yes");
  const [uuid, setuuid] = useState("");

  // cropping an iamge
  const [tempImg, setTempImg] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  //uploading image to FB
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [profilePic, setProfilePic] = useState("");

  const user = useContext(UserContext);
  const { photoURL, displayName, email, uid } = user;

  const handleFile = (e) => {
    // console.log(e);
    const img = e.target.files[0];
    console.log(img)
    setTempImg(URL.createObjectURL(img));
    setImageAsFile(img);
  };

  // if (tempImg) {
  //   console.log(tempImg);
  // }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


 const generateImg = async() => { 
   try {
    const a = await getCroppedImg(
      tempImg,
      croppedAreaPixels,
      rotation
    )
    console.log('donee', a)
    // let x = Base64.img(a, '', user.uid, function(err, filepath) {})
    // console.log(x);
    setCroppedImage(a)
  } catch (e) {
    console.error(e)
  }
}

  if (croppedImage){
  var test = new File([croppedImage], user.uid);
  console.log(test)
  // console.log(croppedImage)
  }


  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");

    const uploadTask = storage.ref(`/images/${user.uid}`).put({croppedImage});
    
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
          .child(user.uid)
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

  useEffect(() => {
    storage
      .ref("images")
      .child(user.uid)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        console.log(fireBaseUrl)
        setProfilePic(fireBaseUrl);
      });
  }, [user.uid]);

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

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${profilePic})  no-repeat center center`,
            backgroundSize: "cover",
            height: "300px",
            width: "300px",
          }}
          className="border border-blue-300"
        ></div>
        {/* <img src={croppedImage}></img> */}
        <a href={croppedImage} download="proposed_file_name">Download</a>
        <button onClick={generateImg}>BLOB</button>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <h3 className="italic">{email}</h3>
          <h3 className="italic">{uid}</h3>
        </div>
        <div className="container">
          <div style={tempImg.length > 1 ? {height: "500px"} : {}} className="row">
          <form className="col" onSubmit={handleFireBaseUpload}>
            <div>
              <input type="file" onChange={handleFile}></input>
            </div>
            <div>
              <button className="btn btn-primary" formAction="submit">
                Upload
              </button>
            </div>
          </form>
          <div style={tempImg.length > 1 ? {display: "block"} : {display: 'none'}} className="col">
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
          />
          <RangeSlider
            value={zoom}
            label="Zoom"
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(changeEvent) => setZoom(changeEvent.target.value)}
          />
        </div>
          </div>
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
                addCard={updateCard}
                setuuid={setuuid}
              ></MyCard>
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