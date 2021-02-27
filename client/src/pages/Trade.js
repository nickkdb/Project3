import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import API from "../utils/API";

function Trade(props) {
  const user = useContext(UserContext);
  console.log(user)
  const [trade, setTrade] = useState(
    localStorage.getItem("trade")
      ? JSON.parse(localStorage.getItem("trade"))
      : null
  );
  const [tradeItems, setTradeItems] = useState(trade ? trade.tradeItems : null);
  const [tradeUser, setTradeUser] = useState(trade ? trade.user : null)
  const [whoseCards, setWhoseCards] = useState("YourCards");
  console.log(whoseCards)

  const removeFromTrade = (uuid) => {
    console.log(uuid);
    const tempArr = tradeItems.filter((item) => item !== uuid);
    console.log(tempArr);
    setTradeItems(tempArr);
  };

  const addToTrade = (uuid) => {
    setTradeItems([...tradeItems, uuid]);
  };

  const manageWhoseCards = (x) => {
      setWhoseCards(x)
  }

  const submitTrade = () => {
    const theirProducts = tradeUser.products.filter(item => tradeItems.includes(item.uuid))
    const myProducts = user.mongo.products.filter(item => tradeItems.includes(item.uuid))
    // console.log(theirProducts)
    // console.log(myProducts)
    const trade = {
        proposedBy: user.mongo.displayName,
        proposedTo: tradeUser.displayName,
        proposedByProducts: myProducts,
        proposedToProducts: theirProducts,
        status: "pending"
        
    }

    API.createTrade(trade)
    .then(res => console.log(res))

  }

  return (
    <div>
      {whoseCards && whoseCards === "YourCards" ? 
        <div>
          <div className="container">
          <h2>Confirm the Cards you want to Trade</h2>
            <button 
            className="btn btn-primary"
            onClick={() => {
                manageWhoseCards("MyCards")
              }}
            >
            Continue</button>
          </div>
          <div className="container">
            {trade.user.products &&
              trade.user.products.map((item) => {
                return (
                  <div
                    className="row border mt-3 mb-3 p-3"
                    style={
                      tradeItems.includes(item.uuid)
                        ? { backgroundColor: "lightblue" }
                        : { backgroundColor: "white" }
                    }
                  >
                    <div className="col">
                      <img width={"75px"} alt={item.name} src={item.image} />
                    </div>
                    <div className="col">{item.name}</div>
                    <div className="col">
                      {tradeItems && tradeItems.includes(item.uuid) ? (
                        <button
                          onClick={() => {
                            removeFromTrade(item.uuid);
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addToTrade(item.uuid);
                          }}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
       : 
        <div>
          <div className="container">
          <h2>Which of Your Cards Will you Offer?</h2>
          <button 
            className="btn btn-primary"
            onClick={() => {
                manageWhoseCards("YourCards")
              }}
            >
            Re-Pick Cards You Want</button>
            <button 
            className="btn btn-success"
            onClick={() => {
                submitTrade()
              }}
            >
            Submit</button>

          </div>
          <div className="container">
            {user.mongo.products &&
              user.mongo.products.map((item) => {
                return (
                  <div
                    className="row border mt-3 mb-3 p-3"
                    style={
                      tradeItems.includes(item.uuid)
                        ? { backgroundColor: "lightblue" }
                        : { backgroundColor: "white" }
                    }
                  >
                    <div className="col">
                      <img width={"75px"} alt={item.name} src={item.image} />
                    </div>
                    <div className="col">{item.name}</div>
                    <div className="col">
                      {tradeItems && tradeItems.includes(item.uuid) ? (
                        <button
                          onClick={() => {
                            removeFromTrade(item.uuid);
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addToTrade(item.uuid);
                          }}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      }
    </div>
  );
}

export default Trade;
