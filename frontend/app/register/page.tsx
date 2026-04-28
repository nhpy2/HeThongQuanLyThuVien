"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const API_URL = "http://localhost:8090/api";
export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Đăng ký thành công!");
      router.push("/login");
    } else {
      const err = await res.text();
      alert(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h2 className="text-xl mb-4">Register</h2>

        <input
          placeholder="Username"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}