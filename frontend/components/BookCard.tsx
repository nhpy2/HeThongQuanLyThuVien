export default function BookCard({ book }: any) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{book.title}</h2>
      <p>✍ {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Available: {book.availableQuantity}</p>

      <button className="mt-2 bg-green-500 text-white px-3 py-1">
        Borrow
      </button>
    </div>
  );
}