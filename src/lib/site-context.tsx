import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Project } from "@/lib/data";

type Theme = "light" | "dark";

type SiteContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  introDone: boolean;
  completeIntro: () => void;
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const THEME_KEY = "daakye-theme";
const INTRO_KEY = "daakye-intro";

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function shouldSkipIntro() {
  try {
    if (sessionStorage.getItem(INTRO_KEY) === "1") return true;
  } catch {
    return true;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [introDone, setIntroDone] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const initial = readTheme();
    setThemeState(initial);
    applyTheme(initial);
    if (shouldSkipIntro()) {
      setIntroDone(true);
      document.documentElement.classList.add("intro-done");
      document.documentElement.classList.remove("intro-pending");
    } else {
      setIntroDone(false);
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const completeIntro = useCallback(() => {
    setIntroDone(true);
    document.documentElement.classList.add("intro-done");
    document.documentElement.classList.remove("intro-pending");
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      introDone,
      completeIntro,
      activeProject,
      openProject,
      closeProject,
    }),
    [
      theme,
      setTheme,
      toggleTheme,
      introDone,
      completeIntro,
      activeProject,
      openProject,
      closeProject,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
