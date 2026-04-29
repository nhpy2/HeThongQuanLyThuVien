"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export const API_URL = "http://localhost:8090/api";
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    //chưa login → về login
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
          const text = await res.text();

          //token hết hạn hoặc sai
          if (res.status === 403 || res.status === 401) {
            localStorage.removeItem("accessToken");
            router.push("/login");
            return;
          }

          throw new Error(`Error ${res.status}: ${text}`);
        }

        //tránh crash JSON
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .catch((err) => {
        console.error("Profile error:", err);
      });
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {/*Navbar*/}
      <Navbar />

      {/*Profile*/}
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>

        <div className="space-y-2">
          <p><b>ID:</b> {user.id}</p>
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Full Name:</b> {user.fullName}</p>
        </div>

        {/*Button đổi password*/}
        <button
          onClick={() => router.push("/reset-pass")}
          className="mt-5 bg-green-500 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </div>
    </>
  
  );
}
