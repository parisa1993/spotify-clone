import axios from "axios";

const login = async (code) => {
  return axios
    .post("http://localhost:3001/login", {
      code,
    })
    .then((res) => {
      return res;
    })
    .catch(() => {
      window.location = "/";
    });
};

const refresh = async (refreshToken) => {
    return axios
    .post("http://localhost:3001/refresh", {
      refreshToken,
    })
    .then((res) => {
      return res;
    })
    .catch(() => {
      window.location = "/";
    });
};

const lyrics = async (track, artist) =>{
    return axios
    .get("http://localhost:3001/lyrics", {
      params: { track, artist },
    })
    .then(res => {
      return res
    })
}

export const service = {
  login,
  refresh,
  lyrics
};
