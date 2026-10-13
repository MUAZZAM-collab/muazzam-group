import { createServerFn } from "@tanstack/react-start";
import {
  addEnquiry,
  readEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "./db";
import { services } from "./services";

const VALID_STATUSES = ["new", "read", "archived"];

function validateEnquiry(input) {
  const errors = {};
  const raw = input && typeof input === "object" ? input : {};

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const division = typeof raw.division === "string" ? raw.division : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (name.length > 100) errors.name = "Name is too long.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (email.length > 200) errors.email = "Email is too long.";

  if (phone.length > 40) errors.phone = "Phone number is too long.";

  if (!services.some((s) => s.slug === division)) {
    errors.division = "Please choose a division.";
  }

  if (message.length < 10) {
    errors.message = "Please describe your requirements (at least 10 characters).";
  }
  if (message.length > 5000) errors.message = "Message is too long (max 5000 characters).";

  return { errors, value: { name, email, phone, division, message } };
}

// ---- Public: submit an enquiry ----
export const submitEnquiry = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    const { errors, value } = validateEnquiry(data);
    if (Object.keys(errors).length > 0) return { ok: false, errors };

    const division = services.find((s) => s.slug === value.division);
    const record = await addEnquiry({
      ...value,
      divisionTitle: division?.title ?? value.division,
    });

    return { ok: true, id: record.id };
  },
);

// ---- Admin auth ----
function assertAdmin(token) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || expected.length < 8) {
    throw new Error(
      "Admin is not configured. Set ADMIN_TOKEN in your environment (min 8 chars).",
    );
  }
  if (typeof token !== "string" || token !== expected) {
    throw new Error("Unauthorized");
  }
}

export const adminLogin = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    const token = data?.token;
    try {
      assertAdmin(token);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },
);

// ---- Admin: list ----
export const listEnquiries = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    assertAdmin(data?.token);
    return await readEnquiries();
  },
);

// ---- Admin: update status ----
export const setEnquiryStatus = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    assertAdmin(data?.token);
    if (!VALID_STATUSES.includes(data?.status)) {
      throw new Error("Invalid status");
    }
    const updated = await updateEnquiryStatus(data.id, data.status);
    if (!updated) throw new Error("Enquiry not found");
    return updated;
  },
);

// ---- Admin: delete ----
export const removeEnquiry = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    assertAdmin(data?.token);
    const ok = await deleteEnquiry(data.id);
    if (!ok) throw new Error("Enquiry not found");
    return { ok: true };
  },
);