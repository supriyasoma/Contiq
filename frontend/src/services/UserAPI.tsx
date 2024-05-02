import axios from "axios";
export default axios.create({
  baseURL: "https://bc130-be.real-world.tk/api/v1",
  headers: {
    "content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
