import React from "react";


function PokemonCard(props) {
  return (
    <div key={props.id} className="card">
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
            <strong>Attacks:</strong> {props.damage &&
                  props.damage.map((attk) => {
                    return (
                      <div>
                      <div>
                         Name: {attk.name}
                      </div>
                      <div>
                        Damage: {(attk.damage.length) < 1 ? "N/A" : (attk.damage) }
                      </div>
                      </div>
                    );
                  })}
          </li>
          <li>
              <strong>Rarity: </strong>{props.rarity}
          </li>
         
          <li>
            <strong>Weakness:</strong> {props.weakness &&
                  props.weakness.map((weak) => {
                    return (
                  
                      <>
                        {/* Damage: {(attk.weakness.length) < 1 ? "N/A" : (attk.damage) } */}
                        {weak.type}
                      </>
                   
                    );
                  })}
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
        <button onClick={props.openModal} 
        cardData={props.cardData}
        type="button" className="btn btn-primary">
                Add
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
