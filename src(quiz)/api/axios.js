import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://simple-blog-api.crew.red/posts"
});

export default instance;
