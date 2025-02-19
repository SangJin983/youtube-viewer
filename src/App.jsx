import ModalCompound from "./components/Modal/ModalCompound";
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
        <h2>환영합니다!</h2>
        <p>유튜브 동영상을 검색할 수 있는 뷰어 서비스 입니다</p>
        <ul>
          <li>원하는 키워드를 검색할 수 있습니다</li>
          <li>스크롤을 내리면 영상이 추가됩니다</li>
          <li>목록을 클릭하면 영상을 볼 수 있습니다</li>
        </ul>
        </ModalCompound.Content>
      </ModalCompound>
    </div>
  );
}

export default App;
