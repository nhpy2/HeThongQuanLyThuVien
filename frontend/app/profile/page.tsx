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

  //LOAD PROFILE
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
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
          throw new Error(await res.text());
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  //LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  //RESET PASSWORD
  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "http://localhost:8090/api/auth/reset-pass",
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

      if (!res.ok) {
        throw new Error(await res.text());
      }

      alert("Đổi mật khẩu thành công");
      router.push("/login");

      //logout luôn
      localStorage.removeItem("token");
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/*NAVBAR*/}
      <div className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="font-bold text-lg">Library Management</div>

        <div className="flex gap-4">
          <button onClick={() => setTab("dashboard")}>Dashboard</button>
          <button onClick={() => setTab("books")}>Books</button>
          <button onClick={() => setTab("users")}>Users</button>
          <button onClick={() => setTab("profile")}>Profile</button>
          <button onClick={() => setTab("password")}>
            Change Password
          </button>
          <button onClick={handleLogout} className="text-red-200">
            Logout
          </button>
        </div>
      </div>

      {/*CONTENT*/}
      <div className="p-6">
        {tab === "dashboard" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-2">Dashboard</h2>
            <p>Welcome back, {user.username}</p>
          </div>
        )}

        {tab === "books" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl">Books Management</h2>
            <p>(Chỗ này sau này bạn gọi API sách)</p>
          </div>
        )}

        {tab === "users" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl">Users Management</h2>
            <p>(Admin mới dùng tab này)</p>
          </div>
        )}

        {/*PROFILE*/}
        {tab === "profile" && (
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl mb-4">Profile</h2>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        )}

        {/* 🔥 CHANGE PASSWORD */}
        {tab === "password" && (
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl mb-4">Change Password</h2>

            <input
              type="password"
              placeholder="Old Password"
              className="border p-2 mb-2 w-full"
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="border p-2 mb-2 w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleChangePassword}
              className="bg-green-500 text-white p-2 w-full"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}