import CreatedApplication from "@/components/createdApplication/CreatedApplication";
import CreatedJobs from "@/components/createdJobs/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }
  return (
    <div>
      <h1 className="gredient-title text-6xl sm:text-7xl font-extrabold text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplication />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
