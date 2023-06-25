import Navbar from './Navbar';
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Profile() {
  const authUser = useAuthUser();
  const [username, setUsername] = useState(null)
  const [displayName, setDisplayName] = useState(null)



  const id = authUser() ? authUser().id : null;

  useEffect(() => {
    console.log(id)
    axios.post("/get-user-by-id/", {"id": id})
  .then((response) => {
    setUsername(response.data.username)
    setDisplayName(response.data.displayName)
  })
  .catch((error) => {
    console.log(error)
   
  })

  }, [])
  


    return(
        <div>
        <Navbar />
        <h1>{displayName}</h1>
        <h4>{username}</h4>
       </div>
    )
}


export default Profile;