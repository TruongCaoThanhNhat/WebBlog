import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/Login";
import UserSettingPage from "./pages/user/UserSettingPage";
import UserPage from "./pages/user/UserPage";
import Register from "./pages/Register";
import CateDetails from "./pages/CateDetails";
import PostDetails from "./pages/PostDetails";
import MainLayout from "./layouts/MainLayout";

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
        <Route path="catedetails" element={<CateDetails />} />
        <Route path="postdetails" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App;
