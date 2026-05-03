'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Job } from '@/types/job';
import { JobCard } from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';

export function SavedJobsClient() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read bookmarks from localStorage
    const bookmarksData = localStorage.getItem('visa-sponsor-jobs-bookmarks');
    if (bookmarksData) {
      try {
        const bookmarks = JSON.parse(bookmarksData) as Job[];
        setBookmarkedJobs(bookmarks);
      } catch (error) {
        console.error('Error parsing bookmarks:', error);
        setBookmarkedJobs([]);
      }
    }
    setLoading(false);
  }, []);

  // Listen for storage changes (bookmarks updated in other tabs or components)
  useEffect(() => {
    const handleStorageChange = () => {
      const bookmarksData = localStorage.getItem('visa-sponsor-jobs-bookmarks');
      if (bookmarksData) {
        try {
          const bookmarks = JSON.parse(bookmarksData) as Job[];
          setBookmarkedJobs(bookmarks);
        } catch (error) {
          console.error('Error parsing bookmarks:', error);
          setBookmarkedJobs([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-slate-500">Loading saved jobs...</div>
      </div>
    );
  }

  if (bookmarkedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <div className="rounded-full bg-slate-100 p-4">
          <Bookmark className="h-8 w-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-[#14213d]">No Saved Jobs Yet</h2>
        <p className="text-slate-600 max-w-md text-center">
          Start bookmarking jobs to save them for later. Click the bookmark icon on any job to add it to your saved list.
        </p>
        <Button asChild className="mt-4 bg-[#b10f2e] hover:bg-[#930d24] px-8 h-10 text-base font-semibold">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#14213d] mb-2">Saved Jobs</h1>
        <p className="text-slate-600">{bookmarkedJobs.length} job{bookmarkedJobs.length !== 1 ? 's' : ''} saved</p>
      </div>
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1">
        {bookmarkedJobs.map((job) => (
          <div key={job.slug} className="w-full">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
