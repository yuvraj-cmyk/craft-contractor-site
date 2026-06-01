import { useCallback, useEffect, useRef, useState } from "react";
import {
  Phone, Menu, X, Star, ShieldCheck, Award, BadgeCheck,
  Truck, Home, Layers, Building2, Wrench, Construction, Ruler, HardHat,
  Hammer, Clock, ClipboardCheck, CheckCircle2, MapPin, Mail, Quote,
  ChevronDown, ChevronRight, ChevronLeft, ArrowRight, MoveHorizontal,
} from "lucide-react";

import heroImg from "@/assets/hero-concrete.jpg";
import stampedImg from "@/assets/service-stamped.jpg";
import crewImg from "@/assets/crew-pouring.jpg";
import driveImg from "@/assets/project-driveway.jpg";
import walkwayImg from "@/assets/project-walkway.jpg";
import wallImg from "@/assets/project-wall.jpg";
import beforeImg from "@/assets/before-driveway.jpg";
import beforePatioImg from "@/assets/before-patio.jpg";
import beforeWalkwayImg from "@/assets/before-walkway.jpg";
import commercialImg from "@/assets/project-commercial.jpg";

import { DEFAULT_CONFIG, SiteConfigProvider, useSiteConfig, type SiteConfig } from "@/lib/site-config";

/* ------------------------------------------------------------------ */
/*  Shell — accepts optional overrides, falls back to defaults        */
/* ------------------------------------------------------------------ */

