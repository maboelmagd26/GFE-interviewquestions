import { useEffect, useState } from "react";
import "./App.css";
import { getJobPostingDetails, type JobPostingDetails } from "./api";
function App() {
  const [jobDetails, setJobDetails] = useState<JobPostingDetails[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobPostingDetails = await getJobPostingDetails(0, limit);
        setJobDetails(jobPostingDetails);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit]);
  if (isLoading) {
    return <div>Loading ... </div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {jobDetails?.map(({ id, title, url, by, time }) => {
        function secondsToDateTime(seconds: number) {
          const date = new Date(seconds * 1000);

          return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            iso: date.toISOString(),
          };
        }
        return (
          <div key={id}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                borderBottom: "1px solid black",
                paddingBlock: "1rem",
              }}
            >
              <h2>
                <a
                  href={url}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {title}
                </a>
              </h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <span>
                  by {by} . {secondsToDateTime(time).date} -{" "}
                  {secondsToDateTime(time).time}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <button
        style={{ padding: "10px", backgroundColor: "orange" }}
        onClick={() => setLimit((prev) => prev + prev)}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
