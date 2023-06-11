import Navbar from "./Navbar";
import TopFiveStreamed from "./TopFiveStreamed";
import TopFiveLiked from "./TopFiveLiked";

function Home() {
    return (
        <>
        <Navbar />
        <div>
            <TopFiveStreamed />
        </div>
        <div>
            <TopFiveLiked />
        </div>
        </>
    )
}


export default Home;