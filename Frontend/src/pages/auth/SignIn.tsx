import { useEffect, useState } from "react";
import { ContextHolder } from "@frontegg/rest-api";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3001");

export const SignIn = () => {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }

    socket.on("recieve_message", (data) => {
      alert(data.message);
    });
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          {/* <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div> */}
          <div>
            <h2>JOIN CHAT</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="Room"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <Link to={`/chat/${room}`}>
              <button>Join</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};
