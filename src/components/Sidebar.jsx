import { FaBox, FaHome, FaShoppingCart, FaUsers, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) => `block py-2 px-3 rounded-md transition-colors ${isActive ? "text-green-500 font-bold bg-green-50" : "text-gray-500 hover:bg-gray-100"}`;

export default function Sidebar() {
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
                    <li>
                        <NavLink to="/" end className={navClass}>
                            <FaHome />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={navClass}>
                            <FaShoppingCart />
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customers" className={navClass}>
                            <FaUsers />
                            Customers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={navClass}>
                            <FaBox />
                            Produk
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/components" className={navClass}>
                            <FaBox />
                            Components
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error400" className={navClass}>
                            ⚠️ Error 400
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error401" className={navClass}>
                            🔐 Error 401
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error403" className={navClass}>
                            🚫 Error 403
                        </NavLink>
                    </li>
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
