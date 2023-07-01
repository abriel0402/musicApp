import Navbar from "./Navbar";
import TopFiveStreamed from "./TopFiveStreamed";
import TopFiveLiked from "./TopFiveLiked";
import Browse from "./Browse";
import Search from "./Search";

function Home() {


  const bannerStyles = {
    backgroundColor: "#a742f5",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    height: "200px",
    display: "flex",
    fontSize: "1.35rem", // header size
    marginTop: "73.33px", // to give space for navbar
    
  }


 

  return (
    <>
      <Navbar />
      <div style={bannerStyles}>
        <h1>Welcome to My Music App</h1>
      </div>
      
      <div >
        <div >
          <Browse />
        </div>
        <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <TopFiveStreamed />
        </div>
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <TopFiveLiked />
        </div>
      </div>
        
      </div>
    </>
  );
}

export default Home;
