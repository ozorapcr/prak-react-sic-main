import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import products from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div>
        <PageHeader title="Produk Tidak Ditemukan" breadcrumb={["Dashboard", "Produk", "Detail"]} />

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4 text-red-600">Produk dengan ID {id} tidak ditemukan.</p>
          <Link to="/products" className="text-emerald-500 hover:text-emerald-600">
            Kembali ke daftar produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Detail Produk"
        breadcrumb={["Dashboard", "Produk", product.title]}
      />

      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-500">{product.code}</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">{product.title}</h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
            {product.category}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-gray-400">Brand</p>
            <p className="mt-1 font-semibold text-gray-800">{product.brand}</p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-gray-400">Stok</p>
            <p className="mt-1 font-semibold text-gray-800">{product.stock}</p>
          </div>
          <div className="col-span-2 rounded-lg border border-gray-100 p-4">
            <p className="text-gray-400">Harga</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <Link
          to="/products"
          className="mt-6 inline-block rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
