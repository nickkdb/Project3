import React from "react";


function PokemonCard(props) {
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
            <strong>Types:</strong> {props.types}
          </li>
          <li>
            <strong>Subtypes:</strong> {props.subtypes}
          </li>
          <li>
            <strong>Supertype:</strong> {props.supertype}
          </li>
          
          <li>
            <strong>HP:</strong> {props.hp}
          </li>
        
  
          <li>
            <strong>Damage:</strong> {props.damage}
          </li>
          <li>
              <strong>Rarity: </strong>{props.rarity}
          </li>
         
          <li>
            <strong>Weaknesses:</strong> {props.weaknesses}
          </li>
          {/* <li>
            <strong>Set:</strong> */}
            {/* <select>
            {props.sets.map && props.sets.map(set => {
              return (<option>{set.set_name} | {set.set_rarity}</option>)
            })}
            </select> */}
          {/* </li> */}
        </ul>
        <button onClick={props.addCard} 
        cardData={props.cardData}
        type="button" className="btn btn-primary">
                Add
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
