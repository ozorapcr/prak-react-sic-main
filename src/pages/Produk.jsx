import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import products from "../data/products.json";

export default function Produk() {
  return (
    <div>
      <PageHeader title="Produk" breadcrumb={["Dashboard", "Produk"]} />

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Produk</th>
              <th className="px-6 py-3">Kode</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Stok</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-semibold text-emerald-500 hover:text-emerald-600"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="px-6 py-4">{item.code}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.brand}</td>
                <td className="px-6 py-4">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
