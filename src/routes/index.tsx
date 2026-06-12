import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

const EXPERTISE = [
  {
    title: "Water Resource Modeling",
    body: "Climate data analysis, future hydrologic projection, and flood hazard mapping across Himalayan river basins.",
  },
  {
    title: "Reservoir Optimization & Hydropower Design",
    body: "Metaheuristic optimization of storage operations and risk-informed design for resilient hydropower infrastructure.",
  },
  {
    title: "Python Programming & Geospatial Tools",
    body: "Reproducible scientific workflows in Python, alongside GIS and remote sensing for basin-scale analysis.",
  },
  {
    title: "Machine Learning for Hydrology",
    body: "Applying data-driven methods to precipitation downscaling, streamflow prediction, and climate impact studies.",
  },
];

const EXPERIENCE = [
  {
    period: "Jun 2025 — Present",
    role: "Researcher",
    org: "Tribhuvan University, IoE Pulchowk Campus",
    location: "Kathmandu, Nepal",
    body: "Flood hazard modeling across the Gandaki and Bagmati basins, integrating high-resolution climate forcing with hydrodynamic simulation.",
  },
  {
    period: "Feb 2024 — May 2025",
    role: "Independent Researcher & Consultant",
    org: "Selected engagements: ADB, WECS",
    location: "Nepal / Bhutan",
    body: "Led the Hydroclimatic Risk Assessment of the Bunakha Dam, Bhutan, in collaboration with the Asian Development Bank. Contributed to WECS master plans for national water resource strategy.",
  },
  {
    period: "Oct 2023 — Jan 2024",
    role: "Researcher · Geo-Hazard Team Lead",
    org: "Nepal Development Research Institute",
    location: "Kathmandu, Nepal",
    body: "Directed a multidisciplinary team conducting geo-hazard assessments and basin-level vulnerability mapping.",
  },
  {
    period: "2022",
    role: "Research Intern",
    org: "Water Resources Research & Development Centre (WRRDC), Government of Nepal",
    location: "Kathmandu, Nepal",
    body: "Supported applied research on hydrologic monitoring and basin assessment for federal water-sector planning.",
  },
];

type Pub = {
  citation: string;
  title: string;
  venue: string;
  year: number;
  type: "journal" | "conference";
};

const PUBLICATIONS: Pub[] = [
  {
    citation: "Neupane, Y. S., et al., & Baniya, R.",
    title: "Optimization of storage hydropower operation using metaheuristic algorithms.",
    venue: "Water Practice & Technology",
    year: 2026,
    type: "journal",
  },
  {
    citation: "Bista, S., et al., Baniya, R., et al., & Talchabhadel, R.",
    title: "Hydrologic applicability of satellite-based precipitation estimates over a complex Himalayan basin.",
    venue: "Journal of Hydrology",
    year: 2024,
    type: "journal",
  },
  {
    citation: "Khatri, D., et al., & Baniya, R.",
    title: "Climate change impact on hydropower generation in a snow-fed Himalayan basin.",
    venue: "Journal of Water and Climate Change",
    year: 2024,
    type: "journal",
  },
  {
    citation: "Baniya, R., et al.",
    title: "Future flood hazard projections under shared socio-economic pathways for the Gandaki basin.",
    venue: "EGU General Assembly",
    year: 2023,
    type: "conference",
  },
  {
    citation: "Baniya, R., & Talchabhadel, R.",
    title: "Reservoir sedimentation and operational performance under non-stationary climate.",
    venue: "AGU Fall Meeting",
    year: 2020,
    type: "conference",
  },
];

const EDUCATION = [
  {
    degree: "M.Sc. in Hydropower Engineering",
    org: "Pulchowk Campus, Tribhuvan University",
    period: "2019 — 2022",
  },
  {
    degree: "B.E. in Civil Engineering",
    org: "Kathmandu University",
    period: "2014 — 2018",
  },
];

