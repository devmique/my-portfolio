import profileImg from "@/assets/profile.jpg";
import s1 from "@/assets/skills/html.jpg"
import s2 from "@/assets/skills/css.jpg";
import s3 from "@/assets/skills/javascript.png";
import s4 from "@/assets/skills/tailwind.jpg";
import s5 from "@/assets/skills/react.jpg";
import s6 from "@/assets/skills/typescript.png";
import s7 from "@/assets/skills/next.png";
import s8 from "@/assets/skills/nodejs.jpg";
import s9 from "@/assets/skills/express.jpg";
import s10 from "@/assets/skills/mysql.jpg";
import s11 from "@/assets/skills/mongo.png";
import s12 from "@/assets/skills/git.png";
import s13 from "@/assets/skills/supabase.jpg";
import s14 from "@/assets/skills/docker.png";
import s15 from "@/assets/skills/postgre.png"
// ─── Project images: lazy dynamic imports so they don't block the initial bundle ─────
import { lazy, Suspense, useState, FormEvent } from "react";
import resume from "@/assets/Johnlord_Mique_resume.pdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "@/hooks/use-in-view";
import { Typewriter } from "@/components/Typewriter";
import { Mail, Linkedin, Github, SquareArrowOutUpRightIcon, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import "@/App.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import CertificateDeck from "@/components/CertificateDeck";
import { certificateAlbums } from "@/data/certificates";
import Gallery from "@/components/Gallery";
import { ProjectCard } from "@/components/ProejctCard";
import { Project } from "@/types/project";

// ─── Project image imports (kept static so Vite can hash/cache them,
//     but the <img> elements themselves are lazy-loaded via loading="lazy") ────
import p1 from "@/assets/projects/project-1.jpg";
import p3 from "@/assets/projects/project-2.jpg";
import p2 from "@/assets/projects/project-4.jpg";
import p4 from "@/assets/projects/project-5.jpg";
import p5 from "@/assets/projects/project-6.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const skills = [
  { src: s1,  alt: "html",       name: "HTML" },
  { src: s2,  alt: "css",        name: "CSS" },
  { src: s3,  alt: "js",         name: "JavaScript" },
  { src: s4,  alt: "tailwind",   name: "Tailwind CSS" },
  { src: s5,  alt: "react",      name: "React" },
  { src: s6,  alt: "ts",         name: "TypeScript" },
  { src: s7,  alt: "next",       name: "Next.js" },
  { src: s8,  alt: "node",       name: "Node.js" },
  { src: s9,  alt: "express",    name: "Express" },
  { src: s10, alt: "mysql",      name: "MySQL" },
  { src: s11, alt: "mongodb",    name: "MongoDB" },
  { src: s15, alt: "postgre",    name: "PostgreSQL" },
  { src: s12, alt: "git",        name: "Git" },
  { src: s13, alt: "supabase",   name: "Supabase" },
  { src: s14, alt: "docker",     name: "Docker" },
];

