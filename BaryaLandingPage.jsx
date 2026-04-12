import React, { useState } from "react";

/**
 * NOTE: This React component is not wired into the current runtime.
 * The app shipped in this repository is rendered from index.html + app.js
 * (plain JavaScript, no React bundler entrypoint).
 */
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workspace", href: "#workspace" },
  { label: "Privacy", href: "#privacy" },
  { label: "Story", href: "#story" }
];

const heroTrustCards = [
  { title: "Founder-first", text: "Built for beginners and early-stage operators." },
  { title: "Private by default", text: "Local-first workspace keeps your planning secure." },
  { title: "Action-focused", text: "Practical next steps instead of generic theory." }
];

const trustStrip = ["Founder-first", "Local-first privacy", "Beginner-friendly", "AI-powered planning"];

const whatIsCards = [
  { title: "Track finances and savings", desc: "See your monthly momentum with clear numbers and useful context." },
  { title: "Generate business ideas quickly", desc: "Use guided prompts to find practical startup opportunities fast." },
  { title: "Create business plans with templates", desc: "Turn scattered notes into structured plans you can execute." },
  { title: "Learn step-by-step with startup guides", desc: "Follow practical workflows built for first-time founders." }
];

const whyToolItems = [
  "Simple and beginner-friendly workflows",
  "No login required / local-first storage",
  "Works instantly in the browser",
  "Focused on real execution, not theory"
];

const features = [
  {
    title: "Dashboard",
    desc: "Track income, expenses, and savings in a clean founder command center.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 9h10M7 13h4m2 0h4" />
      </svg>
    )
  },
  {
    title: "AI Assistant",
    desc: "Get practical business advice, next steps, and decision support.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 4 7v6c0 4.2 3.4 7.5 8 8 4.6-.5 8-3.8 8-8V7l-8-4Z" />
        <path d="M9.5 12h5M12 9.5v5" />
      </svg>
    )
  },
  {
    title: "Business Planning",
    desc: "Use planning templates and startup guides to map your business clearly.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 4h8l4 4v12H7z" />
        <path d="M15 4v4h4M10 13h6M10 17h6" />
      </svg>
    )
  },
  {
    title: "Idea Generator",
    desc: "Generate startup ideas and opportunities aligned to your skills and market.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3a6 6 0 0 0-3.8 10.6c.8.7 1.3 1.7 1.3 2.8V18h5v-1c0-1.1.5-2.1 1.3-2.8A6 6 0 0 0 12 3Z" />
        <path d="M9.5 21h5" />
      </svg>
    )
  }
];

const howToSteps = ["Choose a feature", "Fill templates or ask AI", "Save your progress", "Improve your business"];

const privacyPoints = [
  "Your data stays on your device",
  "Local storage based workspace",
  "Private and secure by default",
  "Export backup when needed"
];

const values = [
  "Clarity over confusion",
  "Practical action over theory",
  "Private workspaces over noise",
  "Growth with confidence"
];

const footerLinks = ["How it Works", "Privacy Policy", "Features", "Get Started"];

const BaryaLogo = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 52 52" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="barya-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="46" height="46" rx="14" fill="url(#barya-gradient)" />
    <path d="M14 34V18h12.8c4.5 0 7.2 2.4 7.2 6.2 0 2.9-1.6 4.8-4.1 5.6L34 34h-6.2l-3.4-3.8h-4.6V34H14Zm5.8-8.2h6.5c1.5 0 2.4-.8 2.4-2.2s-.9-2.1-2.4-2.1h-6.5v4.3Z" fill="white" />
  </svg>
);

