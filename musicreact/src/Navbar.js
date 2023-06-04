


function Navbar(){
    return (
        <>
        <nav>
            <a>Site Name</a>
            <ul>
                <li>
                    <a href="/index/">Home</a>
                </li>
                <li>
                    <a href="/song-upload/">Song Upload</a>
                </li>
                <li>
                    <a href="/songs/">Your Songs</a>
                </li>
                <li>
                    <a href="/songs/" onClick={(e) => localStorage.removeItem('authToken')}>Logout</a>
                </li>
            </ul>
        </nav>
        </>
    )


}


export default Navbar