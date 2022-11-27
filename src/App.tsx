import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./pages/chat/Chat";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { CreateRoom } from "./pages/CreateRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/createRoom/:user" element={<CreateRoom />} />
      <Route path="/chat/:user/:room" element={<Chat />} />
    </Routes>
  );
}

export default App;
