import { getAllJobsOfRecuriter } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "../jobCard/JobCard";
import { useUser } from "@clerk/clerk-react";

const CreatedJobs = () => {
  const { isLoaded, user } = useUser();

  const {
    fn: getAllJob,
    isLoading,
    getJobLoading,
    data: allJobs,
  } = useFetch(getAllJobsOfRecuriter, { recruiter_id: user?.id });

  useEffect(() => {
    getAllJob();
  }, []);
  if (!isLoaded || getJobLoading) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }
  return (
    <div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJobs?.length > 0 ? (
          allJobs?.map((job) => (
            <JobCard key={job.id} job={job} isMyJob onSaveJob={getAllJob} />
          ))
        ) : (
          <h1>no Data found</h1>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