const projects: Project[] = [
  {
    imgSrc: p5,
    title: "TranSync PH — B2B SaaS Bus Operator Management System",
    desc: "A B2B SaaS platform for Philippine bus operators to manage routes, schedules, and terminals — with a public-facing commuter map for terminal locations, live trip locations, and routes with schedule information.",
    glink: "https://github.com/devmique/b2b-saas-bus-operator-management-system",
    llink: "https://transyncph.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Shadcn-UI", "MongoDB", "Leaflet", "Zod", "Vercel", "Render"],
  },
   {
    imgSrc: p3,
    title: "AInterview — A Job Interview Preparation Platform",
    desc: "A job interview preparation platform powered by Vapi AI Voice Agents and Google Gemini. It is designed to help job seekers practice real-time AI-driven interviews and get instant feedback.",
    glink: "https://github.com/devmique/ai-mock-interview",
    llink: "https://ai-mock-interview-chi-nine.vercel.app",
    tech: ["Next.js", "Firebase", "Tailwind CSS", "Vapi AI", "Shadcn-UI", "Google Gemini", "Zod", "Vercel"],
  },
  {
    imgSrc: p1,
    title: "Parents Portal Management System",
    desc: "A full-stack school management platform designed to connect schools and parents. It provides an easy way for parents to stay updated with their child's academic life while giving administrators powerful tools to manage attendance, grades, class schedule, events, and direct communication with parents.",
    glink: "https://github.com/devmique/full-stack-parents-portal",
    llink: "",
    tech: ["React.js", "Node.js", "Express.js", "Redis", "MySQL", "Google Gemini"],
  },
  {
    imgSrc: p4,
    title: "WorkspaceOS — A SaaS Workspace Dashboard",
    desc: "A SaaS application that showcases production-ready patterns including Row Level Security, Server Actions, optimistic UI updates, and multi-tenancy with activity tracking.",
    glink: "https://github.com/devmique/saas-workspace-dashboard/",
    llink: "https://saas-workspace-dashboard.vercel.app/",
    tech: ["Next.js", "TailwindCSS", "Supabase", "Shadcn-UI", "Recharts", "Vercel"],
  },
  {
    imgSrc: p2,
    title: "Student Violation Tracking System",
    desc: "A full-stack web application for managing and monitoring student violations. The system allows administrators to record and view student violations while providing a detailed profile for each student.",
    glink: "https://github.com/devmique/student_violation_tracking_system",
    llink: "",
    tech: ["React.js", "TypeScript", "TailwindCSS", "Shadcn-UI", "Node.js", "Express.js", "MongoDB"],
  },
  
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`container px-4 py-20 scroll-mt-24 ${className} ${
        inView ? "animate-fade-in" : "opacity-0"
      }`}
    >
      {children}
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [sending, setSending] = useState(false);
  const totalCerts = certificateAlbums.reduce(
    (sum, a) => sum + a.certificates.length,
    0
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    if (!email || !message) return;

    setSending(true);
    try {
      const res = await fetch(
        "https://portfolio-email-backend-ssz5.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message }),
        }
      );
      if (res.ok) {
        toast({ title: "Message sent successfully!" });
        form.reset();
      } else {
        toast({ title: "Failed to send message" });
      }
    } catch {
      toast({ title: "Server error" });
    }
    setSending(false);
  };

  return (
    <>
      <LoadingScreen />
      <main>
        {/* ── Hero / About ──────────────────────────────────────────────────── */}
        <Section id="about" className="pt-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Profile photo ─ LCP element: high priority, sync decode */}
            <div
              className="relative mx-auto w-56 h-56 md:w-72 md:h-72"
              style={{ perspective: "1000px" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -20;
                const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 20;
                const inner = e.currentTarget.querySelector(".tilt-inner") as HTMLElement;
                if (inner) inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                const inner = e.currentTarget.querySelector(".tilt-inner") as HTMLElement;
                if (inner) inner.style.transform = "rotateX(0deg) rotateY(0deg)";
              }}
            >
              <div
                className="tilt-inner relative w-full h-full transition-transform duration-200 ease-out"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute -inset-6 rounded-full bg-primary/10 blur-2xl" aria-hidden />
                <img
                  src={profileImg}
                  alt="Portrait of Johnlord Mique"
                  // ✅ LCP image: eager load + high fetch priority + sync decode
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={288}
                  height={288}
                  className="relative rounded-full object-cover w-full h-full shadow-xl animate-float"
                />
                <span
                  className="absolute right-4 bottom-5 h-5 w-5 rounded-full bg-green-500 ring-4 ring-background"
                  aria-label="Active"
                />
              </div>
            </div>

            {/* min-w-0: without it this grid item refuses to shrink below the skills
                strip's max-content width and blows out the page on mobile */}
            <div className="min-w-0 text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Hi, I'm Johnlord Mique
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Information Technology Undergraduate and I build efficient software solutions.
                I specialize in problem-solving, designing, and crafting applications that
                blend performance with great user experience.
              </p>
              {/* Skills carousel ─ lazy + async so they don't block paint */}
              <div className="skills-wrapper mt-6">
                <div className="skills">
                  {[...skills, ...skills].map((skill, index) => (
                    <div
                      key={index}
                      className="group relative"
                      // Second copy is purely decorative — hide from screen readers
                      aria-hidden={index >= skills.length}
                    >
                      <img
                        src={skill.src}
                        alt={skill.name}
                        // ✅ Carousel icons: lazy + async (below-the-fold on many viewports)
                        loading="lazy"
                        decoding="async"
                        width={40}
                        height={40}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      <span className="
                        absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2
                        px-2.5 py-1 text-xs font-semibold text-white
                        bg-gray-800 rounded-md whitespace-nowrap pointer-events-none
                        opacity-0 translate-y-1 transition-all duration-200
                        group-hover:opacity-100 group-hover:translate-y-0
                        after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2
                        after:border-[5px] after:border-transparent after:border-b-gray-800
                      ">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-xl">
                <span className="text-muted-foreground">I'm a </span>
                <span className="font-medium text-primary">
                  <Typewriter words={["MERN Stack Developer", "Full-Stack Developer", "React Developer"]} />
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects"><Button>View Projects</Button></a>
                <a href={resume} download="johnlord_mique_resume.pdf">
                  <Button variant="outline"><Download className="h-4 w-4 mr-2" />Download CV</Button>
                </a>
                <a href="https://github.com/devmique"><Button><Github />Github</Button></a>
                <a href="https://www.linkedin.com/in/johnlord-mique-40b5a1342/">
                  <Button variant="outline"><Linkedin />LinkedIn</Button>
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <Section id="projects">
          <header className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
            <p className="text-muted-foreground mt-2">Selected full-stack projects focused on real-world systems and experiments.</p>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} />
            ))}
          </div>
        </Section>

        {/* ── Certifications ────────────────────────────────────────────────── */}
        <Section id="certifications">
          <header className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">Certifications</h2>
            <p className="text-muted-foreground mt-2">
              {totalCerts} certificates across {certificateAlbums.length} platforms —
              highlights from ongoing learning.
            </p>
          </header>
          <CertificateDeck albums={certificateAlbums} />
        </Section>

        {/* ── Gallery ───────────────────────────────────────────────────────── */}
        <Section id="gallery">
          <Gallery />
        </Section>

        {/* ── Contact ───────────────────────────────────────────────────────── */}
        <Section id="contact">
          <header className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
            <p className="text-muted-foreground mt-2">Have a project in mind? Let's chat.</p>
          </header>
          <form onSubmit={onSubmit} className="max-w-xl space-y-4 mx-auto">
            <div className="items-center">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@domain.com" required />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
              <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={5} required />
            </div>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </Button>
          </form>
        </Section>

        <footer className="border-t">
          <div className="container px-4 py-10 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Johnlord T. Mique. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}