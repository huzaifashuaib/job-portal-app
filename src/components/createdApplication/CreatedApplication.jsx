import { getAllApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "../applicationCard/ApplicationCard";

const CreatedApplication = () => {
  const { isLoaded, user } = useUser();
  const {
    fn: getAllApplicationFn,
    isLoading: applicationLoading,
    data: allApplicationsData,
  } = useFetch(getAllApplications, { user_id: user?.id });
  useEffect(() => {
    getAllApplicationFn();
  }, []);

  console.log(allApplicationsData);

  if (!isLoaded || applicationLoading) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {allApplicationsData.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          candidate={true}
        />
      ))}
    </div>
  );
};

export default CreatedApplication;
