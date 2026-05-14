import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import customers from "../data/customers.json";

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = customers.find((item) => item.customerId === id);

  if (!customer) {
    return (
      <div>
        <PageHeader
          title="Customer Tidak Ditemukan"
          breadcrumb={["Dashboard", "Customers", "Detail"]}
        />

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4 text-red-600">Customer dengan ID {id} tidak ditemukan.</p>
          <Link to="/customers" className="text-emerald-500 hover:text-emerald-600">
            Kembali ke daftar customer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Detail Customer"
        breadcrumb={["Dashboard", "Customers", customer.customerName]}
      />

      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-500">{customer.customerId}</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {customer.customerName}
            </h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
            {customer.loyalty}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-gray-400">Email</p>
            <p className="mt-1 font-semibold text-gray-800">{customer.email}</p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-gray-400">Phone</p>
            <p className="mt-1 font-semibold text-gray-800">{customer.phone}</p>
          </div>
          <div className="col-span-2 rounded-lg border border-gray-100 p-4">
            <p className="text-gray-400">Loyalty</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{customer.loyalty}</p>
          </div>
        </div>

        <Link
          to="/customers"
          className="mt-6 inline-block rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
