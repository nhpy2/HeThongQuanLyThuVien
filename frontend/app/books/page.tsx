"use client";

import { useEffect, useState, useRef } from "react";
import { getBooks, borrowBook } from "@/src/lib/bookApi";
import { useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNewBooks, setHasNewBooks] = useState(false);

  const prevFirstBookId = useRef<number | null>(null);

  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  //fetch list hiện tại
  const fetchBooks = async () => {
    const data = await getBooks(keyword, page);
    const newBooks = data.content || [];

    setBooks(newBooks);
    setTotalPages(data.totalPages || 0);

    // lưu lại book đầu tiên (để so sánh)
    if (newBooks.length > 0) {
      prevFirstBookId.current = newBooks[0].id;
    }
  };

  //check sách mới từ page 0 (QUAN TRỌNG)
  const checkNewBooks = async () => {
    const data = await getBooks("", 0); // luôn check page 0
    const firstPageBooks = data.content || [];

    if (firstPageBooks.length === 0) return;

    const newestId = firstPageBooks[0].id;

    if (
      prevFirstBookId.current !== null &&
      newestId !== prevFirstBookId.current
    ) {
      setHasNewBooks(true);
    }
  };

  useEffect(() => {
    fetchBooks();

    const interval = setInterval(() => {
      fetchBooks();
      checkNewBooks(); //check riêng
    }, 5000);

    return () => clearInterval(interval);
  }, [page, keyword]);

  const handleBorrow = async (id: number) => {
    if (!token) {
      alert("Bạn cần đăng nhập!");
      return;
    }

    try {
      await borrowBook(id, token);
      alert("Mượn thành công");
      fetchBooks();
    } catch (err: any) {
      alert(err.message); //lỗi backend
    }
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchBooks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">📚 Library</h1>

        <button
          onClick={() => router.push("/profile")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Profile
        </button>

        <button
          onClick={() => router.push("/my-borrow")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          My Borrow
        </button>
      </div>

      {/* THÔNG BÁO SÁCH MỚI */}
      {hasNewBooks && (
        <div className="mb-4 p-3 bg-yellow-200 text-yellow-800 rounded flex justify-between items-center">
          <span> Có sách mới vừa được thêm!</span>
          <button
            onClick={() => {
              setHasNewBooks(false);
              setPage(0); // về trang đầu
              fetchBooks();
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Xem ngay
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="flex gap-2 mb-6">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm sách..."
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={() => {
            setPage(0);
            fetchBooks();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-4">
        {books.map((b) => (
          <div key={b.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{b.title}</h2>
            <p>{b.author}</p>

            <button
              onClick={() => handleBorrow(b.id)}
              className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
            >
              Borrow
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center gap-4">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          {page + 1} / {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}