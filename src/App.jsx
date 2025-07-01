import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import RootLayout from "./RootLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Repayment from "./pages/RePayment";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import TransactionLog from "./pages/TransactionLog";
import HomePage from "./pages/HomePage";



import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated"; // Import RedirectIfAuthenticated

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />} errorElement={<ErrorPage />}>
      {/* Public Routes - Accessible to everyone */}
      <Route index element={<HomePage />} />
      
      {/* Protected Routes - Require Authentication */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="account" element={<Account />} />
        <Route path="payment" element={<Payment />} />
        <Route path="repayment" element={<Repayment />} />
        <Route path="transactionlog" element={<TransactionLog />} />
      </Route>

      {/* Redirect if already logged in */}
      <Route element={<RedirectIfAuthenticated />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
