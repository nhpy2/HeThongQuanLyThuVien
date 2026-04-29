const API_URL = "http://localhost:8090/api";

export async function getBooks(token: string) {
  const res = await fetch(`${API_URL}/books`);

  if (!res.ok) throw new Error("Failed to fetch books");

  return res.json();
}

export async function borrowBook(bookId: number, token: string) {
  const res = await fetch(`${API_URL}/borrow/${bookId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Borrow failed");
  }
}