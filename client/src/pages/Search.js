import React, { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import axios from "axios";
import YugiohCard from "../components/yuigiohCard";
import PokemonCard from "../components/PokemonCard";
import API from "../utils/API";

function Search() {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("Charizard");
  const [cards, setCards] = useState([]);
  const [pCards, setPCards] = useState([]);
  const [searchType, setSearchType] = useState("Pokemon");
  // console.log(user)

  // const [mongoUser, setMongoUser] = useState({});
 
  // useEffect(() => {
  //   API.getUser(user.email).then(res =>
  //     setMongoUser(res.data[0])
  //   ).catch(err => console.error(err))
  // }, []);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
 
    if (!search) {
        return;
      }
  
      // yugioh
      if (searchType === "Yugioh!") {
          axios
          .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${search}`)
          .then((res) => {
            setCards(res.data.data);
              console.log(res.data.data);
          });
      }

      //pokemon
      if (searchType === "Pokemon") {
        axios
        .get(`https://api.pokemontcg.io/v2/cards?q=name:${search}`)
        .then((res) => {
         setPCards(res.data.data);
           console.log(res.data.data);
           
        });
    }
    // console.log(pCards);

    // mtg
    // if (searchType === "MTG") {
    //     axios
    //     .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${search}`)
    //     .then((res) => {
    //       setCards(res.data.data);
    //         console.log(res.data.data);
    //     });
    // }


  };

  const addCard = (event) =>{
    let x = event.target.attributes[0].value;
    let data = JSON.parse(x)
    API.addCard(user.mongo._id, data).then(res => console.log(res));
  }


  return (
    <div>
      <div className="container">
        <h1 className="text-center">Search For Your Cards</h1>

        <form className="search container">
          <div className="row">
            <div className="col">
              <label htmlFor="type">Choose a brand:</label>
              <select id="type" className="form-control" value={searchType}  
              onChange={(event) => setSearchType(event.target.value)
              }>
                <option name="Yugioh">Yugioh!</option>
                <option name="Pokemon" >Pokemon</option>
                <option name="MTG">Magic the Gather</option>
              </select>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="card">Search Term:</label>
                <input
                  value={search}
                  onChange={handleInputChange}
                  name="card"
                  list="term"
                  type="text"
                  className="form-control"
                  placeholder="Type in a search term to begin"
                  id="card"
                />
              </div>
            </div>
            <div className="col">
              <button onClick={handleFormSubmit} type="button" className="btn btn-primary">
                Search Cards
              </button>
            </div>
          </div>
        </form>
        <div className="renderCards container">
        {cards &&
          cards.map((card) => {
            return (
              <YugiohCard
                key={card.id}
                id={card.id}
                name={card.name}
                type={card.type}
                attack={card.attack}
                defense={card.defense}
                level={card.level}
                race={card.race}
                attribute={card.attribute}
                image={card.card_images[0].image_url_small}
                imageSet={card.card_images}
                sets={card.card_sets}
                addCard={addCard}
                searchType={searchType}
                cardData={JSON.stringify({
                  id: card.id,
                  name: card.name,
                  description: "",
                  category: searchType,
                  price: 10,
                  available: true,
                  image: card.card_images[0].image_url_small,
                  attributes: {
                    attack: card.attack,
                    type: card.type,
                    defense: card.defense,
                    level: card.level,
                    race: card.race,
                    attribute: card.attribute
                  }
                })}
              >
              </YugiohCard>
            );
          })}

          <div className="row align-items-center poke">
          {pCards && 
          pCards.map((pCard) => {
            return (
              <div className="col-6">
              <PokemonCard
              key={pCard.id}
              name={pCard.name}
              types={pCard.types}
              subtypes={pCard.subtypes}
              supertype={pCard.supertype}
              hp={pCard.hp}
              rarity={pCard.rarity}
         
              damage={JSON.stringify({
                damage: pCard.attacks})}
              // damage={pCard.attacks.damage}
              weaknesses={JSON.stringify({
                weakness: pCard.weaknesses
              }
            
            )}
           
            // weaknesses={pCard.toString().weaknesses.type}
              image={pCard.images.small}
      
              >
              </PokemonCard>
              </div>
            )
          })}
          </div>
          </div>
      </div>
    </div>
  );
}
export default Search;
