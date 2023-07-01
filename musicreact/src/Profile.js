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
  const [banner, setBanner] = useState(null);

  const id = authUser() ? authUser().id : null;

  useEffect(() => {
    axios
      .post("/get-user-by-id/", { id: id })
      .then((response) => {
        setUsername(response.data.username);
        setDisplayName(response.data.displayName);
        setTotalPlays(response.data.totalPlays);
        setTotalLikes(response.data.totalLikes);
        setBanner(response.data.banner);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const bannerStyles = {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "#a742f5",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "1.4rem",
    marginTop: "73.33px", // to give space for navbar
    textAlign: "center",
  };
  
  const headingStyles = {
    fontSize: "2.4rem",
    marginBottom: "5px", 
  };
  
  const subheadingStyles = {
    fontSize: "1.8rem",
    marginBottom: "15px", 
  };
  
  const dataContainerStyles = {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "30px",
  };
  
  const dataStyles = {
    margin: "0 10px", 
  };
  
  const profileContainerStyles = {
    marginTop: "20px", 
  };
  
  return (
    <div style={profileContainerStyles}>
      <Navbar />
  
      <div style={bannerStyles}>
        <h1 style={headingStyles}>{displayName}</h1>
        <h3 style={subheadingStyles}>@{username}</h3>
        <div style={dataContainerStyles}>
          <p style={dataStyles}>{totalPlays} total plays</p>
          <p style={dataStyles}>{totalLikes} total likes</p>
        </div>
      </div>
      <SongList />
    </div>
  );
  
}

export default Profile;
