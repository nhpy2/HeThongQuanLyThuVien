"use client";

import api from "@/src/lib/api";

export default function ReservationPage() {
  const reserve = async (bookId: number) => {
    await api.post(`/reservations/${bookId}`);
    alert("Reserved!");
  };

  return <div>Reservation UI here</div>;
}