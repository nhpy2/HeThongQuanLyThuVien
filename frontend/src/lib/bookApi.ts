
const API_URL = "http://localhost:8090/api";

export async function getBooks(keyword = "", page = 0) {
  const res = await fetch(
    `${API_URL}/books?keyword=${keyword}&page=${page}&size=6`
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR:", res.status, text);
    throw new Error("Failed");
  }

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