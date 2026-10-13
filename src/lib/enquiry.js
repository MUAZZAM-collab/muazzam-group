// Talks to the Express/MongoDB backend (see /backend). This replaces the old TanStack
// `createServerFn` versions and keeps the SAME exported names and call shapes, so
// contact.jsx and admin.enquiries.jsx work unchanged.
//
// Dev:  requests go to /api/* and Vite proxies them to the backend (see vite.config.js).
// Prod: either serve both behind one domain (reverse proxy /api -> backend), or set
//       VITE_API_URL=https://api.yourdomain.com at build time (and add your site's
//       origin to CORS_ORIGINS in the backend .env).
const API_BASE = (import.meta.env?.CONFIG ?? "").replace(/\/+$/, "");

async function api(path, { method = "GET", token, body } = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api${path}`, {
      method,
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Could not reach the server. Please check your connection and try again.");
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty or non-JSON body */
  }
  return { res, data };
}

function toError(res, data, fallback) {
  if (res.status === 401) return new Error("Unauthorized");
  return new Error(data?.error || fallback);
}

// ---- Public: submit an enquiry -> { ok: true, id } | { ok: false, errors } ----
export async function submitEnquiry({ data: payload }) {
  const { res, data } = await api("/enquiries", { method: "POST", body: payload });
  if (res.ok && data?.ok) return data;
  if (res.status === 422 && data?.errors) return { ok: false, errors: data.errors };
  throw toError(res, data, "Something went wrong. Please try again.");
}

// ---- Admin: login -> { ok: true } | { ok: false, error } ----
export async function adminLogin({ data: { token } }) {
  try {
    const { res, data } = await api("/admin/login", { method: "POST", token });
    if (res.ok) return { ok: true };
    return {
      ok: false,
      error: res.status === 401 ? "Incorrect token." : toError(res, data, "Login failed.").message,
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ---- Admin: list -> Enquiry[] (throws "Unauthorized" on a bad token) ----
export async function listEnquiries({ data: { token } }) {
  const { res, data } = await api("/admin/enquiries", { token });
  if (!res.ok) throw toError(res, data, "Could not load enquiries.");
  return data;
}

// ---- Admin: update status -> updated Enquiry ----
export async function setEnquiryStatus({ data: { token, id, status } }) {
  const { res, data } = await api(`/admin/enquiries/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body: { status },
  });
  if (!res.ok) throw toError(res, data, "Could not update enquiry.");
  return data;
}

// ---- Admin: delete -> { ok: true } ----
export async function removeEnquiry({ data: { token, id } }) {
  const { res, data } = await api(`/admin/enquiries/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
  if (!res.ok) throw toError(res, data, "Could not delete enquiry.");
  return data;
}
