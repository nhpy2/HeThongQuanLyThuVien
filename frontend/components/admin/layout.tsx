"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}