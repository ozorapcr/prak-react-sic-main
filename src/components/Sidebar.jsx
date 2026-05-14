import { FaBox, FaHome, FaShoppingCart, FaUsers, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    // 🔥 IMPROVISASI 3 - ACTIVE MENU STATE
    const [active, setActive] = useState("dashboard");

    return (
        <div className="w-64 bg-white p-6 flex flex-col justify-between min-h-screen border-r">

            <div>

                <h1 className="text-4xl font-bold font-[Poppins] mb-1">
                    Sedap<span className="text-green-500">.</span>
                </h1>

                <p className="text-gray-400 text-sm mb-8">
                    Modern Admin Dashboard
                </p>

                <ul className="space-y-4">

                    {/* DASHBOARD */}
                    <NavLink
                        to="/"
                        onClick={() => setActive("dashboard")}
                        className={`flex items-center gap-3 cursor-pointer ${active === "dashboard"
                                ? "text-green-500 font-bold"
                                : "text-gray-500"
                            }`}
                    >
                        <FaHome />
                        Dashboard
                    </NavLink>

                    {/* ORDERS */}
                    <NavLink
                        to="/orders"
                        onClick={() => setActive("orders")}
                        className={`flex items-center gap-3 cursor-pointer ${active === "orders"
                                ? "text-green-500 font-bold"
                                : "text-gray-500"
                            }`}
                    >
                        <FaShoppingCart />
                        Orders
                    </NavLink  >

                    {/* CUSTOMERS */}
                    <NavLink
                        to="/customers"
                        onClick={() => setActive("customers")}
                        className={`flex items-center gap-3 cursor-pointer ${active === "customers"
                                ? "text-green-500 font-bold"
                                : "text-gray-500"
                            }`}
                    >
                        <FaUsers />
                        Customers
                    </NavLink  >

                    <NavLink
                        to="/products"
                        onClick={() => setActive("products")}
                        className={`flex items-center gap-3 cursor-pointer ${active === "products"
                                ? "text-green-500 font-bold"
                                : "text-gray-500"
                            }`}
                    >
                        <FaBox />
                        Produk
                    </NavLink>

                    <NavLink to="/error400" className="flex gap-3 text-gray-500">
                        ⚠️ Error 400
                    </NavLink>

                    <NavLink to="/error401" className="flex gap-3 text-gray-500">
                        🔐 Error 401
                    </NavLink>

                    <NavLink to="/error403" className="flex gap-3 text-gray-500">
                        🚫 Error 403
                    </NavLink>

                </ul>
            </div>

            {/* FOOTER TETAP */}
            <div>
                <div className="bg-green-500 rounded-xl p-4 mt-3 text-white">
                    <p className="text-sm mb-3">
                        Please organize your menus through button below!
                    </p>

                    <div className="flex items-center justify-between">
                        <button className="bg-white text-green-600 px-3 py-2 rounded-md flex items-center gap-2 font-semibold">
                            <FaPlus />
                            Add Menus
                        </button>

                        <img
                            src="/img/puu.png"
                            className="w-10 h-10 rounded-full border-2 border-white"
                            alt="icon"
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-400 mt-6">
                    Sedap Restaurant Admin Dashboard
                </p>
                <p className="text-xs text-gray-400">
                    © 2025 All Right Reserved
                </p>
            </div>
        </div>
    );
}
