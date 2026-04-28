"use client";

import { useState } from "react";
import { forgotPassword } from "@/src/lib/api";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    newPassword: ""
  });

  const router = useRouter();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await forgotPassword(form);
    alert(res);
    router.push("/login");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h2>Forgot Password</h2>

        <input
          placeholder="Username or Email"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, usernameOrEmail: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button className="bg-blue-500 text-white p-2 w-full">
          Reset
        </button>
      </form>
    </div>
  );
}