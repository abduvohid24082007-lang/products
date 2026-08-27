import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  addProduct,
  giveProduct,
  deleteProduct,
  editProduct,
} from "./api/products";

function App() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    rate: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  // Productlarni olish
  const getProducts = async () => {
    try {
      const data = await giveProduct();
      setProducts(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Mahsulotlarni yuklab bo'lmadi");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Inputlarni boshqarish
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Product qo'shish yoki edit qilish
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await editProduct(editId, form);
        toast.success("Product yangilandi");
      } else {
        await addProduct(form);
        toast.success("Product qo'shildi");
      }

      setForm({
        name: "",
        price: "",
        rate: "",
        description: "",
      });

      setEditId(null);
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error("Amalni bajarib bo'lmadi");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product o'chirildi");
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error("Productni o'chirib bo'lmadi");
    }
  };

  // Edit
  const handleEdit = (product) => {
    setEditId(product.id);

    setForm({
      name: product.name,
      price: product.price,
      rate: product.rate,
      description: product.description,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">
      <Toaster position="top-right" richColors />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>

          <p className="mt-1 text-sm text-gray-500">Mahsulotlarni boshqarish</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            {editId ? "Productni tahrirlash" : "Yangi product qo'shish"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product nomi"
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Narxi"
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
              required
            />

            {/* Rate */}
            <input
              type="number"
              step="0.1"
              name="rate"
              value={form.rate}
              onChange={handleChange}
              placeholder="Rating (masalan: 4.9)"
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
              required
            />

            {/* Description */}
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
              required
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {editId ? "Saqlash" : "Product qo'shish"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);

                  setForm({
                    name: "",
                    price: "",
                    rate: "",
                    description: "",
                  });
                }}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Bekor qilish
              </button>
            )}
          </div>
        </form>

        {/* Products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product info */}
              <div className="mb-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    ⭐ {product.rate}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                <p className="text-lg font-bold text-gray-900">
                  {Number(product.price).toLocaleString()} so'm
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
