import { useState, useEffect } from 'react'
import axios from 'axios';

function Playlist({ playlistID }) {
    const [playlist, setPlaylist] = useState([])


    useEffect(() => {
        axios
          .get(`api/playlistByID/${playlistID}/`)
          .then((response) => {
            setPlaylist(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [playlistID]);


    return (
        <>
        <div>
            <h3>{playlist.name}</h3>
        </div>
        </>
    )

}



export default Playlist