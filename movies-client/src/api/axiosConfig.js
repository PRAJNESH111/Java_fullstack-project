import axios from "axios";

export default axios.create({
  baseURL: "https://java-fullstack-project-1.onrender.com",
  headers: { "Content-Type": "application/json" },
});
