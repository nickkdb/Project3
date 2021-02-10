import React from "react";
import Carousel from "react-bootstrap/Carousel";

function YugiohCard(props) {
  return (
    <div key={props.id}>
      <div>
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
                  {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption> */}
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
            {/* <li>
            <strong>Images:</strong>
            <select>
            {props.sets.map && props.sets.map(set => {
              return (<option>{set.set_name} | {set.set_rarity}</option>)
            })}
            </select>
          </li> */}
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
              <select>
                {props.sets &&
                  props.sets.map((set) => {
                    return (
                      <option>
                        <ul>
                          <li>
                            Name: {set.set_name}
                          </li>
                          <li>
                            Rarity: {set.set_rarity}
                          </li>
                        </ul> 
                      </option>
                    );
                  })}
              </select>
            </li>
          </ul>
          <button
            onClick={props.addCard}
            cardData={props.cardData}
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
