import "./App.scss";
import { Route, Routes } from "react-router-dom";
import UserSettingPage from "./pages/user/UserSettingPage";
import UserPage from "./pages/user/UserPage";
import MainLayout from "./layouts/MainLayout";
import PostDetails from "./pages/PostDetails/PostDetails";
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
import Register from "./pages/Register";
import CateDetails from "./pages/CateDetails/CateDetails";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/setting" element={<UserSettingPage />} />
          <Route path="/category/:slug" element={<CateDetails />} />
          <Route path="/post/:slug" element={<PostDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="create-post" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
