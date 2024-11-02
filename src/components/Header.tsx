// Header.tsx
import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void; // Define the type for the toggleSidebar prop
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="header bg-grey rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="#9b9b9b"
        fill="none"
        className="hamburger"
        onClick={toggleSidebar}
        style={{ cursor: 'pointer' }}
      >
        <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h1>Rick and Morty Characters</h1>
    </div>
  );
};

export default Header;

