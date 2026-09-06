import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconTikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M14.5 4v10.2a3.7 3.7 0 1 1-3.2-3.67V8.3A7.2 7.2 0 0 0 8 14.2 7.2 7.2 0 0 0 15.3 21 7.2 7.2 0 0 0 22 14.2V9.35A8.1 8.1 0 0 0 17.7 8.1 8.1 8.1 0 0 1 14.5 4Z" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M5 5h3.2l4.05 5.55L16.9 5H19l-5.7 7.2L19.4 19h-3.2l-4.3-5.9L7.15 19H5l6-7.55L5 5Z" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.8" cy="7.2" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPinterest(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M10.4 19.2 12 12.6s-.7.1-1.3-.7c-.7-.9-.3-2.2.6-2.8 1.4-.9 3.2.1 3.2 2.1 0 1.8-1 3.1-2.3 3.1-.7 0-1.1-.5-.9-1.2l.6-2.4" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M6.4 18.2 5.6 20.8a.5.5 0 0 0 .65.6l2.7-.9A8.5 8.5 0 1 0 6.4 18.2Z" />
      <path d="M9.2 9.6c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.2.6l-.5.4c-.2.2-.2.4 0 .7.4.6 1.1 1.3 1.8 1.7.3.2.5.2.7 0l.5-.5c.2-.2.5-.2.7-.1l1.6.8c.3.1.4.3.4.6v.5c0 .3-.1.5-.5.7-.4.2-1 .4-2 .2-1.3-.3-3.3-1.4-4.8-3.2-1.3-1.6-1.8-3.2-1.9-4.2 0-1 .2-1.6.5-2Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="4" y="6.5" width="16" height="11" rx="2" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  tiktok: IconTikTok,
  x: IconX,
  instagram: IconInstagram,
  pinterest: IconPinterest,
  whatsapp: IconWhatsApp,
  email: IconMail,
};
