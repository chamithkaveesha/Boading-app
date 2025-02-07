import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import RootLayout from './RootLayout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Repayment from './pages/RePayment';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="" 
            element={<RootLayout />}
            errorElement={<ErrorPage />}
    >
      <Route index element={<Dashboard />} />
      <Route path="account" element={<Account />} />
      <Route path="payment" element={<Payment />} />
      <Route path="repayment" element={<Repayment />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);


function App() {
  return <RouterProvider router={router} />;
}

export default App;