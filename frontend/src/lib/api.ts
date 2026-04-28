export const API_URL = "http://localhost:8090/api";

export async function login(data: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), //dùng data thật
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  return res.json();
}

export async function register(data: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Register failed: ${res.status} - ${errorText}`);
  }

  const json = await res.json();
  return json;
}

export async function changePassword(data: any, token: string) {
  const res = await fetch(`${API_URL}/auth/reset-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.text();
}

export async function forgotPassword(data: any) {
  const res = await fetch(`${API_URL}/auth/forgot-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.text();
}