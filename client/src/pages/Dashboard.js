import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../utils/firebase";
import Banner from "../components/Banner";
import avatar from "../images/avatar.png";
import YourTrades from "../components/YourTrades";

function Dashboard() {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const [yourTrades, setYourTrades] = useState([]);
  console.log(yourTrades)



  // console.log(user.mongo.displayName);

  function handleSearch(event) {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    setSearch(value);
  }

  //   let x = 0;
  //   if(list && x === 0) {
  //       console.log(list)
  //       x = 1
  //     //   console.log(typeof(list))
  //   }


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
        console.log(res.data);
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
    console.log(list);
  }

  useEffect(() => {
    API.getTrade(user.mongo.displayName)
      .then((res) => {
        setYourTrades(res.data);
        // console.log(res.data.length)
        // arr.push(res.data)
        // return setYourTrades(arr)
      
      })
  }, []);

  // let arr = [];

  // function makeArray() {
  //   arr.push(yourTrades)
  // }
  // console.log(arr)

  // useEffect(() => {
  //   makeArray();
  // }, []);

  // const yourTrades= {yourTrades && yourTrades.map(trade) => {
  //       <div>
  //       </div>
  // }}
 

  return (
    <div className="container">
         <h2> Your Trades </h2>
      <div className="row">
   
       
        {yourTrades && yourTrades.map((trade) => {
            let proposedBy= ""
            let proposedTo= ""
          // console.log(trade.proposedByProducts)
        trade.proposedByProducts[0].map((name) => {
          (proposedBy === "" ? proposedBy += name.name : proposedBy += ", " + name.name)
        })

        trade.proposedToProducts[0].map((name) => {
          // proposedTo += name.name + " "
          (proposedTo === "" ? proposedTo += name.name : proposedTo += ", " + name.name)
        })

          return (
            <div className="col-8">
            
              <YourTrades
                proposedBy={trade.proposedBy}
                proposedTo={trade.proposedTo}
                proposedByProducts={proposedBy}
                proposedToProducts={proposedTo}
                currentUser={user.mongo.displayName}
              >
              </YourTrades>
            </div>
          )
        })}
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
  );
}

export default Dashboard;
