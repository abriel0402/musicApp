import { useState } from "react"
import axios from "axios"


function RegisterForm() {
    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        password: '',
    })


    function handleFormSubmission(e){
        e.preventDefault()

        const data = new FormData()
        data.append('displayName', formData.displayName)
        data.append('username', formData.username)
        data.append('password', formData.password)

        axios.post('/register/', data).then((response) => {
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
            <input type="text" name="displayName" value={formData.displayName}placeholder="Display Name" onChange={handleInputChange}/>
            <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleInputChange} />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            <button type="submit">Register</button>
        </form>
    )
}


export default RegisterForm