import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState, } from 'react';
import { jwtDecode } from "jwt-decode";
import Navigation from './Components/Navigation';
import Header from './Components/Header';
import Player from './Components/Player';
import LoginWeb from './Components/LoginWeb';
import { removeToken } from './Services/TokenServices/TokenService';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './Constains';
import RefreshToken from "./Services/TokenServices/RefreshToken"
import Compact from './Components/Compact';
import Library from './Components/Library';
import Register from './Components/Register';
import Topic from './Components/Topic';
import TopicDetailt from './Components/TopicDetailt';
import TopicManage from './Pages/TopicManage/TopicManage';
import MusicManage from './Pages/MusicManage/MusicManage';
import "./App.css"
function App() {
  const [userLogin, setUserLogin] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [musicId, setMusicId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lengthMusics, setLengthMusics] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [isAuthorized, authenticated])

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    // console.log("refresh nè")
    // console.log("token refresh = ", refresh)
    try {
      const res = await RefreshToken(refresh);
      // console.log("refresh result = ", res)
      if (res.status === 200) {
        // console.log("200 = ")
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        // console.log("false = ")
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const refresh_token = localStorage.getItem(REFRESH_TOKEN);
    if (!token) {
      setIsAuthorized(false)
      return
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    const refreshDecoded = jwtDecode(refresh_token);
    const refreshTokenExpiration = refreshDecoded.exp;

    if (tokenExpiration === now) {
      // console.log("Trường hợp 1")
      await refreshToken()
    } else if (tokenExpiration > now) {
      // console.log("Trường hợp 2")
      setIsAuthorized(true)
    } else if (tokenExpiration < now) {
      if (now < refreshTokenExpiration + 86300) {
        // console.log("Trường hợp 3.1")
        await refreshToken()
      } else {
        // console.log("Trường hợp 3.2")
        removeToken();
      }
    }
  }
  return (
    <div className="container-fluid p-0 m-0 d-flex flex-column min-vh-100" style={{ backgroundColor: '#FFF' }}>
      <BrowserRouter>
        {authenticated === true ?
          <>
            <Routes>
              <Route path="/login" element={<LoginWeb
                setAuthenticated={setAuthenticated} />}></Route>
            </Routes>
            <Routes>
              <Route path="/register" element={<Register
                setAuthenticated={setAuthenticated} />}></Route>
            </Routes>
          </>
          :
          <>
            <main className="container-fluid row d-flex justidy-content-evenly m-0 p-0">
              <div className="col-xl-2 col-lg-2 col-md-2 p-0 m-0" style={{ backgroundColor: '#231B2E' }}>
                <Navigation />
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 p-0 m-0" style={{ backgroundColor: '#170F23' }}>
                <Header
                  userLogin={userLogin}
                  setUserLogin={setUserLogin}
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
                <div className="container mt-4 content">
                  <Routes>
                    <Route path="/library" element={<Library />}></Route>
                    <Route path="/" element={<Compact
                      musicId={musicId}
                      setMusicId={setMusicId}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                      lengthMusics={lengthMusics}
                      setLengthMusics={setLengthMusics}
                    />}></Route>
                    <Route path="/topic" element={<Topic />}>
                    </Route>
                    <Route path='/topic/:id' element={<TopicDetailt
                      musicId={musicId}
                      setMusicId={setMusicId}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                    />}></Route>
                    <Route path='/topic-manage' element={<TopicManage />}></Route>
                    <Route path='/music-manage' element={<MusicManage />}></Route>
                  </Routes>
                </div>
              </div>
            </main>
            <div className="container-fluid mb-0 m-0 p-0 d-flex justify-content-center " style={{ backgroundColor: "#130C1C" }}>
              <Player
                musicId={musicId}
                setMusicId={setMusicId}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                lengthMusics={lengthMusics}
              />
            </div>
          </>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
