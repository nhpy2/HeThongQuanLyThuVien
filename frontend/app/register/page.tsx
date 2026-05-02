"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8090/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    setError("");

    // ✅ validate
    if (
      !form.username ||
      !form.email ||
      !form.fullName ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("Register success");
      router.push("/login");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={
              key.toLowerCase().includes("password")
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            placeholder={
              key === "username"
                ? "Username"
                : key === "email"
                ? "Email"
                : key === "fullName"
                ? "Full Name"
                : key === "password"
                ? "Password"
                : "Confirm Password"
            }
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        {/* 👁️ toggle password */}
        <div className="mb-3">
          <label className="text-sm">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            Hiển thị mật khẩu
          </label>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleRegister}
          className="bg-green-500 text-white w-full p-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}