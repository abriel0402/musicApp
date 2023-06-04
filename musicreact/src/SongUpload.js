import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function SongUpload() {

    const [formData, setFormData] = useState({
        name: '',
        artist: '',
        file: null,

    })

    

    function handleFormSubmission(e) {
        e.preventDefault()
        console.log(formData)

        const data = new FormData();
        data.append('name', formData.name)
        data.append('artist', formData.artist)
        data.append('file', formData.file)
       
        
        axios.post('/songs/', data).then((response) => {
            //console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })


    }


    function handleInputChange(e) {
        const {name, value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    }

    return (
        <form onSubmit={handleFormSubmission}>
        <input type="text" value={formData.name} name="name" placeholder='Song Name' onChange={handleInputChange}/>
        <input type="text" value={formData.artist} name="artist" placeholder='Artist' onChange={handleInputChange}/>
        <input type="file" value={formData.file} name="file" onChange={handleInputChange}/>
        <button type="submit">Upload</button>
        </form>
    )
}


export default SongUpload;