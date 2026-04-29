"use client";

import { useEffect, useState } from "react";

export const API_URL = "http://localhost:8090/api";

export default function MyBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/borrow/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">📖 My Books</h1>

      {books.map((b) => (
        <div key={b.id} className="border p-3 mt-2">
          <p>{b.bookTitle}</p>
          <p>Due: {b.dueDate}</p>
          <p className={b.isOverdue ? "text-red-500" : ""}>
            {b.isOverdue ? "Overdue" : "OK"}
          </p>
        </div>
      ))}
    </div>
  );
}