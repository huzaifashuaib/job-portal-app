import { getSingleJob, updatingHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/applicationCard/ApplicationCard";
import ApplyJob from "@/components/applyJob/ApplyJob";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  BriefcaseBusiness,
  DoorClosed,
  DoorOpen,
  MapPinIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();
  const {
    fn: fnJob,
    // isLoading: jobLoading,
    data: job,
  } = useFetch(getSingleJob, { job_id: id });

  const {
    fn: fnUpdateStates,
    isLoading: statusLoading,
    data: updateDate,
  } = useFetch(updatingHiringStatus, { job_id: id });

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);

  const handleSelectChange = (value) => {
    console.log(value);
    const isopen = value === "open";
    fnUpdateStates(isopen).then(() => fnJob());
  };
  if (!isLoaded) {
    return <BarLoader width={"100%"} color={"#36d7b7"} className="mb-4" />;
  }
  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex items-center justify-between flex-col-reverse gap-6 md:flex-row">
        <h1 className="gredient-title font-extrabold text-4xl sm:text-6xl pb-3 tracking-tighter">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-12"
          alt={job?.company?.name}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseBusiness />
          {job?.application?.length} Applicants
        </div>
        <div className="flex items-center gap-2">
          {job?.isopen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
          {}
        </div>
      </div>
      {/* Hirring Status */}
      {statusLoading && <BarLoader width={"100%"} color={"#36d7b7"} />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger
            className={`w-full ${
              job?.isopen ? "!bg-green-950" : "!bg-red-950"
            } `}
          >
            <span className="pl-2 text-white">
              Hiring Status {job?.isopen ? "(Open)" : "(Closed)"}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h3 className="text-2xl sm:text-3xl font-bold ">About Job</h3>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirement}
        className="sm:text-lg !bg-transparent"
      />
      {/* render Applications */}

      {job?.recruiter_id !== user.id && (
        <ApplyJob
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.application?.find(
            (application) => application.candidate_id === user.id
          )}
        />
      )}
      {job?.application?.length > 0 && job.recruiter_id === user.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold ">Applications</h2>
          {job?.application.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Job;
