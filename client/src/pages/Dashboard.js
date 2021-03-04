import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../utils/firebase";
import ProfileBanner from "../components/ProfileBanner";
import avatar from "../images/avatar.png";
import Bar from "../components/Bar";
import YourTrades from "../components/YourTrades";

function Dashboard() {
  const user = useContext(UserContext);
  const { displayName, email, uid } = user;
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [yourTrades, setYourTrades] = useState([]);

  const [selectedTrade, setSelectedTrade] = useState({})
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [profilePic, setProfilePic] = useState("");  

  useEffect(() => {
    API.getTrade(user.mongo.displayName)
      .then((res) => {
        setYourTrades(res.data);
      })
  }, [yourTrades]);

  useEffect(() => {
    storage
      .ref("images")
      .child(user.mongo._id)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        console.log(fireBaseUrl);
        setProfilePic(fireBaseUrl);
      });
  }, [user.mongo._id, imageAsUrl]);


  // useEffect(() => {
  //   console.log(selectedTrade)
  // }, [selectedTrade]);

  function handleSearch(event) {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    setSearch(value);
  }


  function filterSearch() {
    let lowerSearch = search.toLocaleLowerCase();
    if (search && list) {
      let c = list.map((x) => JSON.stringify(x));
      let temp = c
        .filter((user) => user.toLocaleLowerCase().includes(lowerSearch) === true)
        .map((x) => JSON.parse(x));
      setSearchList(temp);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    getFirebaseImages();
  }, [list]);

  function loadUsers() {
    API.getUsers()
      .then((res) => {
        setList(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function getFirebaseImages() {
    list.map((user) => {
      storage
        .ref("images")
        .child(user._id)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          user.image = fireBaseUrl;
        });
    });
  }

  // if (list) {
  //   getFirebaseImages();
  // }

  function acceptTrade(id) {

    API.accept(id, { status: "accepted" })
      .then((res) => 
        API.getTrade(user.mongo.displayName)
        .then((res) => {
          setYourTrades(res.data);
        })
      );
  }

  function declineTrade(id) {
    API.updateStatus(id, { status: "declined" })
      .then((res) => 
      API.getTrade(user.mongo.displayName)
      .then((res) => {
        setYourTrades(res.data);
      })
    );
  }


function deleteTrade(id) {
  API.delete(id)
  .then((res) => yourTrades.splice(yourTrades.indexOf(id), 1));
}

function cancelTrade(id) {
API.updateStatus(id, {status: "canceled" })
.then((res) => window.location.reload());
}


function makeTrade (trade) {
  console.log(trade)

  API.executeTrade(trade)
  .then((res) => {
    console.log(res)
    // acceptTrade(yourTrades[2]._id)
  });

  // window.location.reload();
}
 

  return (
    <div>
    <ProfileBanner
    pageTitle={displayName}
    avatar={avatar}
    fbImage={profilePic}
    email={email}
    userId={uid}
    // updatePicButton={updatePicButton}
  />
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {!yourTrades.length >= 1 ? "" :
            <Bar  
              trade={yourTrades[0]}
              selectedTrade={selectedTrade}
            />   
          }  
          <br />  
          <h2 className="text-center"> Your Trades </h2>
        {yourTrades && yourTrades.map((trade) => {
            let proposedBy= ""
            let proposedTo= ""
          // console.log(trade.proposedByProducts)
        trade.proposedByProducts.map((name) => {
          (proposedBy === "" ? proposedBy += name.name : proposedBy += ", " + name.name)
        })

        trade.proposedToProducts.map((name) => {
          // proposedTo += name.name + " "
          (proposedTo === "" ? proposedTo += name.name : proposedTo += ", " + name.name)
        })

        // console.log(trade)
          return (
            <div className="col-md-8">
            
              <YourTrades
                tradeObj={trade}
                proposedBy={trade.proposedBy}
                proposedTo={trade.proposedTo}
                proposedByProducts={proposedBy}
                proposedToProducts={proposedTo}
                proposedByName={proposedBy.name}
                proposedToName={proposedTo.name}
                currentUser={user.mongo.displayName}
                makeTrade={makeTrade}
                acceptTrade={acceptTrade}
                selectedTrade={selectedTrade}
                declineTrade={declineTrade}
                deleteTrade={deleteTrade}
                cancelTrade={cancelTrade}
                status={trade.status}
                id={trade._id}
                mongoId={user.mongo._id}
                setChart={setSelectedTrade}
              >
              </YourTrades>
              <br />
            </div>
          )
        })}
        </div>
          <div className="col-md-4">
            <br />
            <form className="search">
              <div className="form-group">
                <label htmlFor="language">Search for values in any column:</label>
                <input
                  value={search}
                  onChange={handleSearch}
                  name="term"
                  list="term"
                  type="text"
                  className="form-control"
                  placeholder="What are you looking for?"
                  id="term"
                />
                <small id="passwordHelpBlock" className="form-text text-muted">
                  * Search by displayName, card name, or card type. Results
                  include the username. Click to view profile and cards.
              </small>
              </div>
              <button
                type="button"
                onClick={filterSearch}
                className="btn btn-primary ml-2 mb-4 mt-2"
              >
                Search
            </button>
              {searchList &&
                searchList.map((item) => {
                  let link = `profile/${item.displayName}`;
                  return (
                    <div className="row border">
                      <div className="col">
                        <img
                          src={
                            item.image ? item.image
                              : avatar
                          }
                          alt={item.displayName + "Image"}
                          style={{ width: "50%" }}
                        ></img>
                      </div>
                      <div className="col">
                        <p>
                          <Link className="link" to={link}>{item.displayName}</Link>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </form>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Dashboard;