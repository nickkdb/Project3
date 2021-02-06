import React from "react";


function YugiohCard(props) {
  return (
    <div key="props.id" className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
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
            {props.sets.map && props.sets.map(set => {
              return (<option>{set.set_name} | {set.set_rarity}</option>)
            })}
            </select>
          </li>
        </ul>
        <button onClick={props.addCard} 
        cardData={props.cardData}
        type="button" class="btn btn-primary">
                Add
        </button>
      </div>
    </div>
  );
}

export default YugiohCard;
