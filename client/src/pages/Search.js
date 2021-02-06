import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

function Search() {
    const user = useContext(UserContext);
    const [search, setSearch] = useState("Dark Magician");
    const [cards, setCards] = useState([]);
    

 // When the component mounts, update the title to be Wikipedia Searcher
 useEffect(() => {
    if (!search) {
      return;
    }
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${search}`)
    .then(res => {
        setCards(res.data.data);
      //   console.log(res.data);
      })
  }, [search]);
  
  const handleInputChange = event => {
      setSearch(event.target.value);
    };
    const handleFormSubmit = event => {
      event.preventDefault();
      console.log(cards);
    };

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
            <div className="container">
            <h1 className="text-center">Search For Your Cards</h1>
                <form className="search">
                <div className="form-group">
                    <label htmlFor="language">Search Term:</label>
                    <input
                    value={search}
                    onChange={handleInputChange}
                    name="term"
                    list="term"
                    type="text"
                    className="form-control"
                    placeholder="Type in a search term to begin"
                    id="term"
                    onClick={handleFormSubmit}
                    />
                </div>
                </form>
                {cards && cards.map(card => {
                    return (
                    <ul key={card.id} className="list-group search-results">
                        <li className="list-group-item">
                            {card.archetype}
                        </li>
                        <li className="list-group-item">
                            {card.description}
                        </li>
                        {/* {card.card_images.map(img => {
                            return (
                                <img src={img.image_url} alt={img.id}></img>
                            )
                        })} */}
                        {/* <li className="list-group-item">
                        </li> */}
                    </ul>
                    )
                })
                }
            </div>
        </div>
      );
}
export default Search;