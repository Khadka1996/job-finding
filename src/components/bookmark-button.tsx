"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Job } from "@/types/job";

type BookmarkButtonProps = {
  job: Job;
  compact?: boolean;
};

const STORAGE_KEY = "visa-sponsor-jobs-bookmarks";

function readBookmarks(): Job[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Job[];
  } catch {
    return [];
  }
}

function writeBookmarks(bookmarks: Job[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function BookmarkButton({ job, compact = false }: BookmarkButtonProps) {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  useEffect(() => {
    const syncBookmarks = () => {
      setBookmarks(readBookmarks());
    };

    syncBookmarks();
    window.addEventListener("storage", syncBookmarks);

    return () => {
      window.removeEventListener("storage", syncBookmarks);
    };
  }, []);

  const bookmarked = bookmarks.some((item) => item.slug === job.slug);
  const label = bookmarked ? "Saved" : "Save";

  function toggleBookmark() {
    const existing = readBookmarks();
    const next = bookmarked
      ? existing.filter((item) => item.slug !== job.slug)
      : [...existing.filter((item) => item.slug !== job.slug), job];

    writeBookmarks(next);
    setBookmarks(next);
  }

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${bookmarked ? "border-sky-200 bg-sky-50 text-sky-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
    >
      {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {compact ? null : label}
    </button>
  );
}