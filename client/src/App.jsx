import "./App.scss";
import { Route, Routes } from "react-router-dom";
import UserSettingPage from "./pages/user/UserSettingPage";
import UserPage from "./pages/user/UserPage";
import MainLayout from "./layouts/MainLayout";
import PostDetails from "./pages/PostDetails/PostDetails";
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
import Register from "./pages/Register/Register";
import CateDetails from "./pages/CateDetails/CateDetails";
import HomePage from "./pages/home/HomePage";
import 'boxicons/css/boxicons.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessagePage from "./pages/message/MessagePage";
import SearchResults from "./components/searchResult/SearchResults";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/user/setting" element={<UserSettingPage />} />
          <Route path="/category/:slug" element={<CateDetails />} />
          <Route path="/post/:slug" element={<PostDetails />} />
        </Route>

        <Route path="/messages/" element={<MessagePage />}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="/dashboard" element={<DashboardLayout/>} />
        <Route path="/search" element={<SearchResults/>} />
     </Routes>
    </>
  );
}

export default App;
