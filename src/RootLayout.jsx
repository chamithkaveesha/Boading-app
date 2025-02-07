import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <header className="bg-green-600 text-white p-4">
        <h1 className="text-lg font-bold">My App</h1>
      </header>
      

      <main className="flex-1 p-4">
        <Outlet />  
      </main>
      

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2025 My App</p>
      </footer>
    </div>
  );
};

export default RootLayout;