export function SitePageShell(config: Partial<SiteConfig> = {}) {
  const value: SiteConfig = {
    businessName: config.businessName ?? DEFAULT_CONFIG.businessName,
    city: config.city ?? DEFAULT_CONFIG.city,
    phone: config.phone ?? DEFAULT_CONFIG.phone,
  };
  return (
    <SiteConfigProvider value={value}>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Process />
        <Gallery />
        <ServiceAreas />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <StickyCallBar />
    </SiteConfigProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                            */
/* ------------------------------------------------------------------ */
function Header() {
  const { businessName, phone } = useSiteConfig();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Reviews" },
    { href: "#areas", label: "Service Areas" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-background"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <a href="#top" className="font-display text-2xl tracking-wide uppercase text-ink">{businessName}</a>
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-concrete hover:text-ink transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href={telHref} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-ink hover:text-primary-hover transition-colors" aria-label={`Call ${businessName} at ${phone}`}>
            <Phone size={18} strokeWidth={2} /><span>{phone}</span>
          </a>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">Free Estimate</a>
          <button type="button" onClick={() => setOpen((v) => !v)} className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-ink" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav aria-label="Mobile" className="px-4 py-3 flex flex-col">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-base font-medium text-ink border-b border-border last:border-0">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center px-4 py-3 rounded-md bg-primary text-primary-foreground font-semibold">Get Free Estimate</a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  const { businessName, city, phone } = useSiteConfig();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <img src={heroImg} alt={`Premium concrete driveway poured by ${businessName} in ${city}`} width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/60 to-ink/95" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm mb-5">Concrete Contractor — {city}, TX</p>
          <h1 className="text-white font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">{city}'s Trusted<br />Concrete Contractor</h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl">Durable, expertly-poured driveways, patios, foundations and stamped concrete — backed by a written workmanship guarantee. Free on-site estimates across the {city} metro.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-colors">
              Get My Free Estimate<ArrowRight size={18} strokeWidth={2} />
            </a>
            <a href={telHref} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors">
              <Phone size={18} strokeWidth={2} />Call {phone}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/85">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={18} strokeWidth={2} className="text-success" />Licensed &amp; Insured</span>
            <span className="inline-flex items-center gap-2"><Award size={18} strokeWidth={2} className="text-primary" />22+ Years in {city}</span>
            <span className="inline-flex items-center gap-1.5">
              {[0,1,2,3,4].map((i) => <Star key={i} size={18} strokeWidth={2} className="text-primary fill-[oklch(0.78_0.16_70)]" />)}
              <span className="ml-1">4.9 / 5 from 187 reviews</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust Bar                                                         */
/* ------------------------------------------------------------------ */
function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "Licensed & Insured" },
    { icon: Award, label: "22+ Years of Experience" },
    { icon: Star, label: "5-Star Rated by Local Homeowners" },
    { icon: BadgeCheck, label: "Free Written Estimates" },
  ];
  return (
    <section aria-label="Credentials" className="bg-concrete border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 text-slate-concrete">
            <it.icon size={22} strokeWidth={1.75} className="text-ink shrink-0" />
            <span className="text-sm font-semibold text-ink">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                          */
/* ------------------------------------------------------------------ */
function Services() {
  const { businessName, city } = useSiteConfig();
  const services = [
    { icon: Truck, name: "Concrete Driveways", desc: `Durable, expertly-poured concrete driveways across ${city} — engineered to handle Texas heat without cracking.`, img: driveImg },
    { icon: Home, name: "Patios & Walkways", desc: `Custom-poured patios and walkways that transform ${city} backyards into year-round living space.`, img: walkwayImg },
    { icon: Layers, name: "Stamped & Decorative Concrete", desc: `Stamped concrete in slate, brick, and stone patterns — high-end ${city} curb appeal at a fraction of pavers.`, img: stampedImg },
    { icon: Building2, name: "Foundations & Slabs", desc: `Code-compliant residential and commercial foundations poured to spec across the ${city} metro.`, img: crewImg },
    { icon: Wrench, name: "Concrete Repair & Resurfacing", desc: `Crack repair, leveling and resurfacing for ${city} homes — extend the life of your slab for years.`, img: beforeImg },
    { icon: Construction, name: "Retaining Walls", desc: `Engineered concrete retaining walls that hold up to ${city}'s soil shifts and protect your landscape.`, img: wallImg },
    { icon: Ruler, name: "Sidewalks & Curbs", desc: `City-spec sidewalks, curbs and ADA ramps for ${city} property owners and developers.`, img: driveImg },
    { icon: HardHat, name: "Commercial Concrete", desc: `Parking lots, loading docks and tilt-wall pads delivered on schedule for ${city} businesses.`, img: commercialImg },
  ];
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-3">What we pour</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-ink">Concrete Services in {city}</h2>
          <p className="mt-5 text-lg text-slate-concrete">From a single sidewalk repair to a full commercial pad, every job is engineered, poured and finished by our in-house {city} crews. No subcontractors. No surprises.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.name} className="group bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-concrete">
                <img src={s.img} alt={`${s.name} project completed by ${businessName} in ${city}`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-ink text-primary shrink-0"><s.icon size={22} strokeWidth={1.75} /></span>
                  <h3 className="font-display text-xl uppercase text-ink leading-tight">{s.name}</h3>
                </div>
                <p className="text-sm text-slate-concrete">{s.desc}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-primary-hover">Get a quote<ChevronRight size={16} strokeWidth={2} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Us                                                            */
/* ------------------------------------------------------------------ */
function WhyUs() {
  const { businessName, city } = useSiteConfig();
  const items = [
    { icon: ShieldCheck, h: "Licensed, Bonded, Insured", p: "Fully licensed Texas concrete contractor with general liability and workers' comp coverage. Certificates available before we break ground." },
    { icon: Hammer, h: "Skilled In-House Crews", p: `Every pour, every finish, every cut — done by ${businessName} employees. We never subcontract your project to the lowest bidder.` },
    { icon: Clock, h: "On Time, On Budget", p: "Written quote, written schedule, written cure plan. If something changes, you hear it from us first — never from a surprise invoice." },
    { icon: BadgeCheck, h: "Workmanship Guarantee", p: "We stand behind every slab we pour with a written workmanship warranty. If our work fails, we come back and make it right." },
  ];
  return (
    <section className="bg-concrete py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-primary-hover font-semibold uppercase tracking-[0.2em] text-xs mb-3">Why choose us</p>
          <h2 className="text-4xl sm:text-5xl text-ink">Why {city} homeowners pick {businessName}</h2>
          <p className="mt-5 text-lg text-slate-concrete">We've poured concrete across the {city} metro for more than two decades. Here's what you get when you hire us — and what most contractors won't put in writing.</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {items.map((it) => (
              <div key={it.h}>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-ink text-primary mb-3"><it.icon size={28} strokeWidth={1.75} /></span>
                <h3 className="font-display text-lg uppercase text-ink mb-1.5">{it.h}</h3>
                <p className="text-sm text-slate-concrete">{it.p}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={crewImg} alt={`${businessName} crew screeding a freshly poured foundation slab in ${city}`} width={1024} height={768} loading="lazy" className="rounded-lg w-full h-auto object-cover shadow-card-hover" />
          <div className="hidden sm:block absolute -bottom-6 -left-6 bg-ink text-white p-5 rounded-lg max-w-[220px] shadow-card-hover">
            <p className="font-display text-4xl text-primary">22+</p>
            <p className="text-sm mt-1 text-white/85">Years pouring concrete across the {city} metro</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Process                                                           */
/* ------------------------------------------------------------------ */
function Process() {
  const steps = [
    { icon: ClipboardCheck, h: "Free Estimate", p: "We come out, measure, and listen. No charge, no pressure." },
    { icon: Ruler, h: "Custom Plan & Quote", p: "Written, itemized scope and price emailed within 48 hours." },
    { icon: Hammer, h: "Expert Installation", p: "Our in-house crew pours, finishes and cleans up — daily." },
    { icon: CheckCircle2, h: "Final Walkthrough", p: "We walk the job with you and hand over a written cure plan." },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-3">How it works</p>
          <h2 className="text-4xl sm:text-5xl text-ink">A simple, no-pressure process</h2>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((s, i) => (
            <li key={s.h} className="relative bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-5xl text-primary leading-none">{String(i + 1).padStart(2, "0")}</span>
                <s.icon size={24} strokeWidth={1.75} className="text-ink" />
              </div>
              <h3 className="font-display text-xl uppercase text-ink">{s.h}</h3>
              <p className="mt-2 text-sm text-slate-concrete">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                           */
/* ------------------------------------------------------------------ */
function BeforeAfter({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [dragging, updateFromClientX]);

  return (
    <div ref={ref} className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-lg bg-ink select-none touch-none" onPointerDown={(e) => { setDragging(true); updateFromClientX(e.clientX); }}>
      <img src={after} alt={afterAlt} width={1600} height={1000} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
        <img src={before} alt={beforeAlt} width={1600} height={1000} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ width: `${100 / (pos / 100 || 0.0001)}%`, maxWidth: "none" }} />
      </div>
      <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-ink/85 text-white text-xs font-semibold uppercase tracking-wider">Before</span>
      <span className="absolute top-4 right-4 px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">After</span>
      <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-1px)" }} />
      <button type="button" aria-label="Drag to compare before and after" onPointerDown={(e) => { e.stopPropagation(); setDragging(true); }} className="absolute top-1/2 h-11 w-11 -mt-[22px] -ml-[22px] rounded-full bg-white text-ink shadow-lg flex items-center justify-center cursor-ew-resize hover:scale-105 transition-transform" style={{ left: `${pos}%` }}>
        <MoveHorizontal size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function Gallery() {
  const { city } = useSiteConfig();
  const gallery = [
    { cat: "Driveway", location: `Pflugerville, ${city}`, title: "Cracked slab → broom-finished driveway", summary: "Full tear-out of a 40-year-old slab, new 4\" reinforced pour with control joints and a clean broom finish.", before: beforeImg, after: driveImg, beforeAlt: "Before: cracked old concrete driveway", afterAlt: `After: new broom-finished concrete driveway in ${city}` },
    { cat: "Patio", location: `South ${city}`, title: "Weed-choked patio → slate-stamped retreat", summary: "Demo of the failing slab, then a stamped-and-stained slate pattern patio sealed for Texas summers.", before: beforePatioImg, after: stampedImg, beforeAlt: "Before: cracked concrete patio with weeds", afterAlt: `After: slate-stamped concrete patio in ${city}` },
    { cat: "Walkway", location: "Cedar Park", title: "Broken walkway → curved front path", summary: "Removed the heaving slab, regraded the base, and poured a smooth curved walkway with hand-tooled edges.", before: beforeWalkwayImg, after: walkwayImg, beforeAlt: "Before: cracked and broken concrete walkway", afterAlt: "After: curved concrete walkway" },
    { cat: "Wall", location: "Lakeway", title: "Eroding hillside → engineered retaining wall", summary: "Designed and poured a tiered retaining wall to hold a sloped backyard and recover usable space.", before: crewImg, after: wallImg, beforeAlt: "Before: hillside prepped for retaining wall", afterAlt: "After: tiered concrete retaining wall" },
    { cat: "Commercial", location: `Downtown ${city}`, title: "Rough subgrade → polished plaza", summary: "Commercial-grade pour with decorative polish for a downtown plaza — installed on schedule, after hours.", before: crewImg, after: commercialImg, beforeAlt: "Before: prepped commercial subgrade", afterAlt: `After: polished decorative concrete plaza in downtown ${city}` },
  ];

  const [idx, setIdx] = useState(0);
  const total = gallery.length;
  const item = gallery[idx];
  const go = (n: number) => setIdx((idx + n + total) % total);

  return (
    <section id="gallery" className="bg-concrete py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-primary-hover font-semibold uppercase tracking-[0.2em] text-xs mb-3">Before &amp; After</p>
            <h2 className="text-4xl sm:text-5xl text-ink">See the transformation</h2>
            <p className="mt-4 text-lg text-slate-concrete">Drag the slider on each project to reveal the before and after. Real {city} jobs, real crews, real results.</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="h-11 w-11 rounded-md border border-border bg-background text-ink hover:border-ink flex items-center justify-center transition-colors"><ChevronLeft size={20} /></button>
            <span className="text-sm font-semibold text-ink tabular-nums w-14 text-center">{String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next project" className="h-11 w-11 rounded-md border border-border bg-background text-ink hover:border-ink flex items-center justify-center transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
          <BeforeAfter key={idx} before={item.before} after={item.after} beforeAlt={item.beforeAlt} afterAlt={item.afterAlt} />
          <div className="bg-background border border-border rounded-lg p-6 lg:p-7">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-hover">{item.cat}</p>
            <h3 className="mt-3 text-2xl text-ink leading-tight">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-concrete flex items-center gap-1.5"><MapPin size={14} className="text-primary-hover" />{item.location}</p>
            <p className="mt-5 text-base text-slate-concrete leading-relaxed">{item.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {gallery.map((g, i) => (
                <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`View ${g.cat} project`} aria-current={i === idx} className={`h-2.5 rounded-full transition-all ${i === idx ? "w-8 bg-ink" : "w-2.5 bg-border hover:bg-slate-concrete"}`} />
              ))}
            </div>
            <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary-hover transition-colors">Get a quote for a project like this <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Areas                                                     */
/* ------------------------------------------------------------------ */
function ServiceAreas() {
  const { businessName, city } = useSiteConfig();
  const areas = ["Downtown Austin", "Round Rock", "Cedar Park", "Pflugerville", "Leander", "Buda", "Kyle", "Lakeway", "Bee Cave", "Manor", "Hutto", "Georgetown"];
  return (
    <section id="areas" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-3">Where we work</p>
          <h2 className="text-4xl sm:text-5xl text-ink">Proudly Serving {city} and Surrounding Areas</h2>
          <p className="mt-5 text-lg text-slate-concrete">Based in {city}, we pour concrete across the metro and into the suburbs. If your town isn't listed, call us — we likely still serve you.</p>
          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {areas.map((a) => (
              <li key={a} className="flex items-center gap-2 text-slate-concrete">
                <MapPin size={16} strokeWidth={2} className="text-primary-hover shrink-0" />
                <span className="text-sm font-medium text-ink">{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden border border-border bg-concrete aspect-[4/3] lg:aspect-auto lg:h-[460px]">
          <iframe title={`Map of ${businessName} service area in ${city}`} src="https://www.openstreetmap.org/export/embed.html?bbox=-97.95%2C30.15%2C-97.55%2C30.45&amp;layer=mapnik" className="w-full h-full" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                      */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const { city } = useSiteConfig();
  const reviews = [
    { name: "Marcus T.", area: `Cedar Park, ${city}`, text: `Apex tore out a cracked 40-year-old driveway and poured a beautiful new broom-finished slab in three days. Crew was on time every morning, cleaned up every night. Best contractor experience I've had.` },
    { name: "Jenna R.", area: `South ${city}`, text: `We had three other contractors quote our stamped patio. Apex was the only one who showed up with samples, explained the cure process, and put it all in writing. The finished patio is stunning.` },
    { name: "David L.", area: "Round Rock", text: `Foundation slab for our shop building — poured exactly to spec, passed inspection first time, and came in on budget. I've already booked them for the parking lot extension.` },
  ];
  return (
    <section id="reviews" className="bg-ink concrete-grain text-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-3">What clients say</p>
          <h2 className="text-4xl sm:text-5xl text-white">Trusted by {city} homeowners &amp; builders</h2>
          <div className="mt-5 flex items-center gap-3 text-white/85">
            <div className="flex">{[0,1,2,3,4].map((i) => <Star key={i} size={20} strokeWidth={2} className="text-primary fill-[oklch(0.78_0.16_70)]" />)}</div>
            <span className="text-sm"><strong className="text-white">4.9</strong> from <strong className="text-white">187</strong> reviews</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article key={r.name} className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
              <Quote size={20} strokeWidth={2} className="text-primary mb-4" />
              <p className="text-white/90 text-base leading-relaxed">"{r.text}"</p>
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                <div><p className="font-semibold text-white">{r.name}</p><p className="text-sm text-white/60">{r.area}</p></div>
                <div className="flex">{[0,1,2,3,4].map((i) => <Star key={i} size={14} strokeWidth={2} className="text-primary fill-[oklch(0.78_0.16_70)]" />)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */
function FAQ() {
  const { businessName, city, phone } = useSiteConfig();
  const faqs = [
    { q: `How much does a new concrete driveway cost in ${city}?`, a: `Most residential driveways in ${city} run between $8 and $14 per square foot installed. Final pricing depends on thickness, reinforcement, demolition of the existing slab, and any decorative finish. Every estimate we provide is written, itemized, and free.` },
    { q: "How long does concrete take to cure?", a: "Concrete is typically walkable after 24 hours, ready for foot traffic and light use in 3 days, and reaches roughly 70% of its strength after 7 days. Full cure for vehicle loads is 28 days. We hand you a written cure schedule on every job." },
    { q: "Are you licensed and insured?", a: `Yes. ${businessName} is fully licensed, bonded and carries general liability and workers' compensation insurance. License and insurance certificates are available on request before any work begins.` },
    { q: "Do you offer a workmanship warranty?", a: "Every project is backed by our written workmanship guarantee. If we miss the mark on installation, we come back and make it right — in writing, no fine print." },
    { q: "Is your estimate really free?", a: "Yes — every estimate is free, on-site, and obligation-free. We measure, discuss your project, and email a written quote within 48 hours. No high-pressure sales." },
    { q: `How soon can you start my project?`, a: `Most residential projects in ${city} start within 2–3 weeks of accepting the quote, weather permitting. Repair jobs and small pours can often be scheduled inside of a week.` },
    { q: "Do you handle permits and inspections?", a: `Yes. For projects that require ${city} permits or HOA approval, we pull the paperwork, schedule inspections, and coordinate with city officials so you don't have to.` },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-3">Common questions</p>
          <h2 className="text-4xl sm:text-5xl text-ink">Concrete questions, answered</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left" aria-expanded={isOpen}>
                  <span className="font-display text-lg uppercase text-ink">{f.q}</span>
                  <ChevronDown size={20} strokeWidth={2} className={`text-slate-concrete shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="pb-6 pr-10 text-slate-concrete">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Banner                                                        */
/* ------------------------------------------------------------------ */
function CTABanner() {
  const { city, phone } = useSiteConfig();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  return (
    <section className="bg-ink concrete-grain text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl text-white">Get Your Free Concrete Estimate in {city} Today</h2>
          <p className="mt-4 text-white/80 text-lg">On-site measurement, written quote inside 48 hours, zero obligation.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#contact" className="inline-flex items-center justify-center px-6 py-4 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">Request Free Estimate</a>
          <a href={telHref} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"><Phone size={18} strokeWidth={2} />Call {phone}</a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                           */
/* ------------------------------------------------------------------ */
const inputCls = "w-full px-4 py-3 rounded-md bg-background border border-border text-ink placeholder:text-slate-concrete/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";

function Field({ label, id, error, children, className = "" }: { label: string; id: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Contact() {
  const { businessName, city, phone } = useSiteConfig();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const serviceNames = ["Concrete Driveways", "Patios & Walkways", "Stamped & Decorative Concrete", "Foundations & Slabs", "Concrete Repair & Resurfacing", "Retaining Walls", "Sidewalks & Curbs", "Commercial Concrete"];
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: serviceNames[0], details: "", zip: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[0-9()+\-.\s]{7,}$/.test(form.phone)) e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.zip.trim()) e.zip = "Please enter your ZIP or city.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };
  return (
    <section id="contact" className="bg-concrete py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="text-primary-hover font-semibold uppercase tracking-[0.2em] text-xs mb-3">Free estimate</p>
          <h2 className="text-4xl sm:text-5xl text-ink">Tell us about your project</h2>
          <p className="mt-4 text-lg text-slate-concrete">Fill this out and we'll be in touch within one business day to schedule your free on-site estimate.</p>
          {submitted ? (
            <div className="mt-8 p-8 bg-card border border-success/40 rounded-lg flex gap-4">
              <CheckCircle2 size={32} strokeWidth={2} className="text-success shrink-0" />
              <div>
                <h3 className="font-display text-2xl uppercase text-ink">Request received</h3>
                <p className="mt-2 text-slate-concrete">Thanks, {form.name}. We'll call you at {form.phone} within one business day. Need to talk now? <a href={telHref} className="text-primary-hover font-semibold underline">{phone}</a>.</p>
              </div>
            </div>
          ) : (
            <div className="mt-8 bg-card border border-border rounded-lg p-6 sm:p-8 grid sm:grid-cols-2 gap-5">
              <Field label="Full name" id="name" error={errors.name}><input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} /></Field>
              <Field label="Phone" id="phone" error={errors.phone}><input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} /></Field>
              <Field label="Email" id="email" error={errors.email}><input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} /></Field>
              <Field label="ZIP or city" id="zip" error={errors.zip}><input id="zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} className={inputCls} /></Field>
              <Field label="Service needed" id="service" className="sm:col-span-2">
                <select id="service" value={form.service} onChange={(e) => update("service", e.target.value)} className={inputCls}>
                  {serviceNames.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Project details" id="details" className="sm:col-span-2">
                <textarea id="details" rows={4} value={form.details} onChange={(e) => update("details", e.target.value)} className={inputCls} placeholder="Approx. square footage, timeline, anything we should know..." />
              </Field>
              <div className="sm:col-span-2">
                <button type="button" onClick={handleSubmit} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">Get My Free Estimate<ArrowRight size={18} strokeWidth={2} /></button>
                <p className="mt-3 text-xs text-slate-concrete">We respect your privacy. Your info is only used to contact you about your project.</p>
              </div>
            </div>
          )}
        </div>
        <aside className="lg:col-span-2">
          <div className="bg-ink concrete-grain text-white rounded-lg p-6 sm:p-8">
            <h3 className="font-display text-2xl uppercase">{businessName}</h3>
            <p className="mt-2 text-white/70 text-sm">{city}'s trusted concrete contractor.</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3"><Phone size={18} strokeWidth={2} className="text-primary mt-0.5 shrink-0" /><a href={telHref} className="hover:text-primary">{phone}</a></li>
              <li className="flex items-start gap-3"><Mail size={18} strokeWidth={2} className="text-primary mt-0.5 shrink-0" /><a href="mailto:estimates@apexconcreteco.com" className="hover:text-primary">estimates@apexconcreteco.com</a></li>
              <li className="flex items-start gap-3"><MapPin size={18} strokeWidth={2} className="text-primary mt-0.5 shrink-0" /><span>1428 Industrial Blvd<br />{city}, TX 78702</span></li>
              <li className="flex items-start gap-3"><Clock size={18} strokeWidth={2} className="text-primary mt-0.5 shrink-0" /><span>Mon–Fri 7:00a–6:00p<br />Sat 8:00a–2:00p<br />Sun closed</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */
function Footer() {
  const { businessName, city, phone } = useSiteConfig();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const serviceNames = ["Concrete Driveways", "Patios & Walkways", "Stamped & Decorative Concrete", "Foundations & Slabs", "Concrete Repair & Resurfacing", "Retaining Walls"];
  return (
    <footer className="bg-ink concrete-grain text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl uppercase text-white">{businessName}</p>
          <p className="mt-3 text-sm">{city}'s trusted concrete contractor for driveways, patios, foundations and decorative concrete.</p>
          <p className="mt-4 text-sm text-white/60">Licensed &amp; Insured — License #000000</p>
        </div>
        <div>
          <p className="font-display text-sm uppercase text-white mb-4 tracking-wider">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {["#services|Services", "#gallery|Gallery", "#reviews|Reviews", "#areas|Service Areas", "#faq|FAQ"].map((l) => {
              const [href, label] = l.split("|");
              return <li key={href}><a href={href} className="hover:text-primary">{label}</a></li>;
            })}
          </ul>
        </div>
        <div>
          <p className="font-display text-sm uppercase text-white mb-4 tracking-wider">Services</p>
          <ul className="space-y-2 text-sm">
            {serviceNames.map((s) => <li key={s}><a href="#services" className="hover:text-primary">{s}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="font-display text-sm uppercase text-white mb-4 tracking-wider">Contact</p>
          <ul className="space-y-2 text-sm">
            <li><a href={telHref} className="hover:text-primary">{phone}</a></li>
            <li>estimates@apexconcreteco.com</li>
            <li>1428 Industrial Blvd<br />{city}, TX 78702</li>
            <li className="text-white/60 pt-2">Mon–Fri 7a–6p · Sat 8a–2p</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
          <p>Built to last in {city}, Texas.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky mobile call bar                                            */
/* ------------------------------------------------------------------ */
function StickyCallBar() {
  const { businessName, phone } = useSiteConfig();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  return (
    <a href={telHref} className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-primary text-primary-foreground font-semibold py-4 flex items-center justify-center gap-2 shadow-card-hover" aria-label={`Call ${businessName} at ${phone}`}>
      <Phone size={20} strokeWidth={2} /><span>Call Now — {phone}</span>
    </a>
  );
}
