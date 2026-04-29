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

  const handleSubmit = async () => {
    await fetch(`${API_URL}/auth/forgot-pass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Password changed");
    router.push("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 shadow w-96">
        <h2 className="text-xl mb-4">Reset Password</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            type="password"
            className="border p-2 mb-2 w-full"
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

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