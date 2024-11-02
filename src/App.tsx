import React, { useState, useEffect } from 'react';
import { fetchEp, fetchCh } from './components/rmAPI';
import Sidebar from './components/sidebar';
import MainView from './components/Main';
import { Episode, Character } from './components/types';
import Header from './components/Header';
import './index.css';
import axios from 'axios';

const App: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Toggle function to show/hide the sidebar
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const loadEpisodes = async () => {
      const episodesData = await fetchEp();
      setEpisodes(episodesData);
    };
    loadEpisodes();
    loadInitialCharacters();
  }, []);

  const loadInitialCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      const initialCharacters = response.data.results.map((character: any) => ({
        id: character.id,
        name: character.name,
        image: character.image,
        url: character.url,
      }));
      setCharacters(initialCharacters);
    } catch (error) {
      console.error("Error fetching initial character data:", error);
    }
  };

  const handleEpisodeSelect = async (episodeId: number | null) => {
    setSelectedEpisode(episodeId);
    setCurrentPage(1); // Reset to the first page on episode selection

    if (episodeId === null) {
      loadInitialCharacters();
    } else {
      const charactersData = await fetchCh(episodeId);
      const fetchedData = await Promise.all(
        charactersData.map(async (character: any) => {
          const response = await axios.get(character);
          return { ...character, name: response.data.name, image: response.data.image };
        })
      );
      setCharacters(fetchedData);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='bg-black main-container'>
      <Header toggleSidebar={toggleSidebar}/>
      <div className="app-container">
        <Sidebar
          episodes={episodes}
          selectedEpisode={selectedEpisode}
          onEpisodeSelect={(id) => handleEpisodeSelect(id === selectedEpisode ? null : id)}
          isVisible={isSidebarVisible}
        />
        <MainView
          characters={characters}
          currentPage={currentPage}
          charactersPerPage={charactersPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
