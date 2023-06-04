import { useState } from "react"
import axios from "axios"

function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    function generateSessionToken() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const tokenLength = 32;
        let token = '';
      
        for (let i = 0; i < tokenLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          token += characters.charAt(randomIndex);
        }
        return token;
      }

    function handleFormSubmission(e){
        e.preventDefault()

        const data = new FormData()
        data.append('username', formData.username)
        data.append('password', formData.password)

        axios.post('/login/', data).then((response) => {
            onLogin(response.data.status)
            localStorage.setItem('authToken', generateSessionToken());
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
            <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleInputChange} />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            <button type="submit">Login</button>
        </form>
    )
}



export default LoginForm