import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
// import {auth} from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import { useLocation } from "react-router-dom";
import avatar from "../images/avatar.png";
import { storage } from "../utils/firebase";
import { Link } from "react-router-dom";
import CustomLink from "../components/customLink";

const ProfilePage = () => {
  const location = useLocation();
  let regex = /profile\/[a-z0-9-_]+/gi;
  let x = location.pathname.match(regex);
  x = x[0].split("/")[1];
  console.log(x);

  const [thisUser, setThisUser] = useState({});
  const [trade, setTrade] = useState([]);
  // const [interested, setInterested] = (false)

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    API.getProfile(x)
      .then((res) => setThisUser(res.data))
      .catch((err) => console.error(err));
  }

  // function getFirebaseImage() {
  //   storage
  //     .ref("images")
  //     .child(thisUser._id)
  //     .getDownloadURL()
  //     .then((fireBaseUrl) => {
  //       console.log(fireBaseUrl);
  //       thisUser.image = fireBaseUrl;
  //     });
  // }

  if (thisUser) {
    console.log(thisUser);
    // getFirebaseImage()
  }

  const user = useContext(UserContext);
  const { photoURL, displayName } = thisUser;

  const addToTrade = (uuid) => {
    console.log(uuid);
    setTrade([...trade, uuid]);
  };

  const removeFromTrade = (uuid) => {
    console.log(uuid);
    const tempArr = trade.splice(trade.indexOf(uuid), 1);
    console.log(tempArr);
    setTrade(tempArr);
  };

  const handleChat= () => {
    let arr= [user.displayName.toLowerCase(), displayName.toLowerCase()];
    let sorted= arr.sort();
    let room= `${sorted[0]}-${sorted[1]}`;
    console.log(room);

    let data= {
      user: user.displayName,
      otherUser: displayName,
      room: room
    }

    API.createChatRoom(data)
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  // if (trade.length >= 1) {
  //   console.log(trade);
  // }

  const setLocalTrade = () => {
    let localTrade = { user: thisUser, tradeItems: trade };
    localStorage.setItem("trade", JSON.stringify(localTrade));
  };

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={
            thisUser.image ?
            {
            background: `url(${thisUser.image})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }
          :
          {
            background: `url(${avatar})  no-repeat center center`,
            backgroundSize: "contain",
            height: "200px",
            width: "200px",
          }

        }
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
        </div>
      </div>
      <CustomLink to="/messages" 
      children= {<button onClick={handleChat} className="w-full py-3 bg-red-600 mt-4 text-white">Chat</button>} />
      <button className="btn btn-success" onClick={setLocalTrade}>
        <Link to="/trade" className="text-blue-500 hover:text-blue-600">
          Propose Trade
        </Link>
      </button>
      {thisUser.products &&
        thisUser.products.map((card) => {
          return (
            <div key={card.uuid} className="col-6">
              <MyCard
                key={card.uuid}
                uuid={card.uuid}
                profileType={location.pathname}
                name={card.name}
                category={card.category}
                description={card.description}
                available={card.available}
                image={card.image}
                price={card.price}
                attributes={card.attributes}
                addToTrade={addToTrade}
                removeFromTrade={removeFromTrade}
              ></MyCard>
            </div>
          );
        })}
    </div>
  );
};

export default ProfilePage;
