export const API_URL = "http://localhost:8090/api";

export async function login(data: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    usernameOrEmail: "vy",
    password: "123"
  })
});

  console.log("status:", res.status);

  // Nếu server trả về lỗi (403, 404, 500...)
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Login failed: ${res.status}`);
  }

  // Parse JSON trực tiếp
  const json = await res.json();
  console.log("response JSON:", json);

  return json;
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
