import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./pages/chat/Chat";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/chat/:room" element={<Chat />} />
    </Routes>
  );
}

export default App;
