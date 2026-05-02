"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";

export default function MyBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const router = useRouter();

  const load = async () => {
    try {
      const res = await api.get("/borrow/my");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleReturn = async (recordId: number) => {
    try {
      await api.post(`/borrow/return/${recordId}`);
      alert("Trả sách thành công");

      load(); // reload
    } catch (err: any) {
      alert(err.response?.data || "Return failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📖 My Borrowed Books</h1>

        <button
          onClick={() => router.push("/history")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          View History
        </button>
      </div>

      {books.length === 0 && (
        <p className="text-gray-500">Bạn chưa mượn sách nào</p>
      )}

      {books.map((b) => (
        <div
          key={b.id}
          className="border p-4 rounded-xl shadow mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{b.bookTitle}</p>
            <p className="text-sm text-gray-500">
              Due: {b.dueDate}
            </p>

            {b.isOverdue && (
              <p className="text-red-500 font-semibold">
                ⚠ Overdue
              </p>
            )}
          </div>

          <button
            onClick={() => handleReturn(b.id)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Return
          </button>
        </div>
      ))}
    </div>
  );
}