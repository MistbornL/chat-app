import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/auth/SignIn";
import { Chat } from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
