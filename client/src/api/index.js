import axios from "axios";

const url = "https://sociopedia-server.vercel.app/";

export const login = (formdata) =>
  axios.post(`${url}auth/login`, formdata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
