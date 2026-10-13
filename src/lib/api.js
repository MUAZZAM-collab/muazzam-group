const API_URL = import.meta.env.VITE_API_URL ||"http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = data?.errors || null;
    throw err;
  }
  return data;
}

// ---- Public ----
export async function submitEnquiry(payload) {
  return request("/api/enquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ---- Admin ----
export async function adminLogin(token) {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function listEnquiries(token, params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/admin/enquiries${qs ? `?${qs}` : ""}`, {
    headers: { "x-admin-token": token },
  });
}

export async function updateEnquiryStatus(token, id, status) {
  return request(`/api/admin/enquiries/${id}`, {
    method: "PATCH",
    headers: { "x-admin-token": token },
    body: JSON.stringify({ status }),
  });
}

export async function removeEnquiry(token, id) {
  return request(`/api/admin/enquiries/${id}`, {
    method: "DELETE",
    headers: { "x-admin-token": token },
  });
}
