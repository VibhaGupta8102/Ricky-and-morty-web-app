import React from 'react';
import { Character } from './types';

interface MainViewProps {
  characters: Character[];
  currentPage: number;
  charactersPerPage: number;
  onPageChange: (page: number) => void;
}

const MainView: React.FC<MainViewProps> = ({ characters, currentPage, charactersPerPage, onPageChange }) => {
  // Calculate the indices for the current page characters
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const paginatedCharacters = characters.slice(startIndex, endIndex);

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  return (
    <div className="main-view">
      <h3>{characters.length} Characters in total</h3>
      <div className="cardContainer">
        {paginatedCharacters.map((character, index) => (
          <div key={index} className="character-card rounded bg-medium">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainView;



