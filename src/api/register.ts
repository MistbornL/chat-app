import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const Register = async (
  data: { username: string; email: string; password: string },
  navigate: NavigateFunction
) => {
  await axios
    .post("https://chat-server-kappa.vercel.app/user/signup", {
      email: data.email,
      password: data.password,
      username: data.username,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("User Created Successfully");
        navigate("/");
      } else {
        alert("something went wrong");
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response.status === 409) {
        alert("user already exists");
      }
    });
};
