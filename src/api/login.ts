import axios from "axios";
import React from "react";
import { NavigateFunction } from "react-router-dom";

export const Login = async (
  data: {
    username: React.MutableRefObject<HTMLInputElement | null>;
    password: React.MutableRefObject<HTMLInputElement | null>;
  },
  navigate: NavigateFunction
) => {
  const { username, password } = data;
  await axios
    .post("https://collection-server-mistborn.herokuapp.com/user/login", {
      username: username,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/chat");
      } else {
        alert("Something went wrong");
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
