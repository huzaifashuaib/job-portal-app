import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { savedJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onSaveJob = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();
  const {
    fn: savedJobFn,
    data: savedData,
    isLoading: loadingSavedJob,
  } = useFetch(savedJob, { alreadySave: saved });

  const handleSavedJob = async () => {
    await savedJobFn({
      user_id: user.id,
      job_id: job.id,
    });
    onSaveJob();
  };

  useEffect(() => {
    if (savedData !== undefined) {
      setSaved(savedData?.length > 0);
    }
  }, [savedData]);
  return (
    <Card className={"mb-5 flex flex-col"}>
      <CardHeader>
        <CardTitle className={"flex justify-between items-center font-bold"}>
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={18}
              fill="red"
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex items-center justify-between gap-3">
          {job.company && (
            <img
              src={job.company.logo_url}
              className="h-6"
              alt={job.company.name}
            />
          )}
          <div className="flex items-center gap-2">
            <MapPinIcon size={15} /> <span>{job.location}</span>
          </div>
        </div>
        <hr />
        <p>{job.description.slice(0, job.description.indexOf("."))}.</p>
      </CardContent>
      <CardFooter className={"flex gap-2 items-center"}>
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant={"secondary"} className={"w-full"}>
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            disabled={loadingSavedJob}
            onClick={handleSavedJob}
          >
            {saved ? <Heart size={20} fill="red" /> : <Heart size={20} />}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
