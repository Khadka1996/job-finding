import { NextResponse } from "next/server";
import { getAllJobs } from "@/lib/api";

export async function GET() {
  try {
    const jobs = await getAllJobs();
    
    // Sort by most recently posted first
    // Treat invalid/1970 dates as today's date for proper sorting
    const sorted = jobs.sort((a, b) => {
      let dateA = new Date(a.postedAt).getTime();
      let dateB = new Date(b.postedAt).getTime();
      
      // If date is invalid or is epoch (1970), treat as today
      const today = new Date().getTime();
      if (isNaN(dateA) || new Date(dateA).getFullYear() === 1970) {
        dateA = today;
      }
      if (isNaN(dateB) || new Date(dateB).getFullYear() === 1970) {
        dateB = today;
      }
      
      return dateB - dateA; // Descending order (newest first)
    });
    
    return NextResponse.json({ 
      jobs: sorted.map(job => ({
        id: job.id,
        slug: job.slug,
        title: job.title,
        companyName: job.company,
        companyLogo: job.companyLogo,
        location: job.location,
        categories: job.categories,
        jobType: job.jobTypes?.[0] || "full-time",
        publishDate: job.postedAt,
        description: job.description,
        shortDescription: job.shortDescription,
        salary: job.salary,
        countryCode: job.countryCode,
        countryFlag: job.countryFlag,
        remote: job.remote,
        visaSponsorship: job.visaSponsorship,
        source: job.source,
        applyUrl: job.applyUrl,
      }))
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
