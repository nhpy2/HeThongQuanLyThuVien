"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            href="/books"
            className="font-semibold hover:text-blue-400 transition">
            📚 Library
          </Link>

          <Link
            href="/books"
            className="hover:text-blue-400 transition">
            Books
          </Link>

          <Link
            href="/my-borrow"
            className="hover:text-blue-400 transition">
            Borrow
          </Link>

          {user?.role === "ADMIN" && (
            <>
              <Link
                href="/admin/dashboard"
                className="hover:text-yellow-400 transition"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/books"
                className="hover:text-yellow-400 transition"
              >
                Manage Books
              </Link>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                  {user.fullName?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="text-sm">
                  <p className="font-medium leading-none">
                    {user.fullName || user.username}
                  </p>
                  <p className="text-xs text-gray-300">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}