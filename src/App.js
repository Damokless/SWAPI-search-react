import React, { useEffect, useState } from "react";
import CharacterCard from "./components/characterCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);

  const onChange = async (event) => {
    setSearchTerm(event.target.value);

    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`
    );
    const json = await response.json();
    const characterList = await json.results;
    setCharacters(characterList);
  };

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        for (const character of data.results) {
          setCharacters((characters) => characters.concat(character));
        }
      });
    const results = characters.filter((character) =>
      character.toLowerCase().includes(searchTerm)
    );
    setSearchTerm(results);
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to SWAPI search</h1>
        <input
          placeholder="Luke Skywalker"
          value={searchTerm}
          onChange={onChange}
          type="text"
        />
      </div>
      <div>
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </>
  );
}

export default Home;
