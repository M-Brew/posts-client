import axios from "../utils/axios";
import { isAxiosError } from "axios";

console.log(axios.getUri());

export const getPosts = async () => {
  try {
    const response = await axios.get(`/posts`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const addPost = async (payload: IPostFormValues) => {
  try {
    const response = await axios.post(`/posts`, {
      ...payload,
    });

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(`/posts/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};
