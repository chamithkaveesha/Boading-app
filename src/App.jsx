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
import accountLoader from "./Loaders/accountLoader";
import Test from "./pages/test";

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated"; // Import RedirectIfAuthenticated

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />} errorElement={<ErrorPage />}>
      {/* Protected Routes - Require Authentication */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="account" element={<Account />} loader={accountLoader} />
        <Route path="payment" element={<Payment />} />
        <Route path="repayment" element={<Repayment />} />
        <Route path="dashboardadmin" element={<DashboardAdmin />} />
      </Route>

      {/* Redirect if already logged in */}
      <Route element={<RedirectIfAuthenticated />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* Public Routes */}
      <Route path="test" element={<Test />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
