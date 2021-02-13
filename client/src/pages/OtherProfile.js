import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import {auth} from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import {useLocation} from "react-router-dom"


const ProfilePage = () => {
  
  const location = useLocation();
  let regex= /profile\/[a-z0-9-_]+/ig;
  let x= location.pathname.match(regex);
  x = x[0].split("/")[1]; 
  console.log(x)

  const [thisUser, setThisUser] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    API.getProfile(x).then(res =>
      setThisUser(res.data)
    ).catch(err => console.error(err))
  }

  if (thisUser) {
    console.log(thisUser);
  }

  

  const user = useContext(UserContext);
  const {photoURL, displayName} = thisUser;

  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        </div>
      </div>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white">Chat</button>
      {thisUser.products && thisUser.products.map(card => {
        return(
              <div key={card.uuid} className="col-6">
              <MyCard
                key={card.uuid}
                name={card.name}
                category={card.category}
                description={card.description}
                available={card.available}
                image={card.image}
                price={card.price}
                attributes={card.attributes}
              >
              </MyCard>
              </div>
      )})}
    </div>
  )
  
};

export default ProfilePage;