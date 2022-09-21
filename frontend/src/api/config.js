import axios from "axios";


// backend-base url
export default  axios.create({
  baseURL: "http://localhost:8000",
});
