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
  console.log(yourTrades)
  console.log(user)
  const [selectedTrade, setSelectedTrade] = useState({})
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [profilePic, setProfilePic] = useState("");
  // console.log(yourTrades)

  useEffect(() => {
    API.getTrade(user.mongo.displayName)
      .then((res) => {
        setYourTrades(res.data);
      })
  }, []);

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


  useEffect(() => {
    console.log(selectedTrade)
  }, [selectedTrade]);

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


  function loadUsers() {
    API.getUsers()
      .then((res) => {
        setList(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
    getFirebaseImages();
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
      return 0;
    });
    // console.log(list);
  }

  function acceptTrade(id) {

    API.accept(id, { status: "accepted" })
      .then((res) => window.location.reload());
  }

  function declineTrade(id) {
    API.decline(id, { status: "declined" })
      .then((res) => window.location.reload());
  }

  function deleteTrade(id) {
    API.delete(id)
      .then((res) => window.location.reload());
  }

function deleteTrade(id) {
  API.delete(id)
  .then((res) => window.location.reload());
}





function makeTrade () {
  API.updateUser({
    proposedToProducts: yourTrades.proposedToProducts[0].uuid,
    proposedByProducts: yourTrades.proposedByProducts[0]
  })
  .then((res) => console.log(res));
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
        <div className="col-7">
          {!yourTrades.length >= 1 ? "" :
            <Bar  
              trade={yourTrades[0]}
              selectedTrade={selectedTrade}
            />   
          }    
          <div className= "col-2" />  
          <h2> Your Trades </h2>
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
            <div className="col-8">
            
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
                // acceptTrade={acceptTrade}

                declineTrade={declineTrade}
                deleteTrade={deleteTrade}
                status={trade.status}
                id={trade._id}
                mongoId={user.mongo._id}
                setChart={setSelectedTrade}
              >
              </YourTrades>
            </div>
          )
        })}
        </div>
          <div className="col-1">

          </div>
          <div className="col-4">
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
                          <Link to={link}>{item.displayName}</Link>
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