const RECOGNITION = [
  {
    title: "EU–ITU–WMO–UNEP Global Initiative",
    detail: "International delegate · Brussels, 2025",
  },
  {
    title: "World Hydropower Congress",
    detail: "International delegate · Bali, 2023",
  },
  {
    title: "EGU Early Career Scientist's Support",
    detail: "Vienna, 2022",
  },
  {
    title: "AGU Berkner Fellowship",
    detail: "San Francisco, 2020",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Expertise />
        <Experience />
        <Research />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-[15px] tracking-tight">
          Rupesh Baniya
        </a>
        <nav className="flex items-center gap-7 text-[13px] text-muted-foreground">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/70">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 grid gap-2 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:col-span-9 md:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid items-start gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-square w-44 overflow-hidden rounded-full border border-border md:w-56">
            <img
              src={headshot}
              alt="Portrait of Rupesh Baniya"
              width={768}
              height={768}
              className="h-full w-full object-cover grayscale-[15%]"
            />
          </div>
          <div className="mt-6 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            Kathmandu, Nepal · Available for consultation
          </div>
        </div>
        <div className="md:col-span-8">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Researcher & Consultant
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            Rupesh Baniya{" "}
            <span className="text-muted-foreground">—</span> Water Resources Researcher
            &amp; Consultant based in Kathmandu, Nepal.
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Bridging climate data analysis, machine learning, and advanced water
            resource modeling to build resilient hydropower infrastructure across
            the Himalayas. Current work spans flood hazard projection, reservoir
            optimization, and hydroclimatic risk assessment for utilities and
            multilateral institutions.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px]">
            <a href="#research" className="link-accent">Selected publications</a>
            <a href="#contact" className="link-accent">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <Section id="expertise" eyebrow="01 — Expertise" title="Core practice & research interests.">
      <div className="grid border-t border-border md:grid-cols-2">
        {EXPERTISE.map((e, i) => (
          <div
            key={e.title}
            className={`border-b border-border px-1 py-8 md:px-8 ${
              i % 2 === 0 ? "md:border-r" : ""
            }`}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] tabular-nums text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="font-serif text-xl tracking-tight">{e.title}</h3>
            </div>
            <p className="mt-3 pl-8 text-[14px] leading-relaxed text-muted-foreground">
              {e.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="02 — Experience" title="Chronological appointments and consultancies.">
      <ol className="border-t border-border">
        {EXPERIENCE.map((x) => (
          <li
            key={x.period + x.role}
            className="grid gap-3 border-b border-border py-8 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-3">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                {x.period}
              </div>
              <div className="mt-1 text-[12px] text-muted-foreground">{x.location}</div>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif text-xl tracking-tight">{x.role}</h3>
              <div className="mt-1 text-[13px] text-foreground/70">{x.org}</div>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">
                {x.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Research() {
  const [filter, setFilter] = useState<"all" | "journal" | "conference">("all");
  const items = PUBLICATIONS.filter((p) => filter === "all" || p.type === filter).sort(
    (a, b) => b.year - a.year,
  );

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
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`transition-colors ${
              filter === t.id
                ? "text-[color:var(--color-primary)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ol className="space-y-8">
        {items.map((p, i) => (
          <li
            key={p.title}
            className="grid gap-3 border-b border-border pb-8 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-1 text-[12px] tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="md:col-span-2 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              {p.year} · {p.type === "journal" ? "Journal" : "Conference"}
            </div>
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

function Education() {
  return (
    <Section
      id="education"
      eyebrow="04 — Education"
      title="Degrees, fellowships & global delegations."
    >
      <div className="grid gap-12 border-t border-border pt-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Academic degrees
          </h3>
          <ul className="mt-6 space-y-6">
            {EDUCATION.map((e) => (
              <li key={e.degree} className="border-b border-border pb-6">
                <div className="font-serif text-lg tracking-tight">{e.degree}</div>
                <div className="mt-1 text-[13px] text-foreground/70">{e.org}</div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                  {e.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Fellowships & delegations
          </h3>
          <ul className="mt-6 space-y-6">
            {RECOGNITION.map((r) => (
              <li key={r.title} className="border-b border-border pb-6">
                <div className="font-serif text-lg tracking-tight">{r.title}</div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.detail}
                </div>
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

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("Couldn't send your message. Please try again.");
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message received. Thank you — I'll be in touch shortly.");
  }

  return (
    <Section id="contact" eyebrow="05 — Contact" title="Start a conversation.">
      <div className="grid gap-12 border-t border-border pt-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground">
            Open to collaboration on hydroclimatic research, modeling, and
            advisory work across academia, utilities, and multilateral
            institutions. Messages are read personally and typically answered
            within a few working days.
          </p>
          <dl className="mt-10 space-y-4 text-[13px]">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Direct
              </dt>
              <dd className="mt-1">
                <a className="link-accent" href="mailto:rupesh.baniya480@gmail.com">
                  rupesh.baniya480@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Phone
              </dt>
              <dd className="mt-1">
                <a className="link-accent" href="tel:+9779860365316">
                  +977 9860 365 316
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-7 space-y-8" noValidate>
          <Field
            label="Name"
            id="cf-name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="Your full name"
            maxLength={120}
            required
          />
          <Field
            label="Email"
            id="cf-email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            placeholder="you@institution.org"
            maxLength={255}
            required
          />
          <Field
            label="Message"
            id="cf-message"
            value={form.message}
            onChange={(v) => setForm((f) => ({ ...f, message: v }))}
            placeholder="A brief note about your project, timeline, or question."
            multiline
            maxLength={4000}
            required
          />
          <div className="flex items-center justify-between gap-4 pt-2">
            <span className="text-[12px] text-muted-foreground">
              {sent ? "Your message has been received." : "Replies sent from rupesh.baniya480@gmail.com."}
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 border-b border-foreground pb-1 text-[13px] uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-70 disabled:opacity-40"
            >
              {submitting ? "Sending" : "Send message"}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  required,
  maxLength,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  maxLength?: number;
}) {
  const baseCls =
    "w-full bg-transparent border-0 border-b border-border py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors";
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          rows={5}
          className={baseCls + " resize-none"}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={baseCls}
        />
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Elsewhere
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Rupesh Baniya — Kathmandu, Nepal.
            </h2>
          </div>
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Direct
            </div>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li>
                <a className="link-accent" href="mailto:rupesh.baniya480@gmail.com">
                  rupesh.baniya480@gmail.com
                </a>
              </li>
              <li>
                <a className="link-accent" href="tel:+9779860365316">
                  +977 9860 365 316
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </div>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li>
                <a className="link-accent" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a className="link-accent" href="https://scholar.google.com/" target="_blank" rel="noreferrer">
                  Google Scholar ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Rupesh Baniya. All rights reserved.</span>
          <span className="uppercase tracking-[0.18em]">Kathmandu · Himalaya</span>
        </div>
      </div>
    </footer>
  );
}
