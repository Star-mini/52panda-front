import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrentLocationProvider from './components/commons/contexts/CurrentLocationContext';
import Auction from './components/pages/Auction';
import ItemDetail from './components/pages/ItemDetail';
import ItemPostForm from './components/pages/ItemPostForm';
import SignUp from './components/pages/SignUp';
import MyPage from './components/pages/MyPage';
import MainPage from './components/pages/MainPage';
import Login from './components/pages/Login';
import LoginSuccess from './components/pages/LoginSuccess';
import Navbar from './components/commons/navbar/Navbar';
import Footer from './components/commons/footer/Footer';
import Chatting from './components/commons/etc/Chatting';


function App() {
  return (
    <CurrentLocationProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/detail" element={<ItemDetail />} />
        <Route path="/auction/form" element={<ItemPostForm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Chatting />
      <Footer />
    </ CurrentLocationProvider>
  );
}

export default App;
