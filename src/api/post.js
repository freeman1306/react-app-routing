import axios from "./axios";

export const getPosts = () => {
  return axios.get("/");
};

export const createPost = ({ title, body }) => {
  return axios.post("/", { title, body });
};

export const editPost = ({ id, title, body }) => {
  return axios.put(`/${id}`, { title, body });
};

export const deletePost = id => {
  return axios.delete(`/${id}`);
};
