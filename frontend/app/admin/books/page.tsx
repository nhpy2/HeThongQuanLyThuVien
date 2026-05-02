"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";

export default function AdminBooks() {
  const router = useRouter();

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    auth: "",
    isbn: "",
    availableQuantity: 0,
  });

  //LOAD BOOKS
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/books");

      console.log("BOOK LIST:", res.data); // debug

      setBooks(res.data.content || res.data);
    } catch (err: any) {
      console.error("LOAD ERROR:", err);
      setError("Không load được danh sách sách");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  //ADD BOOK
  const createBook = async () => {
    setError("");

    if (!form.title || !form.auth) {
      setError("Thiếu title hoặc author");
      return;
    }

    try {
      console.log("SEND DATA:", form);

      const res = await api.post("/admin/books", form);

      console.log("CREATE SUCCESS:", res.data);

      // reset form
      setForm({
        title: "",
        auth: "",
        isbn: "",
        availableQuantity: 0,
      });

      // reload list
      await load();

    } catch (err: any) {
      console.error("CREATE ERROR:", err);

      if (err.response) {
        console.error("BACKEND:", err.response.data);
        setError(err.response.data?.message || "Lỗi backend");
      } else {
        setError("Không kết nối được server");
      }
    }
  };

  //DELETE
  const deleteBook = async (id: number) => {
    try {
      await api.delete(`/admin/books/${id}`);
      await load();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* NAV */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ← Dashboard
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Profile
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Manage Books</h1>

      {/* ERROR */}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Author"
          value={form.auth}
          onChange={(e) => setForm({ ...form, auth: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Available Quantity"
          value={form.availableQuantity}
          onChange={(e) =>
            setForm({
              ...form,
              availableQuantity: Number(e.target.value),
            })
          }
          className="border p-2 w-full rounded"
        />

        <button
          onClick={createBook}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Add Book
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {books.length === 0 && (
            <p className="text-gray-500">Chưa có sách</p>
          )}

          {books.map((b: any) => (
            <div
              key={b.id}
              className="border p-3 rounded shadow flex justify-between"
            >
              <div>
                <p className="font-bold">{b.title}</p>
                <p className="text-sm text-gray-500">
                  Author: {b.auth}
                </p>
                <p className="text-sm">ISBN: {b.isbn}</p>
                <p className="text-sm">
                  Available: {b.availableQuantity}
                </p>
              </div>

              <button
                onClick={() => deleteBook(b.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}