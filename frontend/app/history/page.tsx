"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    api.get("/borrow/history").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📜 Borrow History</h1>

      {history.map((h) => (
        <div
          key={h.id}
          className="border p-4 rounded-xl shadow mb-3"
        >
          <p className="font-bold">{h.bookTitle}</p>

          <p className="text-sm text-gray-500">
            Borrow: {h.borrowDate}
          </p>

          <p className="text-sm text-gray-500">
            Due: {h.dueDate}
          </p>

          <p className="text-sm text-gray-500">
            Returned: {h.returnDate || "Chưa trả"}
          </p>

          <p className="font-semibold text-red-500">
            Fine: {h.fineAmount || 0}
          </p>
        </div>
      ))}
    </div>
  );
}