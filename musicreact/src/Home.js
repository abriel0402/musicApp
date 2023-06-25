import Navbar from "./Navbar";
import TopFiveStreamed from "./TopFiveStreamed";
import TopFiveLiked from "./TopFiveLiked";
import Browse from "./Browse";
import Search from "./Search";
import Profile from "./Profile";

function Home() {
  return (
    <>
      <Navbar />
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
