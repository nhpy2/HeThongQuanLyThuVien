"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const API_URL = "http://localhost:8090/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState("profile");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  //load profile
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn chưa đăng nhập");
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }

        const text = await res.text();
        return text ? JSON.parse(text) : null;
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Profile error:", err);
        alert("Token hết hạn hoặc không hợp lệ");
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  //rreset pass
  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");

    if (!oldPassword || !newPassword) {
      alert("Vui lòng nhập đầy đủ");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password phải >= 6 ký tự");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/reset-pass`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const text = await res.text();

      if (!res.ok) {
        alert("Error: " + text);
        return;
      }

      alert("Đổi mật khẩu thành công");
      router.push("/login");

      setOldPassword("");
      setNewPassword("");

      localStorage.removeItem("accessToken");
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* NAV BAR */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("profile")}
          className={`px-4 py-2 rounded ${
            tab === "profile" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => setTab("password")}
          className={`px-4 py-2 rounded ${
            tab === "password" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* PROFILE TAB */}
      {tab === "profile" && (
        <div className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl mb-4">User Info</h2>

          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      )}

      {/* RESET PASSWORD TAB */}
      {tab === "password" && (
        <div className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl mb-4">Change Password</h2>

          <input
            type="password"
            placeholder="Old Password"
            className="border p-2 mb-2 w-full"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="border p-2 mb-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={handleChangePassword}
            className="bg-green-500 text-white p-2 w-full"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}