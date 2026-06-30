import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Invalid email or password");
      return;
    }
    toast.success("Logged in");
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
        <h1 className="font-serif text-2xl text-center">Admin Login</h1>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-0 border-b border-border py-3 text-[15px] focus:outline-none focus:border-foreground"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent border-0 border-b border-border py-3 text-[15px] focus:outline-none focus:border-foreground"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-foreground py-3 text-[13px] uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}