import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-4 space-y-3">
      <h2 className="font-bold text-xl">ADMIN</h2>

      <Link href="/admin/dashboard">Dashboard</Link>
      <Link href="/admin/books">Books</Link>
      <Link href="/admin/categories">Categories</Link>
      <Link href="/admin/authors">Authors</Link>
      <Link href="/admin/publishers">Publishers</Link>
    </div>
  );
}