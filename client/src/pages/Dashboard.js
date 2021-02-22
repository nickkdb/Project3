import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../utils/firebase";
import Banner from "../components/Banner";
import avatar from "../images/avatar.png";

function Dashboard() {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);

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

  useEffect(() => {
    API.getTrade(user.mongo.displayName).then(res => console.log(res.data))
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">CHARTS GO HERE</div>
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
