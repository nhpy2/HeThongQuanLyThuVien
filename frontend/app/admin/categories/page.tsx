"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";

export default function AdminCategories() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/admin/categories");
    setList(res.data);
  };

  const create = async () => {
    await api.post("/admin/categories", { name });
    setName("");
    load();
  };

  return (
    <div>
      <h1>Categories</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />

      <button onClick={create} className="bg-blue-500 text-white p-2 ml-2">
        Add
      </button>

      {list.map((c) => (
        <div key={c.id} className="border p-2 mt-2">
          {c.name}
        </div>
      ))}
    </div>
  );
}