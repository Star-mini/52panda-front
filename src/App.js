import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auction from "../src/components/pages/Auction";
import ItemDetail from "../src/components/pages/ItemDetail";
import SignUp from "../src/components/pages/SignUp";
import MyPage from "../src/components/pages/MyPage";
import index from "../src/components/pages/index";
import Login from "../src/components/pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<index />} />
      <Route path="/auction" element={<Auction />} />
      <Route path="/detail" element={<ItemDetail />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage" element={<Login />} />
      <Route path="/mypage" element={<SignUp />} />
    </Routes>
  );
}

export default App;
