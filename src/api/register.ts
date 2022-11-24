import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const register = async (
  data: { username: string; email: string; password: string },
  navigate: NavigateFunction
) => {
  await axios
    .post("http://localhost:5000/user/signup", {
      email: data.email,
      password: data.password,
      username: data.username,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("User Created Successfully");
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response.status === 409) {
        alert("email already exists");
      }
    });
};
