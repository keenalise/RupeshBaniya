import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const TABS = ["hero","expertise","experience","publications","education","recognition","social_links","contact_messages"] as const;
type Tab = (typeof TABS)[number];

function AdminDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(undefined);
  const [tab, setTab] = useState<Tab>("hero");
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/admin/login" });
      else setSession(data.session);
    });
  }, [navigate]);
  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }
  if (session === undefined) return <div className="p-10">Loading...</div>;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="font-serif text-[15px]">Admin Dashboard</span>
          <button onClick={logout} className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">Log out</button>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-3 text-[12px] uppercase tracking-[0.14em]">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={tab === t ? "text-foreground border-b-2 border-foreground pb-1" : "text-muted-foreground hover:text-foreground"}>
              {t.replace("_", " ")}
            </button>
          ))}
        </div>
        <TableEditor table={tab} />
      </div>
    </div>
  );
}

const FIELD_CONFIG: Record<Tab, { name: string; type: "text" | "textarea" | "number" }[]> = {
  hero: [{name:"name",type:"text"},{name:"tagline",type:"text"},{name:"bio",type:"textarea"},{name:"location",type:"text"},{name:"availability",type:"text"}],
  expertise: [{name:"title",type:"text"},{name:"body",type:"textarea"},{name:"sort_order",type:"number"}],
  experience: [{name:"period",type:"text"},{name:"role",type:"text"},{name:"org",type:"text"},{name:"location",type:"text"},{name:"body",type:"textarea"},{name:"sort_order",type:"number"}],
  publications: [{name:"citation",type:"text"},{name:"title",type:"text"},{name:"venue",type:"text"},{name:"year",type:"number"},{name:"type",type:"text"},{name:"sort_order",type:"number"}],
  education: [{name:"degree",type:"text"},{name:"org",type:"text"},{name:"period",type:"text"},{name:"sort_order",type:"number"}],
  recognition: [{name:"title",type:"text"},{name:"detail",type:"text"},{name:"sort_order",type:"number"}],
  social_links: [{name:"label",type:"text"},{name:"url",type:"text"},{name:"sort_order",type:"number"}],
  contact_messages: [{name:"name",type:"text"},{name:"email",type:"text"},{name:"message",type:"textarea"}],
};

const db = supabase as any;

function TableEditor({ table }: { table: Tab }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const readOnly = table === "contact_messages";

  async function load() {
    setLoading(true);
    const { data, error } = await db.from(table).select("*");
    if (error) console.error("Admin load error:", error);
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); setEditing(null); }, [table]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Deleted");
    load();
  }

  async function handleSave(values: Record<string, any>) {
    const fields = FIELD_CONFIG[table];
    const payload: Record<string, any> = {};
    for (const f of fields) {
      payload[f.name] = f.type === "number" ? Number(values[f.name] || 0) : values[f.name] ?? "";
    }
    if (editing?.id) {
      const { error } = await db.from(table).update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await db.from(table).insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Added");
    }
    setEditing(null);
    load();
  }

  const fields = FIELD_CONFIG[table];
  return (
    <div>
      {!readOnly && (
        <div className="mb-6">
          {editing ? (
            <EntryForm fields={fields} initial={editing.id ? editing : {}} onCancel={() => setEditing(null)} onSave={handleSave} />
          ) : (
            <button onClick={() => setEditing({})} className="border border-foreground px-4 py-2 text-[12px] uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors">+ Add new</button>
          )}
        </div>
      )}
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">No entries yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="border border-border p-4 flex items-start justify-between gap-4">
              <div className="text-sm space-y-1">
                {fields.map((f) => (
                  <div key={f.name}>
                    <span className="text-muted-foreground uppercase text-[10px] tracking-wider mr-2">{f.name}:</span>
                    <span>{String(row[f.name] ?? "").slice(0, 200)}</span>
                  </div>
                ))}
              </div>
              {!readOnly && (
                <div className="flex gap-3 shrink-0 text-[12px] uppercase tracking-[0.12em]">
                  <button onClick={() => setEditing(row)} className="hover:text-foreground text-muted-foreground">Edit</button>
                  <button onClick={() => handleDelete(row.id)} className="hover:text-red-500 text-muted-foreground">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EntryForm({ fields, initial, onSave, onCancel }: { fields: { name: string; type: string }[]; initial: Record<string, any>; onSave: (values: Record<string, any>) => void; onCancel: () => void; }) {
  const [values, setValues] = useState<Record<string, any>>(initial);
  return (
    <div className="border border-border p-5 space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-1">{f.name}</label>
          {f.type === "textarea" ? (
            <textarea value={values[f.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} rows={4} className="w-full bg-transparent border border-border p-2 text-sm focus:outline-none focus:border-foreground" />
          ) : (
            <input type={f.type === "number" ? "number" : "text"} value={values[f.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} className="w-full bg-transparent border border-border p-2 text-sm focus:outline-none focus:border-foreground" />
          )}
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={() => onSave(values)} className="border border-foreground px-4 py-2 text-[12px] uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors">Save</button>
        <button onClick={onCancel} className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">Cancel</button>
      </div>
    </div>
  );
}
