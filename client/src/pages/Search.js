import React, { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import axios from "axios";
import YugiohCard from "../components/yuigiohCard";
import PokemonCard from "../components/PokemonCard";
import MtgCard from "../components/mtgCard";
import API from "../utils/API";

function Search() {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("Charizard");
  const [yCards, setYCards] = useState([]);
  const [pCards, setPCards] = useState([]);
  const [mCards, setMCards] = useState([]);
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
            setYCards(res.data.data);
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

    //mtg
    if (searchType === "MTG") {
        axios
        .get(`https://api.magicthegathering.io/v1/cards?name=${search}`)
        .then((res) => {
          setMCards(res.data.cards);
            console.log(res.data.cards);
        });
    }


  };

  const addCard = (event) =>{
    console.log(event);
    let x = event.target.attributes[0].value;
    let img = event.target.attributes[1].value;
    let set = event.target.attributes[2].value;
    let data = JSON.parse(x)
    if (data.category === "Yugioh!") {
      data.image = img;
      data.attributes.set = set;
    }
    console.log(data)
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
                <option name="MTG">MTG</option>
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
        {yCards &&
          yCards.map((card) => {
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
                initImage={card.card_images[0].id}
                imageSet={card.card_images}
                sets={card.card_sets}
                initSet={`${card.card_sets[0].set_name} | ${card.card_sets[0].set_rarity}`}
                addCard={addCard}
                searchType={searchType}
                cardData={JSON.stringify({
                  id: card.id,
                  name: card.name,
                  description: "",
                  category: searchType,
                  price: 10,
                  available: true,
                  // image: card.card_images[0].image_url_small,
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

          <div className="row align-items-center">
          {pCards && 
          pCards.map((pCard) => {
            return (
              <div key={pCard.id} className="col-6">
              <PokemonCard
              key={pCard.id}
              name={pCard.name}
              types={pCard.types}
              subtypes={pCard.subtypes}
              supertype={pCard.supertype}
              hp={pCard.hp}
              rarity={pCard.rarity}
              damage={pCard.attacks}
              weakness={pCard.weaknesses}
              image={pCard.images.small}
              addCard={addCard}
              searchType={searchType}
              cardData={JSON.stringify({
                id: pCard.id,
                name: pCard.name,
                description: "",
                category: searchType,
                price: 10,
                available: true,
                image: pCard.images.small,
                attributes: {
                  types: pCard.types,
                  subtypes: pCard.subtypes,
                  supertype: pCard.supertype,
                  hp: pCard.hp,
                  rarity: pCard.rarity,
                  damage: pCard.attacks,
                  weakness: pCard.weaknesses
                }
              })}
              >
              </PokemonCard>
              </div>
            )
          })}
          </div>

          <div className="row align-items-center">
          {mCards && 
          mCards.map((mCard) => {
            return (
              <div className="col-6">
              <MtgCard
              key={mCard.id}
              name={mCard.name}
              image={mCard.imageUrl}
              colors={mCard.colors}
              subtypes={mCard.subtypes}
              supertype={mCard.supertypes}
              set={mCard.set}
              manna={mCard.manaCost}
              rarity={mCard.rarity}
              text={mCard.text}
              addCard={addCard}
              searchType={searchType}
              cardData={JSON.stringify({
                id: mCard.id,
                name: mCard.name,
                description: mCard.text,
                category: searchType,
                price: 10,
                available: true,
                image: mCard.imageUrl,
                attributes: {
                  colors: mCard.colors,
                  subtypes: mCard.subtypes,
                  supertype: mCard.supertypes,
                  set: mCard.set,
                  manna: mCard.manaCost,
                  rarity: mCard.rarity
                }
              })}
              >
              </MtgCard>
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
