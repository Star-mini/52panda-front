import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auction from "../src/components/pages/Auction";
import ItemDetail from "../src/components/pages/ItemDetail";
import ItemPostForm from "../src/components/pages/ItemPostForm";
import SignUp from "../src/components/pages/SignUp";
import MyPage from "../src/components/pages/MyPage";
import MainPage from "../src/components/pages/MainPage";
import Login from "../src/components/pages/Login";
import Navbar from "./components/commons/navbar/Navbar";
import Footer from "./components/commons/footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/detail" element={<ItemDetail />} />
        <Route path="/auction/form" element={<ItemPostForm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
