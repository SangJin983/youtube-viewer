import "./styles/App.css";
import VideoList from "./components/VideoList";
import VideoSearch from "./components/VideoSearch";

function App() {
  return (
    <div>
      <h1>유튜브 뷰어</h1>
      <VideoSearch />
      <VideoList />
    </div>
  );
}

export default App;
