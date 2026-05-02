"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8090/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        //check role từ backend
        const profileRes = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!profileRes.ok) {
          throw new Error();
        }

        const profile = await profileRes.json();

        if (profile.role !== "ADMIN") {
          router.push("/profile");
          return;
        }

        //fetch dashboard
        const res = await fetch(`${API_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();
        setStats(data);

      } catch {
        localStorage.clear();
        router.push("/login");
      }
    };

    fetchData();
  }, []);

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex justify-between mb-6">
        <button
          onClick={() => router.push("/profile")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Profile
        </button>

        <button
          onClick={() => router.push("/admin/books")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Books
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Books" value={stats.totalBooks} />
        <Card title="Borrowed" value={stats.borrowed} />
        <Card title="Late" value={stats.late} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white shadow rounded-xl p-5 text-center">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value ?? 0}</p>
    </div>
  );
}