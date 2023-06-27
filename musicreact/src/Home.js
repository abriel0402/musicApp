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
    height: "400px",
    display: "flex",
    fontSize: "2.4rem",

  }

  return (
    <>
      <Navbar />
      <div style={bannerStyles}>
        <h1>Welcome to My Music App</h1>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <TopFiveStreamed />
        </div>
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <TopFiveLiked />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <Browse />
        </div>
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <Search />
        </div>
      </div>
    </>
  );
}

export default Home;
