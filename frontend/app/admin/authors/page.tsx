"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";

export default function AdminAuthors() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/admin/authors").then((r) => setList(r.data));
  }, []);

  const create = async () => {
    await api.post("/admin/authors", { name });
  };

  return (
    <div>
      <h1>Authors</h1>

      <input
        className="border p-2"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={create}>Add</button>

      {list.map((a) => (
        <div key={a.id}>{a.name}</div>
      ))}
    </div>
  );
}