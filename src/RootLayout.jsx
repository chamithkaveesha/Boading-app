import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import transaction from "./assets/transaction.svg";

const RootLayout = () => {
  const email = "alice.johnson@example.com";
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGljZS5qb2huc29uQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5OTc3NDQzLCJleHAiOjE3NDAwNjM4NDN9.JIcKdoe5HslqI4vDDTc7ZcIU21q28Rtuk5OWoMDlc5bTckrVCoKD5JjjIpU9OoqOosXbOHAZ9_YMSQ1o1S97EA";
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/email?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="sticky top-0 z-50">
        <NavBar userDetails={user} />
      </header>

      <span className="shadow-[0px_0px_15px_5px_rgba(34,197,94,0.5)] cursor-pointer fixed bottom-10 right-10 p-2 bg-green-400 rounded-full flex items-center justify-center z-[100]">
        <img src={transaction} className="h-10" />
      </span>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
