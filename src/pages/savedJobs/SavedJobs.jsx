import { getAllSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/jobCard/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { user, isLoaded } = useUser();
  const {
    fn: savedJobFn,
    data: savedJobData,
    isLoading: savedJobLoading,
  } = useFetch(getAllSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      savedJobFn();
    }
  }, [isLoaded]);

  if (!isLoaded || savedJobLoading) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }

  return (
    <div>
      <h1 className="gredient-title text-6xl sm:text-7xl font-extrabold text-center pb-8">
        Saved Jobs
      </h1>

      {savedJobLoading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobData?.length > 0 ? (
            savedJobData?.map((savedJob) => (
              <JobCard
                key={savedJob.id}
                job={savedJob.job}
                savedInit={true}
                onSaveJob={savedJobFn}
              />
            ))
          ) : (
            <div>No Job Founds</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
