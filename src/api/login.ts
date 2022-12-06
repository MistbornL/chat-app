import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const Login = async (
  username: HTMLInputElement | null,
  password: HTMLInputElement | null,
  navigate: NavigateFunction
) => {
  await axios
    .post("https://chat-server-kappa.vercel.app/user/login", {
      username: username?.value,
      password: password?.value,
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate(`/createRoom/${username?.value}`);
      } else {
        alert("something went wrong");
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response.status === 404) {
        alert("user does not exist");
      } else if (err.response.status === 401) {
        alert("password is incorrect");
      } else if (err.response.status === 403) {
        alert("user is not allowed to login");
      } else {
        alert("Something went wrong");
      }
    });
};
