import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.resolve(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "enquiries.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FILE);
  } catch {
    await fs.writeFile(FILE, "[]", "utf8");
  }
}

export async function readEnquiries() {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeEnquiries(list) {
  await ensureFile();
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf8");
  await fs.rename(tmp, FILE); // atomic
}

export async function addEnquiry(entry) {
  const list = await readEnquiries();
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...entry,
  };
  list.unshift(record);
  await writeEnquiries(list);
  return record;
}

export async function getEnquiry(id) {
  const list = await readEnquiries();
  return list.find((e) => e.id === id) ?? null;
}

export async function updateEnquiryStatus(id, status) {
  const list = await readEnquiries();
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status, updatedAt: new Date().toISOString() };
  await writeEnquiries(list);
  return list[idx];
}

export async function deleteEnquiry(id) {
  const list = await readEnquiries();
  const next = list.filter((e) => e.id !== id);
  if (next.length === list.length) return false;
  await writeEnquiries(next);
  return true;
}