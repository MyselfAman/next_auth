import axios from "axios";
export const signUpUser = async (data) => {
  try {
    const response = await axios.post("/api/user/signup", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post("/api/user/login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
