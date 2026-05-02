"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";

export default function FinePage() {
  const [fines, setFines] = useState<any[]>([]);

  useEffect(() => {
    api.get("/fines/my").then((r) => setFines(r.data));
  }, []);

  const pay = async (id: number) => {
    await api.post(`/fines/pay/${id}`);
    alert("Paid");
  };

  return (
    <div>
      <h1>My Fines</h1>

      {fines.map((f) => (
        <div key={f.id} className="border p-2">
          <p>{f.bookTitle}</p>
          <p>{f.amount}</p>

          <button
            onClick={() => pay(f.id)}
            className="bg-red-500 text-white p-1"
          >
            Pay
          </button>
        </div>
      ))}
    </div>
  );
}