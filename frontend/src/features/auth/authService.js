import axios from "axios";

const API_URL = "/users/";
const REGISTER_UTL = API_URL + "register";

const register = async (userData) => {
  const response = await axios.post(REGISTER_UTL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
