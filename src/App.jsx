import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/tailwind.css";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Pages Utama
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Customers = lazy(() => import("./pages/Customers"));

// Auth Pages
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Forgot = lazy(() => import("./pages/Auth/Forgot"));

// Error Pages
const NotFound = lazy(() => import("./pages/NotFound"));
const Error400 = lazy(() => import("./pages/Error400"));
const Error401 = lazy(() => import("./pages/Error401"));
const Error403 = lazy(() => import("./pages/Error403"));

// ============================================
// FITUR CRM - PASTIKAN FILE-FILE INI ADA
// ============================================
const FiturXYZ = lazy(() => import("./pages/FiturXYZ"));
const MemberDashboard = lazy(() => import("./components/dashboard/MemberDashboard"));
const Checkout = lazy(() => import("./components/orders/Checkout"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const AdminMembers = lazy(() => import("./pages/AdminMembers"));
const TopMembers = lazy(() => import("./components/dashboard/TopMembers"));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* EXISTING ROUTES */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          
          {/* ERROR ROUTES */}
          <Route path="/error/400" element={<Error400 />} />
          <Route path="/error/401" element={<Error401 />} />
          <Route path="/error/403" element={<Error403 />} />

          {/* ============================================
              ROUTES CRM
              ============================================ */}
          <Route path="/fitur-xyz" element={<FiturXYZ />} />
          <Route path="/member-dashboard" element={<MemberDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin-members" element={<AdminMembers />} />
          <Route path="/top-members" element={<TopMembers />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;