import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import './App.css'; 

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="app">
      <CharacterList onSelectCharacter={handleSelectCharacter} />
      <CharacterDetail character={selectedCharacter} />
    </div>
  );
};

export default App;
