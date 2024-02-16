import axios from "axios";

const Requests = axios.create({
  baseURL: "http://localhost:4000/api/providers",
  withCredentials: true,
});

export default Requests;
