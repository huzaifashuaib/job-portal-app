import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "candidate"
          ? "/jobs-listing"
          : "/post-jobs"
      );
    }
  }, [user?.unsafeMetadata?.role]);

  const handleRoleSection = async (role) => {
    await user
      .update({
        unsafeMetadata: {
          role: role,
        },
      })
      .then(() => {
        navigate(role === "candidate" ? "/jobs-listing" : "/post-jobs");
        return null;
      })
      .catch((err) => {
        console.error("Error Updating role:", err);
      });
  };
  if (!isLoaded) {
    return <BarLoader width={"100%"} color={"#36d7b7"} className="mb-4" />;
  }
  return (
    <>
      {user?.unsafeMetadata?.role === undefined ? (
        <div className="flex items-center justify-center flex-col mt-32">
          <h1 className="gredient-title text-7xl sm:text-8xl font-extrabold tracking-tighter">
            I am ...
          </h1>
          <div className="grid grid-cols-2 gap-4 mt-16 w-full px-6 md:px-40">
            <Button
              variant={"blue"}
              className={"md:h-32 h-16 text-xl md:text-2xl"}
              onClick={() => handleRoleSection("candidate")}
            >
              Candidate
            </Button>
            <Button
              variant={"destructive"}
              className={"text-xl md:text-2xl h-16 md:h-32"}
              onClick={() => handleRoleSection("recruiter")}
            >
              Recruiter
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OnBoarding;
