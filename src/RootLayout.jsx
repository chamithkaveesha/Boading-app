import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import transaction from './assets/transaction.svg';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">

      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <span className="shadow-[0px_0px_15px_5px_rgba(34,197,94,0.8)] cursor-pointer fixed bottom-10 right-10 p-2 bg-green-400 rounded-full flex items-center justify-center z-[100]">
        <img src={transaction} className="h-10" />
      </span>

      <main>
        <Outlet />
      </main>

      
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default RootLayout;
