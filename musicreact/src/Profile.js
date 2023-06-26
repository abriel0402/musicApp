import Navbar from './Navbar';
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SongList from './SongList';

function Profile() {
  const authUser = useAuthUser();
  const [username, setUsername] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [totalPlays, setTotalPlays] = useState(null);
  const [totalLikes, setTotalLikes] = useState(null);

  const id = authUser() ? authUser().id : null;

  useEffect(() => {
    axios
      .post("/get-user-by-id/", { id: id })
      .then((response) => {
        setUsername(response.data.username);
        setDisplayName(response.data.displayName);
        setTotalPlays(response.data.totalPlays);
        setTotalLikes(response.data.totalLikes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '10px',
  };

  const panelStyles = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
    padding: '20px',
    marginBottom: '20px',
  };

  const headerStyles = {
    fontSize: '2rem',
    marginBottom: '5px',
    color: '#000',
  };

  const usernameStyles = {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#000',
  };

  const statsStyles = {
    marginBottom: '20px',
  };

  const statStyles = {
    fontSize: '1rem',
    color: '#000',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyles}>
        <div style={panelStyles}>
          <h1 style={headerStyles}>{displayName}</h1>
          <h3 style={usernameStyles}>@{username}</h3>
          <div style={statsStyles}>
            <p style={statStyles}>{totalPlays} total plays</p>
            <p style={statStyles}>{totalLikes} total likes</p>
          </div>
        </div>
      </div>
      <SongList />
    </div>
  );
}

export default Profile;
