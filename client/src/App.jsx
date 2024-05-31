import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserSettingPage from "./pages/user/UserSettingPage";
import UserPage from "./pages/user/UserPage";
import PostDetails from "./pages/PostDetails";
import MainLayout from "./layouts/MainLayout";
import PostDetails from './pages/PostDetails/PostDetails';
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/setting" element={<UserSettingPage />} />
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="catedetails" element={<CateDetails/>} />
        <Route path="postdetails" element={<PostDetails/>} />
        <Route path="create_post" element={<CreatePost/>} />
      </Routes>
    </>
  );
}

export default App;
