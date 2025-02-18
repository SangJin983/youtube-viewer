import { ModalCompound } from "./components/Modal/ModalCompound";
import WelcomeModalTrigger from "./components/Modal/WelcomeModalTrigger";
import VideoList from "./components/VideoList";
import VideoSearch from "./components/VideoSearch";
import "./styles/App.css";

function App() {
  return (
    <div>
      <h1>유튜브 뷰어</h1>
      <VideoSearch />
      <VideoList />

      <ModalCompound>
        <WelcomeModalTrigger />
        <ModalCompound.Content>
          <div>환영합니다</div>
        </ModalCompound.Content>
      </ModalCompound>
    </div>
  );
}

export default App;
