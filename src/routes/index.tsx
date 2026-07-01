


import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import headshot from "@/assets/headshot.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rupesh Baniya — Water Resources Researcher & Consultant" },
      { name: "description", content: "Researcher and consultant in water resources and climate change, based in Kathmandu, Nepal." },
      { property: "og:title", content: "Rupesh Baniya — Water Resources Researcher & Consultant" },
      { property: "og:description", content: "Hydrologic modeling, reservoir optimization, and climate-resilient hydropower across the Himalayas." },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#experience", label: "Experience" },
  { href: "#research", label: "Research" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

type Hero = { name: string; tagline: string; bio: string; location: string; availability: string };
type Expertise = { id: string; title: string; body: string; sort_order: number };
type Experience = { id: string; period: string; role: string; org: string; location: string; body: string };
type Publication = { id: string; citation: string; title: string; venue: string; year: number; type: "journal" | "conference" };
type Education = { id: string; degree: string; org: string; period: string };
type Recognition = { id: string; title: string; detail: string };
type SocialLink = { id: string; label: string; url: string };

function Index() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [expertise, setExpertise] = useState<Expertise[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [recognition, setRecognition] = useState<Recognition[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    supabase.from("hero").select("*").single().then(({ data }) => data && setHero(data));
    supabase.from("expertise").select("*").order("sort_order").then(({ data }) => data && setExpertise(data));
    supabase.from("experience").select("*").order("sort_order").then(({ data }) => data && setExperience(data));
    supabase.from("publications").select("*").order("sort_order").then(({ data }) => data && setPublications(data));
    supabase.from("education").select("*").order("sort_order").then(({ data }) => data && setEducation(data));
    supabase.from("recognition").select("*").order("sort_order").then(({ data }) => data && setRecognition(data));
    supabase.from("social_links").select("*").order("sort_order").then(({ data }) => data && setSocialLinks(data));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero hero={hero} />
        <Expertise items={expertise} />
        <ExperienceSection items={experience} />
        <Research items={publications} />
        <EducationSection education={education} recognition={recognition} />
        <Contact socialLinks={socialLinks} />
      </main>
      <Footer hero={hero} socialLinks={socialLinks} />
      <Toaster />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-[15px] tracking-tight">Rupesh Baniya</a>
        <nav className="flex items-center gap-7 text-[13px] text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">{n.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border/70">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28 pb-10 md:pb-0">
        <div className="mb-12 grid gap-2 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:col-span-9 md:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Hero({ hero }: { hero: Hero | null }) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid items-start gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-square w-44 overflow-hidden rounded-full border border-border md:w-56">
            <img src={headshot} alt="Portrait of Rupesh Baniya" width={768} height={768} className="h-full w-full object-cover grayscale-[15%]" />
          </div>
          <div className="mt-6 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            {hero?.location} · {hero?.availability}
          </div>
        </div>
        <div className="md:col-span-8">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{hero?.tagline}</span>
          <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            {hero?.name} <span className="text-muted-foreground">—</span> Water Resources Researcher &amp; Consultant based in Kathmandu, Nepal.
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{hero?.bio}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px]">
            <a href="#research" className="link-accent">Selected publications</a>
            <a href="#contact" className="link-accent">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise({ items }: { items: Expertise[] }) {
  return (
    <Section id="expertise" eyebrow="01 — Expertise" title="Core practice & research interests.">
      <div className="grid border-t border-border md:grid-cols-2">
        {items.map((e, i) => (
          <div key={e.id} className={`border-b border-border px-1 py-8 md:px-8 ${i % 2 === 0 ? "md:border-r" : ""}`}>
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] tabular-nums text-muted-foreground">0{i + 1}</span>
              <h3 className="font-serif text-xl tracking-tight">{e.title}</h3>
            </div>
            <p className="mt-3 pl-8 text-[14px] leading-relaxed text-muted-foreground">{e.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <Section id="experience" eyebrow="02 — Experience" title="Chronological appointments and consultancies.">
      <ol className="border-t border-border">
        {items.map((x) => (
          <li key={x.id} className="grid gap-3 border-b border-border py-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-3">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">{x.period}</div>
              <div className="mt-1 text-[12px] text-muted-foreground">{x.location}</div>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif text-xl tracking-tight">{x.role}</h3>
              <div className="mt-1 text-[13px] text-foreground/70">{x.org}</div>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">{x.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Research({ items }: { items: Publication[] }) {
  const [filter, setFilter] = useState<"all" | "journal" | "conference">("all");
  const filtered = items.filter((p) => filter === "all" || p.type === filter).sort((a, b) => b.year - a.year);
  const tabs: { id: typeof filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "journal", label: "Journal Papers" },
    { id: "conference", label: "Conference Abstracts" },
  ];
  return (
    <Section id="research" eyebrow="03 — Research" title="Selected academic publications.">
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-3 text-[12px] uppercase tracking-[0.16em]">
        <span className="text-muted-foreground">Filter by</span>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setFilter(t.id)} className={`transition-colors ${filter === t.id ? "text-[color:var(--color-primary)]" : "text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <ol className="space-y-8">
        {filtered.map((p, i) => (
          <li key={p.id} className="grid gap-3 border-b border-border pb-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-1 text-[12px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
            <div className="md:col-span-2 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">{p.year} · {p.type === "journal" ? "Journal" : "Conference"}</div>
            <p className="md:col-span-9 text-[14px] leading-relaxed">
              <span className="text-muted-foreground">{p.citation} ({p.year}). </span>
              <span className="font-semibold text-foreground">{p.title}</span>{" "}
              <span className="italic text-muted-foreground">{p.venue}.</span>
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function EducationSection({ education, recognition }: { education: Education[]; recognition: Recognition[] }) {
  return (
    <Section id="education" eyebrow="04 — Education" title="Degrees, fellowships & global delegations.">
      <div className="grid gap-12 border-t border-border pt-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Academic degrees</h3>
          <ul className="mt-6 space-y-6">
            {education.map((e) => (
              <li key={e.id} className="border-b border-border pb-6">
                <div className="font-serif text-lg tracking-tight">{e.degree}</div>
                <div className="mt-1 text-[13px] text-foreground/70">{e.org}</div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{e.period}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Fellowships & delegations</h3>
          <ul className="mt-6 space-y-6">
            {recognition.map((r) => (
              <li key={r.id} className="border-b border-border pb-6">
                <div className="font-serif text-lg tracking-tight">{r.title}</div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{r.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Message can't be empty").max(4000),
});

function Contact({ socialLinks }: { socialLinks: SocialLink[] }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Please check the form."); return; }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSubmitting(false);
    if (error) { toast.error("Couldn't send your message. Please try again."); return; }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message received. Thank you — I'll be in touch shortly.");
  }

  return (
    <Section id="contact" eyebrow="05 — Contact" title="Start a conversation.">
      <div className="grid gap-12 border-t border-border pt-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground">
            Open to collaboration on hydroclimatic research, modeling, and advisory work across academia, utilities, and multilateral institutions.
          </p>
          <dl className="mt-10 space-y-4 text-[13px]">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Direct</dt>
              <dd className="mt-1"><a className="link-accent" href="mailto:rupesh.baniya480@gmail.com">rupesh.baniya480@gmail.com</a></dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Phone</dt>
              <dd className="mt-1"><a className="link-accent" href="tel:+9779860365316">+977 9860 365 316</a></dd>
            </div>
          </dl>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-7 space-y-8" noValidate>
          <Field label="Name" id="cf-name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Your full name" maxLength={120} required />
          <Field label="Email" id="cf-email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@institution.org" maxLength={255} required />
          <Field label="Message" id="cf-message" value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} placeholder="A brief note about your project, timeline, or question." multiline maxLength={4000} required />
          <div className="flex items-center justify-between gap-4 pt-2">
            <span className="text-[12px] text-muted-foreground">{sent ? "Your message has been received." : "Replies sent from rupesh.baniya480@gmail.com."}</span>
            <button type="submit" disabled={submitting} className="group inline-flex items-center gap-3 border-b border-foreground pb-1 text-[13px] uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-70 disabled:opacity-40">
              {submitting ? "Sending" : "Send message"}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({ label, id, value, onChange, placeholder, type = "text", multiline = false, required, maxLength }: {
  label: string; id: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; multiline?: boolean; required?: boolean; maxLength?: number;
}) {
  const baseCls = "w-full bg-transparent border-0 border-b border-border py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors";
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} maxLength={maxLength} rows={5} className={baseCls + " resize-none"} />
      ) : (
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} maxLength={maxLength} className={baseCls} />
      )}
    </div>
  );
}

function Footer({ hero, socialLinks }: { hero: Hero | null; socialLinks: SocialLink[] }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Elsewhere</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-4xl">{hero?.name} — {hero?.location}.</h2>
          </div>
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Direct</div>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li><a className="link-accent" href="mailto:rupesh.baniya480@gmail.com">rupesh.baniya480@gmail.com</a></li>
              <li><a className="link-accent" href="tel:+9779860365316">+977 9860 365 316</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Elsewhere</div>
            <ul className="mt-4 space-y-2 text-[14px]">
              {socialLinks.map((s) => (
                <li key={s.id}><a className="link-accent" href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} {hero?.name}. All rights reserved.</span>
          <span className="uppercase tracking-[0.18em]">Kathmandu · Himalaya</span>
        </div>
      </div>
    </footer>
  );
}