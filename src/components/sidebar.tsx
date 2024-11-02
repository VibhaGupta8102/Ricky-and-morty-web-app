import React from 'react';
import { Episode } from './types';
// import '../index.css'

interface SidebarProps {
  episodes: Episode[];
  selectedEpisode: number | null;
  onEpisodeSelect: (id: number) => void;
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ episodes, selectedEpisode, onEpisodeSelect, isVisible }) => {
  return (
    <div className={`sidebar bg-grey ${isVisible ? 'visible' : ''}`}>
      <h3>Episode List</h3>
      <div className="episode-list">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className={`episode-item bg-medium rounded ${selectedEpisode === episode.id ? 'selected' : ''}`}
          onClick={() => onEpisodeSelect(episode.id)}
        >
          {episode.name}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;
