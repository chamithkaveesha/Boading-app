import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import transaction from "./assets/transaction.svg";
import SelectTransactionPopup from "./components/SelectTransactionPopup";
import fetchUser from "./api/fetchUser";

const RootLayout = () => {
  const email = "alice.johnson@example.com";
  const token = sessionStorage.getItem("token");
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="sticky top-0 z-50">
        <NavBar userDetails={user} />
      </header>

      <span onClick={() => setPopup(true)}className="shadow-[0px_0px_15px_5px_rgba(34,197,94,0.5)] cursor-pointer fixed bottom-10 right-10 p-2 bg-green-400 rounded-full flex items-center justify-center z-[100]">
        <img src={transaction} className="h-10" />
      </span>
      <SelectTransactionPopup isOpen={popup} onClose={() => setPopup(false)} />


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
