import './App.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import CateDetails from './pages/CateDetails';
import PostDetails from './pages/PostDetails';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="catedetails" element={<CateDetails />} />
        <Route path="postdetails" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App
