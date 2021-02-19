import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

function MyCard(props) {
  // console.log(Object.entries(props.attributes))
  // console.log(props);

  return (
    <div>
      <div key={props.id} className="card myCard shadow p-3 bg-white rounded">
        <div className="row">
          <div className="col-md-5">
            <img className="img-fluid tradingCard shadow" alt={props.name} src={props.image} />
          </div>
          <div className="col-md-7">
            <div className="row">
              <ul>
                <li>
                  <strong>Name:</strong> {props.name}
                </li>
                <li>
                  <strong>Description:</strong> {props.description}
                </li>
                <li>
                  <strong>Price:</strong> ${props.price}
                </li>
                <li>
                  <strong>Available:</strong> {props.available === true ? "Yes" : "No"}
                </li></ul></div>
            <div className="row catAtt">
            <div className="row bottom-border">
              Category Attributes:</div>
            <ul><li>

                {/* map the attributes dynamically here based on card type */}
                {
                  Object.entries(props.attributes).map(([key, value]) => {
                    switch (key) {
                      case 'types':
                        return <div><p>Types: </p> {value.map(item => {
                          return (
                            <p><strong>Type: </strong>{item}</p>
                          )
                        })}
                        </div>
                      case 'subtypes':
                        return <div><p>Subtypes: </p> {value.map(item => {
                          return (
                            <p><strong>Subtype: </strong>{item}</p>
                          )
                        })}
                        </div>
                      case 'hp':
                        return <p><strong>HP: </strong>{value}</p>
                      case 'rarity':
                        return <p><strong>Rarity: </strong>{value}</p>
                      case 'manna':
                        return <p><strong>Manna: </strong>{value}</p>
                      case 'damage':
                        return <div><p>Attacks: </p> {value.map(item => {
                          return (
                            <>
                              <p><strong>Name: </strong>{item.name}</p>
                              <p><strong>Damage: </strong>{item.damage && (item.damage.length) > 1 ? (item.damage) : "N/A"}</p>
                            </>
                          )
                        })}
                        </div>
                      case 'weakness':
                        return <div><p>Threats: </p> {value.map(item => {
                          return (
                            <>
                              <p><strong>Type: </strong>{item.type}</p>
                              <p><strong>Value: </strong>{item.value && (item.value.length) > 1 ? (item.value) : "N/A"}</p>
                            </>
                          )
                        })}
                        </div>
                      case 'colors':
                        return <div><p>Colors: </p> {value.map(item => {
                          return (
                            <p><strong>Color: </strong>{item}</p>
                          )
                        })}
                        </div>
                      case 'set':
                        return <p><strong>Set: </strong>{value}</p>
                      case 'type':
                        return <p><strong> Type: </strong>{value}</p>
                      case 'level':
                        return <p><strong>Level: </strong>{value}</p>
                      case 'race':
                        return <p><strong>Race: </strong>{value}</p>
                      case 'attribute':
                        return <p><strong>Attribute: </strong>{value}</p>
                      default:
                        return null;
                    }
                  })
                }
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {props.profileType ?
        <Button
          onClick={() => {
            props.openModal()
            // props.postData(props.cardData);
          }}
          // cardData={props.cardData}
          type="button" className="btn btn-primary">
          Trade
        </Button>
        :
        <Button
          onClick={() => {
            props.openModal()
            props.setuuid(props.uuid);
          }}
          // cardData={props.cardData}
          type="button" className="btn btn-primary">
          Update
        </Button>
      }
    </div >
  );
}

export default MyCard;
