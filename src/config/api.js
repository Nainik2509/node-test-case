import axios from "axios";

var API = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://192.168.1.175:8888",
  // baseURL: "http://165.227.99.37:80",
  // baseURL: "https://scapper.app:8080/",

  responseType: "json",
});

export default API;