const SectionHeader = ({ eyebrow, title, description }) => (
  <header className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
    {eyebrow && (
      <p className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
  </header>
);

export default function BaryaLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-gradient-to-b from-blue-50 via-emerald-50/30 to-transparent" />

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
          <a href="#" className="flex items-center gap-3">
            <BaryaLogo className="h-9 w-9" />
            <span className="text-lg font-semibold tracking-tight">Barya Business AI Assistant</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
            <button className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 sm:inline-flex">
              Start Planning
            </button>
            <button className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 sm:px-5">
              Get Started
            </button>
          </div>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden sm:px-6">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700">
                Start Planning
              </button>
              <button className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-20">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              Business Growth Platform
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              Build your business with clarity, confidence, and smart execution.
            </h1>
            <p className="mt-6 text-lg font-medium text-slate-700">
              Build, plan, and grow your business with smart tools and practical guidance.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Barya helps founders turn ideas into clear plans, practical strategies, and trackable execution so every week moves your business forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">
                Start Planning
              </button>
              <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700">
                Get Started
              </button>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroTrustCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl shadow-blue-900/10 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
                alt="Female founder working at a startup desk"
                className="h-[28rem] w-full object-cover"
              />
            </div>
            <div className="absolute -left-6 top-6 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Monthly Income</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">$18,400</p>
              <p className="text-xs text-emerald-600">+12.4% this month</p>
            </div>
            <div className="absolute -right-5 top-1/3 w-52 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Startup Readiness Score</p>
              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
              </div>
              <p className="mt-2 text-sm text-slate-600">82 / 100 • Strong progress</p>
            </div>
            <div className="absolute bottom-16 -left-8 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl">
              <p className="text-xs text-slate-500">Expenses</p>
              <p className="text-lg font-semibold text-slate-900">$9,150</p>
              <p className="mt-2 text-xs text-slate-500">Net Savings</p>
              <p className="text-lg font-semibold text-emerald-600">$9,250</p>
            </div>
            <div className="absolute -bottom-7 right-4 w-64 rounded-2xl border border-blue-100 bg-blue-50/90 p-4 shadow-lg">
              <p className="text-sm font-semibold text-blue-900">AI Suggestion</p>
              <p className="mt-2 text-sm text-blue-800">Raise conversion by testing a 7-day onboarding checklist for new users.</p>
              <div className="mt-3 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-emerald-400/20 p-2">
                <div className="h-full w-4/5 rounded bg-gradient-to-r from-blue-500 to-emerald-500" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 md:grid-cols-4 md:p-6">
            {trustStrip.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What is Barya"
            title="A business-building platform for founders who need clarity"
            description="Barya gives beginners and early-stage founders a practical structure to plan better, move faster, and execute with confidence."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whatIsCards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50 p-8 lg:p-10">
            <SectionHeader
              eyebrow="Why this tool"
              title="Designed for execution-focused founders"
              description="Everything in Barya is built to remove friction so you can make smarter decisions quickly."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {whyToolItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Key features"
            title="Everything you need to plan and grow"
            description="Premium tools crafted for everyday founder workflows."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader
              eyebrow="How to use"
              title="Launch your workflow in four simple steps"
              description="Start fast, stay organized, and improve your startup decisions every week."
            />
            <ol className="space-y-4">
              {howToSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-base font-medium text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="Team collaborating on startup planning"
              className="h-full min-h-[24rem] w-full rounded-2xl object-cover"
            />
            <div className="absolute inset-x-10 bottom-10 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Execution Tip</p>
              <p className="mt-1 text-sm text-slate-600">Review your readiness score every Friday and pick one measurable next action.</p>
            </div>
          </div>
        </section>

        <section id="workspace" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Founder workspace"
            title="See Your Founder Workspace"
            description="A realistic command center where planning, tracking, and execution happen in one place."
          />

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
            <div className="grid lg:grid-cols-[260px_1fr]">
              <aside className="border-b border-slate-200 bg-slate-900 p-6 text-slate-200 lg:border-b-0 lg:border-r">
                <div className="mb-8 flex items-center gap-3">
                  <BaryaLogo className="h-9 w-9" />
                  <div>
                    <p className="font-semibold text-white">Barya</p>
                    <p className="text-xs text-slate-400">Founder OS</p>
                  </div>
                </div>
                <nav className="space-y-2 text-sm">
                  {["Dashboard", "AI Assistant", "Business Planning", "Idea Generator", "Privacy", "Reports"].map((item, i) => (
                    <a
                      key={item}
                      href="#"
                      className={`block rounded-xl px-3 py-2 transition ${
                        i === 0 ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </aside>

              <div className="p-6 lg:p-8">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Startup Readiness", "82/100"],
                    ["Monthly Income", "$18,400"],
                    ["Total Expenses", "$9,150"],
                    ["Net Savings", "$9,250"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Growth trend</p>
                    <div className="mt-4 h-52 rounded-xl bg-gradient-to-b from-blue-50 to-emerald-50 p-4">
                      <svg viewBox="0 0 500 160" className="h-full w-full">
                        <defs>
                          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        <path d="M0 130 C80 120, 120 80, 180 90 C250 100, 290 40, 350 55 C410 70, 450 30, 500 25" fill="none" stroke="url(#lineGrad)" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-semibold text-slate-900">Recent activity</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>• Updated revenue forecast for Q3</li>
                        <li>• Added onboarding funnel checklist</li>
                        <li>• Saved AI strategy recommendations</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
                      <p className="text-sm font-semibold text-emerald-900">Recommendations</p>
                      <p className="mt-2 text-sm text-emerald-800">
                        Focus next sprint on retention workflows. Improving activation by 10% may add ~$2,100 monthly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="privacy" className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
              alt="Founder working securely on a laptop"
              className="h-full min-h-[24rem] w-full rounded-2xl object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Private workspace</p>
              <p className="mt-1 text-sm text-slate-600">No external AI API dependency for your core planning workflow.</p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Privacy / Local-first"
              title="Your startup data stays with you"
              description="Barya is designed for trust from day one so founders can plan confidently without data anxiety."
            />
            <div className="space-y-3">
              {privacyPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">🔒</span>
                  <p className="text-sm font-medium text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Founder story"
              title="Why I Built Barya"
              description="I saw too many founders lose momentum by jumping between scattered tools, messy notes, and unclear plans."
            />
            <p className="text-base leading-relaxed text-slate-600">
              Barya was created to reduce confusion and give beginners one trusted workspace for planning, tracking, and execution. Instead of chasing complicated systems, founders get practical guidance, clear numbers, and focused next actions that build confidence over time.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
                  {value}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
              alt="Founder presenting startup vision"
              className="h-full min-h-[24rem] w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-500 px-6 py-16 text-center text-white shadow-2xl shadow-indigo-500/25 sm:px-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Ready to build your business with clarity?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-blue-50 sm:text-lg">
              Join founders using Barya to turn business ideas into focused plans, measurable progress, and confident execution.
            </p>
            <button className="mt-9 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100">
              Get Started
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <BaryaLogo className="h-9 w-9" />
            <div>
              <p className="font-semibold text-slate-900">Barya Business AI Assistant</p>
              <p className="text-sm text-slate-500">Built with love for founders</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-5 text-sm font-medium text-slate-600">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="transition hover:text-slate-900">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
