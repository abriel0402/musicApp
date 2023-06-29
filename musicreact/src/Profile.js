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
    height: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    fontSize: "1.6rem",
    padding: "20px",
    marginTop: "73.33px", // to give space for navbar
  };

  

  return (
    <div>
      <Navbar /> 
      
      <div style={bannerStyles}>
      
       <h1 style={{ fontSize: "2.4rem" }}>{displayName}</h1>
        <h3 style={{ fontSize: "1.8rem" }}>@{username}</h3>
        <div>
          <p>{totalPlays} total plays</p>
          <p>{totalLikes} total likes</p>
        </div>
      </div>
      <SongList />
    </div>
  );
}

export default Profile;
