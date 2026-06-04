import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Components from "./pages/Components";
import FiturXYZ from "./pages/FiturXYZ";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));
const Produk = React.lazy(() => import("./pages/Produk"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/products" element={<Produk />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/fitur-xyz" element={<FiturXYZ />} />
          <Route path="/error400" element={<Error400 />} />
          <Route path="/error401" element={<Error401 />} />
          <Route path="/error403" element={<Error403 />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
