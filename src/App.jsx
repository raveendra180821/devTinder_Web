import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import { SocketContextProvider } from "./utils/SocketContext";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <SocketContextProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SocketContextProvider>
      </Provider>
    </>
  );
}

export default App;
