"use client";

import { useParams } from "next/navigation";
import api from "@/src/lib/api";
import { useEffect, useState } from "react";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    api.get(`/books/${id}`).then((r) => setBook(r.data));
  }, [id]);

  const borrow = async () => {
    //validate
    if (!borrowDate || !returnDate) {
      alert("Vui lòng chọn đầy đủ ngày");
      return;
    }

    if (new Date(returnDate) <= new Date(borrowDate)) {
      alert("Ngày trả phải sau ngày mượn");
      return;
    }

    try {
      await api.post(`/borrow/${id}`, {
        borrowDate,
        returnDate,
      });

      alert("Borrow success");

      // reset form
      setShowForm(false);
      setBorrowDate("");
      setReturnDate("");

      // chuyển trang
      window.location.href = "/my-borrow";
    } catch (err: any) {
      alert(err.response?.data || "Borrow failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{book?.title}</h1>
      <p className="mb-4">{book?.author}</p>

      {/* BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Borrow
      </button>

      {/* FORM */}
      {showForm && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold mb-3">Nhập thông tin mượn</h3>

          <div className="mb-3">
            <label className="block mb-1">Ngày mượn:</label>
            <input
              type="date"
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Ngày trả:</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={borrow}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Xác nhận
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}