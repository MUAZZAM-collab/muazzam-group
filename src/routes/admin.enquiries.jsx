import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Trash2, RefreshCw, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminLogin, listEnquiries, updateEnquiryStatus, removeEnquiry } from "@/lib/api";

const STORAGE_KEY = "moazum:admin";

export const Route = createFileRoute("/admin/enquiries")({
  head: () => ({
    meta: [{ title: "Enquiries — Moazum Group Admin" }],
  }),
  component: AdminEnquiries,
});

function AdminEnquiries() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ new: 0, read: 0, archived: 0 });
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
  }, []);

  const load = useCallback(async (t, filters = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.q) params.q = filters.q;
      const data = await listEnquiries(t, params);
      setEnquiries(data.items || []);
      setStats(data.stats || { new: 0, read: 0, archived: 0 });
      setAuthed(true);
      setLoginError("");
    } catch (err) {
      setAuthed(false);
      setLoginError(err?.message || "Unauthorized");
      window.sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      load(token, { status: filterStatus, q: searchQuery });
    }
  }, [token, load, filterStatus, searchQuery]);

  async function handleLogin(event) {
    event.preventDefault();
    const input = event.currentTarget.elements.token.value.trim();
    if (!input) return;
    setLoginError("");
    try {
      await adminLogin(input);
      window.sessionStorage.setItem(STORAGE_KEY, input);
      setToken(input);
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setAuthed(false);
    setEnquiries([]);
  }

  async function changeStatus(id, next) {
    const updated = await updateEnquiryStatus(token, id, next);
    setEnquiries((prev) =>
      prev.map((x) => (x.id === id ? updated.enquiry : x)),
    );
    setStats((s) => {
      const old = enquiries.find((e) => e.id === id)?.status;
      if (!old || old === next) return s;
      return { ...s, [old]: Math.max(0, s[old] - 1), [next]: s[next] + 1 };
    });
  }

  async function remove(id, name) {
    if (!window.confirm(`Delete enquiry from ${name}?`)) return;
    await removeEnquiry(token, id);
    setEnquiries((prev) => prev.filter((x) => x.id !== id));
  }

  if (!authed) {
    return (
      <div className="site-container admin-login">
        <p className="eyebrow">Admin</p>
        <h1>Enquiries login</h1>
        <p className="supporting-copy">Enter the admin token from your backend .env</p>
        <form className="enquiry-form" onSubmit={handleLogin}>
          <label>
            Admin token
            <input name="token" type="password" required autoFocus />
          </label>
          <Button variant="neon" type="submit">
            Sign in
          </Button>
          {loginError && <p className="form-error-box">{loginError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="site-container admin-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 style={{ marginTop: 12, fontSize: 36 }}>Enquiries</h1>
          <p className="supporting-copy" style={{ marginTop: 8 }}>
            {enquiries.length} shown · {stats.new} new · {stats.read} read · {stats.archived} archived
          </p>
        </div>
        <div className="admin-actions">
          <Button variant="technical" onClick={() => load(token, { status: filterStatus, q: searchQuery })} type="button" disabled={loading}>
            <RefreshCw /> {loading ? "Loading…" : "Refresh"}
          </Button>
          <Button variant="ghost" onClick={handleLogout} type="button">
            <LogOut /> Sign out
          </Button>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search name, email or message…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-status-tabs">
          {[
            ["", "All"],
            ["new", "New"],
            ["read", "Read"],
            ["archived", "Archived"],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              className={`status-btn ${filterStatus === val ? "active" : ""}`}
              onClick={() => setFilterStatus(val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {enquiries.length === 0 && !loading && (
        <p className="supporting-copy" style={{ paddingTop: 24 }}>No enquiries match.</p>
      )}

      <div className="admin-grid">
        {enquiries.map((e) => (
          <article key={e.id} className="enquiry-card">
            <header>
              <div>
                <h2>{e.name}</h2>
                <p className="eyebrow" style={{ marginTop: 6 }}>
                  {e.divisionTitle} · {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`status-badge status-${e.status}`}>{e.status}</span>
            </header>

            <dl className="enquiry-meta">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${e.email}`}>{e.email}</a>
                </dd>
              </div>
              {e.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${e.phone}`}>{e.phone}</a>
                  </dd>
                </div>
              )}
              <div>
                <dt>Reference</dt>
                <dd style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                  {e.id.slice(-8).toUpperCase()}
                </dd>
              </div>
            </dl>

            <p className="enquiry-message">{e.message}</p>

            <footer>
              {["new", "read", "archived"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`status-btn ${e.status === s ? "active" : ""}`}
                  onClick={() => changeStatus(e.id, s)}
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                className="status-btn danger"
                onClick={() => remove(e.id, e.name)}
              >
                <Trash2 size={14} /> Delete
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
