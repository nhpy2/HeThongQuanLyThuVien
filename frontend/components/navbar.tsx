"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      {/*Logo*/}
      <h1
        className="font-bold text-lg cursor-pointer"
        onClick={() => router.push("/books")}>
        Library System
      </h1>

      {/*Menu*/}
      <div className="flex gap-4">
        <button onClick={() => router.push("/books")}>
          Books
        </button>

        <button onClick={() => router.push("/my-borrow")}>
          My Borrow
        </button>

        <button onClick={() => router.push("/profile")}>
          Profile
        </button>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}