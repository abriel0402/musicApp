import Notification from "./Notification";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

function Inbox({ isDropdownOpen }){
    const [notifications, setNotifications] = useState([])

    const authUser = useAuthUser();
    const id = authUser() ? authUser().id : null;

    useEffect(() => {

        axios.post("/api/get-notifications/", {"id": id})
        .then((response) => {
            setNotifications(response.data.notifications)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])



    function handleClear(){
    
        axios.post("/api/clear-notifications/", {"id": id})
        .then((response) => {
            console.log("notifications cleared")
            setNotifications([])
        })
        .catch((error) => {
            console.log(error)
        })


    }

    const clearButtonStyles = {
        backgroundColor: '#e74c3c',
        color: '#fff',
        padding: '7px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        border: 'none',
        outline: 'none',
      };

    const dropdownStyles = {
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: '#222',
        color: '#fff',
        padding: '10px',
        display: isDropdownOpen ? 'block' : 'none',
        width: '200px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
        transform: 'translateX(-60%)'
      };

      const linkStyles = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.3rem',
        marginBottom: "10px",

      };


    return(
        <div style={dropdownStyles}>
            <a style={linkStyles}>
                Notifications
            </a>
            { notifications.length > 1 ?
            <div>
              <Notification notifications={notifications} />
            </div>
            : 
            <div>
                You have no notifications
            </div>
}
            <button style={clearButtonStyles} onClick={() => handleClear()}>
                Clear
            </button>
            
        </div>
    )

}


export default Inbox;