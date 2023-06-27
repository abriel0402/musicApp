


function Notification({notifications}){



    return(
        <>
        {notifications.map((notification) => (
            <div>
                {notification.content}
            </div>
        ))}
        
        </>
    )

}


export default Notification;