import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBan, FaDollarSign, FaShoppingCart, FaTruck } from "react-icons/fa";
import PageHeader from "../pertemuan-5/components/PageHeader";
import data from "../data/customers.json";

export default function Customers() {
  const [customers] = useState(data);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>

      <PageHeader
        title="Customers"
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-4">
          <input placeholder="Name" className="border p-2 mr-2" />
          <input placeholder="Email" className="border p-2" />
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Loyalty</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((item) => (
            <tr key={item.customerId}>
              <td>{item.customerId}</td>
              <td>
                <Link
                  to={`/customers/${item.customerId}`}
                  className="font-semibold text-emerald-500 hover:text-emerald-600"
                >
                  {item.customerName}
                </Link>
              </td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.loyalty}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
