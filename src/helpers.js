import axios from "axios";

export const LOCALSTORAGE_KEY = "LOGIN_OAUTHTOKEN";
export const TOKEN = window.localStorage.getItem(LOCALSTORAGE_KEY);

export const API = axios.create({
  baseURL: "https://eindwerk.jnnck.be/",
});

// When token found in localStorage:
if (TOKEN) {
  API.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;
}
