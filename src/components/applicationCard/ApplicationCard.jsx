import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { upateApplicationStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ApplicationCard = ({ application, candidate = false }) => {
  console.log(application);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const {
    isError: statusError,
    isLoading: loadingStatus,
    fn: fnUpdateStatus,
  } = useFetch(upateApplicationStatus, { job_id: application.job_id });

  const handleStatusChange = (status) => {
    fnUpdateStatus(status);
  };
  return (
    <Card>
      {loadingStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className={"flex items-center justify-between font-bold"}>
          {candidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="size-8 bg-white text-black p-1.5 cursor-pointer rounded-full"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={15} />
            {application?.experience} Year of Experience
          </div>
          <div className="flex items-center gap-2">
            <School size={15} />
            {application?.education}
          </div>
          <div className="flex items-center gap-2">
            <Boxes size={15} />
            {application?.skill}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {candidate ? (
          <span className="font-bold capitalize">
            Status: {application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application?.status}
          >
            <SelectTrigger className={"w-52"}>
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="interviewing">interviewing</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
