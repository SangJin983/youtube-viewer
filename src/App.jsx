import { ModalProvider } from "./components/Modal/ModalProvider";
import VideoList from "./components/VideoList";
import VideoSearch from "./components/VideoSearch";
import "./styles/App.css";

function App() {
  return (
    <div>
      <h1>유튜브 뷰어</h1>
      <VideoSearch />
      <ModalProvider>
        <VideoList />
      </ModalProvider>
    </div>
  );
}

export default App;
