import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserSettingPage from "./pages/user/UserSettingPage";
import UserPage from "./pages/user/UserPage";
import Register from './pages/Register';
import CateDetails from './pages/CateDetails/CateDetails';
import PostDetails from './pages/PostDetails/PostDetails';
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/settings" element={<UserSettingPage />}></Route>
        <Route path="register" element={<Register />} />
        <Route path="catedetails" element={<CateDetails/>} />
        <Route path="postdetails" element={<PostDetails/>} />
        <Route path="create_post" element={<CreatePost/>} />
      </Routes>
    </>
  );
}

export default App;
