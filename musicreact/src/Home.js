import Navbar from "./Navbar";
import TopFiveStreamed from "./TopFiveStreamed";
import TopFiveLiked from "./TopFiveLiked";
import Browse from "./Browse";

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
      <div>
        <Browse />
      </div>
    </>
  );
}

export default Home;
