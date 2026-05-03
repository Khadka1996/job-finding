import { NextResponse } from "next/server";
import { getAllJobs } from "@/lib/api";

export async function GET() {
  try {
    const jobs = await getAllJobs();
    
    // Shuffle for variety in listings
    const shuffled = jobs.sort(() => Math.random() - 0.5);
    
    return NextResponse.json({ 
      jobs: shuffled.map(job => ({
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
