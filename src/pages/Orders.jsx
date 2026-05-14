import { useState } from "react";
import { FaBan, FaDollarSign, FaShoppingCart, FaTruck } from "react-icons/fa";
import PageHeader from "../pertemuan-5/components/PageHeader";
import data from "../data/orders.json";

export default function Orders() {
  const [orders] = useState(data);
  const [showForm, setShowForm] = useState(false);
  return (
    <div>

      <PageHeader
        title="Orders"
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Order
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-4">
          <input placeholder="Order ID" className="border p-2 mr-2" />
          <input placeholder="Customer Name" className="border p-2" />
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item.orderId}>
              <td>{item.orderId}</td>
              <td>{item.customerName}</td>
              <td>{item.status}</td>
              <td>{item.totalPrice}</td>
              <td>{item.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
