import { Metadata } from 'next';
import { SavedJobsClient } from '@/components/saved-jobs-client';

export const metadata: Metadata = {
  title: 'Saved Jobs | Visa Sponsor Jobs',
  description: 'View your saved visa sponsorship job opportunities.',
};

export default function SavedJobsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <SavedJobsClient />
      </div>
    </main>
  );
}
