import axios from "axios";

const fetchUser = async (email, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/users/email?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the user data
  } catch (err) {
    throw err.response?.data || "Failed to fetch user";
  }
};

export default fetchUser;
