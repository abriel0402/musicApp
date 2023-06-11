import React from 'react';

function Navbar() {
  const navStyles = {
    backgroundColor: '#222',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
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

  return (
    <nav style={navStyles}>
      <a href="/" style={logoStyles}>
        Site Name
      </a>
      <ul style={menuStyles}>
        <li>
          <a href="/index/" style={linkStyles}>
            Home
          </a>
        </li>
        <li>
          <a href="/song-upload/" style={linkStyles}>
            Song Upload
          </a>
        </li>
        <li>
          <a href="/songs/" style={linkStyles}>
            Your Songs
          </a>
        </li>
        <li>
          <a href="/playlists/" style={linkStyles}>
            Playlists
          </a>
        </li>
        <li>
          <a href="/songs/" onClick={(e) => localStorage.removeItem('authToken')} style={linkStyles}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
