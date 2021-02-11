import {React, useState} from "react";
import Carousel from "react-bootstrap/Carousel";

function YugiohCard(props) {

  const [image, setImage] = useState(props.initImage);
  const [set, setSet] = useState(props.initSet);

  return (
    <div key={props.id}>
      <div className="row">
        <Carousel controls={true} interval={10000}>
          {props.imageSet &&
            props.imageSet.map((image) => {
              return (
                <Carousel.Item style={{ textAlign: "center" }}>
                  <img
                    className="d-block"
                    src={image.image_url_small}
                    alt={image.id}
                  />
                  <Carousel.Caption>
                    <h5 style={{color: "black", backgroundColor: "white"}}>ID: {image.id}</h5>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      
      </div>
      <div className="card">
        {/* <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div> */}
        <div className="content">
          <ul>
          <li>
          <strong>Choose Image:</strong>
              <select
                value={image}  
                onChange={(event) => setImage(event.target.value)}
              >
                {props.imageSet &&
                  props.imageSet.map((image) => {
                    return (
                      <option>
                        {image.id}
                      </option>
                    );
                  })}
              </select>
          </li>
            <li>
              <strong>Name:</strong> {props.name}
            </li>
            <li>
              <strong>Type:</strong> {props.type}
            </li>
            <li>
              <strong>Attack:</strong> {props.attack}
            </li>
            <li>
              <strong>Defense:</strong> {props.defense}
            </li>
            <li>
              <strong>Level:</strong> {props.level}
            </li>

            <li>
              <strong>Race:</strong> {props.race}
            </li>
            <li>
              <strong>Attribute:</strong> {props.attribute}
            </li>
            <li>
              <strong>Set:</strong>
              <select
                value={set}  
                onChange={(event) => setSet(event.target.value)}
              >
                {props.sets &&
                  props.sets.map((set) => {
                    return (
                      <option>
                        Name: {set.set_name} | Rarity: {set.set_rarity}
                      </option>
                    );
                  })}
              </select>
            </li>
          </ul>
          <button
            onClick={props.openModal}
            cardData={props.cardData}
            imageUrl={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${image}.jpg`}
            cardSet={set}
            type="button"
            class="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default YugiohCard;
