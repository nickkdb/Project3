import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

function Search() {
    const user = useContext(UserContext);
    const [search, setSearch] = useState("Dark Magician");
    const [cards, setCards] = useState([]);
    

 // When the component mounts, update the title to be Wikipedia Searcher
 

    //will send the selected book to the api post request
//   function save(cards) {
//     console.log(cards)
//     API.putUser({
//       name:
//       description:
//       category:
//       price:
//       available:
//       attributes: 
//     })
//       .then(res => console.log("saved"))
//       .catch(err => console.log(err))
//   }


    return (
        <div>
           
         
        </div>
      );
}
export default Search;