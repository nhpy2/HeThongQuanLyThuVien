"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8090/api";

export default function ForgotPassword() {
  const router = useRouter();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    //validate
    if (!form.usernameOrEmail || !form.newPassword || !form.confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/forgot-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("Password changed");
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 shadow w-96">
        <h2 className="text-xl mb-4">Reset Password</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={
              key === "usernameOrEmail"
                ? "Username or Email"
                : key === "newPassword"
                ? "New Password"
                : "Confirm Password"
            }
            type={
              key.toLowerCase().includes("password")
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            className="border p-2 mb-2 w-full"
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        {/*toggle password */}
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

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full p-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}