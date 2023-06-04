import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


function SongList() {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        axios.get('/api/songs/').then((response) => {
            setSongs(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    return (
        
        <div>
            {songs.map((song) => (
                <div key={song.id}>
                <h3>{song.name}</h3>
                </div>
            ))}
        </div>
    )
}


export default SongList