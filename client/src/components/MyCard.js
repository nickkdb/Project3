import React from "react";


function MyCard(props) {
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
            <strong>Description:</strong> {props.description}
          </li>
          <li>
            <strong>Price:</strong> {props.price}
          </li>
          <li>
            <strong>Available:</strong> {props.available}
          </li>
        
          <li>
            Attributes: 
            {/* map the attributes dynamically here based on card type */}
          </li>
        </ul>
        <button 
          onClick={() => {
          props.openModal()
          // props.postData(props.cardData);
        }} 
        // cardData={props.cardData}
        type="button" className="btn btn-primary">
                Update
        </button>
      </div>
    </div>
  );
}

export default MyCard;
