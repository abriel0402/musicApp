import React, { useState } from 'react';
import { useSignOut } from 'react-auth-kit';
import Inbox from './Inbox';
import Search from './Search';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const signOut = useSignOut();

  const navStyles = {
    backgroundColor: '#222',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  };

  const logoStyles = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const menuStyles = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  };

  const linkStyles = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  const dropdownContainerStyles = {
    position: 'relative',
  };

  const dropdownButtonStyles = {
    ...linkStyles,
    position: 'relative',
  };

  const spanStyles = {
    color: "#a742f5",
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <nav style={navStyles}>
      <a href="/" style={logoStyles}>
        Music<span style={spanStyles}>App</span>
      </a>
      <div style={searchContainerStyles}>
        <Search />
      </div>
      <ul style={menuStyles}>
        <li>
          <a href="/index/" style={linkStyles}>
            Home
          </a>
        </li>
        <li>
          <a href="/song-upload/" style={linkStyles}>
            Upload Song
          </a>
        </li>
        <li>
          <a href="/playlists/" style={linkStyles}>
            Playlists
          </a>
        </li>
        <li>
          <a href="/profile/" style={linkStyles}>
            Profile
          </a>
        </li>
        <li>
          <div style={dropdownContainerStyles}>
            <a href="#" onClick={handleDropdownClick} style={dropdownButtonStyles}>
              Inbox
            </a>
            {isDropdownOpen && <Inbox isDropdownOpen={isDropdownOpen} />}
          </div>
        </li>
        <li>
          <a href="/songs/" onClick={signOut} style={linkStyles}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
