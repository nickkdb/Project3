import React from "react";

function mtgCard(props) {
  return (
    <div key={props.id} className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Colors: </strong>
            {/* {props.colors &&
              props.colors.map((color) => {
                return <>{color}</>;
              })} */}

        {props.colors && props.colors.length > 1 &&
            props.colors.map((color, index) => {
              index =+ index
              return index === (props.colors.length - 1) ? <span>{color}</span> : <span>{color},&nbsp;</span>
            })}
          {props.colors && props.colors.length === 1 &&
            props.colors.map((color) => {
              return <span>{color}</span>
            })}
          </li>
          <li>
            <strong>Subtypes:</strong>{" "}
            {props.subtypes &&
              props.subtypes.map((subtype) => {
                return <>{subtype}</>;
              })}
          </li>
          <li>
            <strong>Supertype:</strong>{" "}
            {props.supertypes &&
              props.supertypes.map((supertype) => {
                return <>{supertype}</>;
              })}
          </li>

          <li>
            <strong>Set:</strong> {props.set}
          </li>
          <li>
            <strong>Rarity: </strong>
            {props.rarity}
          </li>
          <li>
              <strong>Manna Cost: </strong>{props.manna}
          </li>
          <li>
            <strong>Description: </strong>{props.text}
          </li>
        </ul>
        <button
          onClick={props.openModal}
          cardData={props.cardData}
          type="button"
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default mtgCard;