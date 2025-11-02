const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// Helper: get token
export function getToken() {
  return localStorage.getItem("token");
}

// Helper: save token
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// Helper: logout
export function logout() {
  localStorage.removeItem("token");
}
