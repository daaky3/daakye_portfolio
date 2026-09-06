import { BRAND } from "@/lib/utils";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  roles: ["Developer", "Digital Creator", "Problem Solver"],
  description:
    "I build modern digital experiences, websites, applications and technology solutions designed to turn ideas into reality.",
};

export const STATS = [
  { value: "04", label: "Projects" },
  { value: "∞", label: "Ideas" },
  { value: "24/7", label: "Building" },
  { value: "01", label: "Personal Brand" },
] as const;

export type Project = {
  id: string;
  number: string;
  name: string;
  url: string;
  description: string;
  image: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "aji",
    number: "01",
    name: "AJI Group Ghana Ltd",
    url: "https://ajigroupltd.com",
    description:
      "AJI GROUP GHANA LTD is a Ghanaian registered holding company powering two of Ghana’s most promising agricultural ventures in Ashanti and Bono East Regions.",
    image: "/images/projects/aji.jpg",
    tags: ["Corporate website", "UI/UX", "Responsive design"],
  },
  {
    id: "sengshstp",
    number: "02",
    name: "SENGSHSTP",
    url: "https://sengshstp.online",
    description:
      "Official results management portal for Serwaa Nyarko Girls' Senior High School, Kumasi.",
    image: "/images/projects/sengshstp.jpg",
    tags: ["School platform", "Information architecture", "Responsive design"],
  },
  {
    id: "admission",
    number: "03",
    name: "SENGSHSTP Admission Portal",
    url: "https://admission.sengshstp.online",
    description:
      "An online admission platform designed to simplify and organize the student application process for Serwaa Nyarko Girls' Senior High School, Kumasi.",
    image: "/images/projects/admission.jpg",
    tags: ["Web application", "Admissions", "Responsive design"],
  },
  {
    id: "manzoley",
    number: "04",
    name: "Manzoley",
    url: "https://manzoley.app",
    description:
      "A modern digital application focused on delivering a clean and streamlined user experience.",
    image: "/images/projects/manzoley.jpg",
    tags: ["Digital product", "UI/UX", "Product design"],
  },
];

export const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "Git",
  "GitHub",
  "Cloudflare",
  "Vercel",
  "APIs",
  "UI/UX",
  "Responsive Design",
] as const;

export const MARQUEE = [
  "React",
  "JavaScript",
  "Tailwind",
  "Supabase",
  "Node.js",
  "GitHub",
  "Cloudflare",
  "Vite",
  "HTML",
  "CSS",
  "APIs",
  "UI/UX",
] as const;

export const PROCESS = [
  {
    number: "01",
    title: "Discover",
    body: "Understand the problem and define the goal.",
  },
  {
    number: "02",
    title: "Design",
    body: "Create a clean and intuitive experience.",
  },
  {
    number: "03",
    title: "Build",
    body: "Turn the concept into a functional product.",
  },
  {
    number: "04",
    title: "Refine",
    body: "Test, optimize and improve.",
  },
] as const;

export const EMAIL = "info@daakye.online";

export const WHATSAPP = [
  { label: "0209555624", href: "https://wa.me/233209555624" },
  { label: "0595991236", href: "https://wa.me/233595991236" },
] as const;

export const SOCIAL = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@daakye_04",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/daakye_04",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/daaky3_hene",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    href: "https://pin.it/5arSjkIWG",
  },
] as const;

export const ABOUT = {
  heading: "Building with purpose.",
  body: "I enjoy transforming ideas into clean, functional and meaningful digital experiences.",
  sequence: ["Ideas", "Design", "Code", "Experience"] as const,
};

export const SITE = {
  brand: BRAND,
  title: BRAND,
  description: `${BRAND} — Developer and digital creator building modern websites, applications and digital experiences.`,
  footerLine: "Building digital experiences with purpose.",
};
