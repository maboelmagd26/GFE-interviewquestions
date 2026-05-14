export type JobPostingDetails = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
};
async function getJobIds(start: number, end: number) {
  const jobPostingIdsRes = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json",
  );
  console.log(jobPostingIdsRes);
  if (!jobPostingIdsRes.ok) {
    throw new Error("Error fetching Job Posting Ids");
  }
  const jobPostingIdsList: string[] = await jobPostingIdsRes.json();
  return jobPostingIdsList.slice(start, end);
}

export async function getJobPostingDetails(start: number, end: number) {
  const jobIds = await getJobIds(start, end);
  const requests = jobIds.map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
  );
  const jobDetailsListResponses = await Promise.all(requests);
  const jobDetailsData: JobPostingDetails[] = await Promise.all(
    jobDetailsListResponses.map((jobResponse) => jobResponse.json()),
  );
  return jobDetailsData;
}
