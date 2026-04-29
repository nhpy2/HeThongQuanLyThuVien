"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBooks, borrowBook } from "@/src/lib/bookApi";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    //chưa login → về login
    if (!token) {
      router.push("/login");
      return;
    }

    getBooks(token)
      .then(setBooks)
      .catch((err:any) => {
        console.error(err);
        alert("Không load được sách");
      });
  }, []);

  const handleBorrow = async (id: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn cần đăng nhập");
      router.push("/login");
      return;
    }

    try {
      await borrowBook(id, token);
      alert("Mượn thành công");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Library</h1>

      <div className="grid grid-cols-3 gap-4">
        {books.map((b) => (
          <div key={b.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{b.title}</h2>
            <p>{b.author}</p>

            <button
              onClick={() => handleBorrow(b.id)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Borrow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}