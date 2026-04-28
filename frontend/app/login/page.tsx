"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export const API_URL = "http://localhost:8090/api";
export default function LoginPage() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.accessToken) {
      loginUser(data);
      localStorage.setItem("token", data.accessToken);
      router.push("/profile");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          placeholder="Username or Email"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, usernameOrEmail: e.target.value })
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

        <button className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>

        <p className="mt-3 text-sm">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Đăng ký
          </span>
        </p>

        <p
          className="text-red-500 cursor-pointer text-sm mt-2"
          onClick={() => router.push("/forgot-pass")}
        >
          Quên mật khẩu?
        </p>
      </form>
    </div>
  );
}