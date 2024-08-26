import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './CharacterList.css';
const CharacterList = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const publicKey = '3a55aeef83f55cc3123bf3f66a454253';
const privateKey = '8aaf49a22ce44e482f233043e2d6083f7264b81b';
const baseURL = 'https://gateway.marvel.com/v1/public/characters';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

function md5(string) {
    return CryptoJS.MD5(string).toString();
}

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        setCharacters(response.data.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [publicKey, hash]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="character-list">
      {characters.map(character => (
        <div key={character.id} className="character-card" onClick={() => onSelectCharacter(character)}>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;