import type { ReactNode } from "react";
import { Phone } from "lucide-react";

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

function FacebookIcon() {
  return (
    <SocialIcon>
      <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h2.4l.6-3H13V9c0-.6.4-1 1-1Z" />
    </SocialIcon>
  );
}

function TiktokIcon() {
  return (
    <SocialIcon>
      <path d="M15 4c.3 1.9 1.4 3.2 3 3.8V11c-1.3 0-2.6-.4-3.7-1.1v4.7c0 2.8-2.3 5.1-5.1 5.1S4 17.4 4 14.6s2.3-5.1 5.1-5.1c.4 0 .8 0 1.2.1V12c-.4-.2-.8-.3-1.2-.3-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1V4h2.8Z" />
    </SocialIcon>
  );
}

function YoutubeIcon() {
  return (
    <SocialIcon>
      <path d="M21.6 8.2s-.2-1.4-.8-2c-.8-.8-1.8-.8-2.2-.8C15.6 5 12 5 12 5s-3.6 0-6.6.4c-.4 0-1.4 0-2.2.8-.6.6-.8 2-.8 2S2 9.7 2 11.2v1.6c0 1.5.4 3 .4 3s.2 1.4.8 2c.8.8 1.8.8 2.2.8 3 .4 6.6.4 6.6.4s3.6 0 6.6-.4c.4 0 1.4 0 2.2-.8.6-.6.8-2 .8-2s.4-1.5.4-3v-1.6c0-1.5-.4-3-.4-3ZM10 15V9l5 3-5 3Z" />
    </SocialIcon>
  );
}

export function SiteInfoBar() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 555 123 4567";

  return (
    <div className="border-b border-[#203054] bg-[#14213d] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{phone}</span>
        </p>
        <div className="inline-flex items-center gap-2">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
            <TiktokIcon />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </div>
  );
}