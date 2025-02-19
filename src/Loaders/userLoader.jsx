import axios from 'axios';

const userLoader = async ({ params }) => {
  const email = "alice.johnson@example.com";
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGljZS5qb2huc29uQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5ODgzNTkxLCJleHAiOjE3Mzk5Njk5OTF9.Iab9-OnJGNQzuM45-xr7KThsCGzaiH3o1-9vinbYKk-qczTjAH22DSIGTClLgsSDtg-YS5OtB6HNZUYDzTGeAw";

  try {
    const response = await axios.get(
      `http://localhost:8080/api/users/email?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export default userLoader;
