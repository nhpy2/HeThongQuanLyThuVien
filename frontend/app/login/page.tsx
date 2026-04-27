"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert(`Login failed: ${res.status}`);
        return;
      }

      const data = await res.json();

      if (data.accessToken) {
        loginUser(data);
        router.push("/"); // chuyển về trang chính
      } else {
        alert("Login failed: no token");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          placeholder="Username or Email"
          className="border p-2 mb-2 w-full"
          value={form.usernameOrEmail}
          onChange={(e) =>
            setForm({ ...form, usernameOrEmail: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
