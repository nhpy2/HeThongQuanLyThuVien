"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8090/api";

export default function LoginPage() {
  const router = useRouter();

  const [usernameOrEmail, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      //Lưu token
      localStorage.setItem("token", data.accessToken);

      //GỌI PROFILE ĐỂ LẤY ROLE
      const profileRes = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      if (!profileRes.ok) {
        throw new Error("Token không hợp lệ");
      }

      const profile = await profileRes.json();

      //FIX crash undefined
      if (!profile?.role) {
        throw new Error("Không lấy được role");
      }

      // normalize ROLE_ADMIN → ADMIN
      const role = profile.role.replace("ROLE_", "");

      //ĐIỀU HƯỚNG
      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/profile");
      }

    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          placeholder="Username or Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 mt-2 rounded"
        >
          Login
        </button>

        <div className="flex justify-between mt-3 text-sm">
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>

          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/forgot-pass")}
          >
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}