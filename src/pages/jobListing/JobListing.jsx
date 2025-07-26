import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/jobCard/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
const JobListing = () => {
  const { isLoaded } = useUser();
  const [location, setLocation] = useState();
  const [company_id, setCompanyId] = useState();
  const [queryString, setQueryString] = useState();
  const {
    fn: getJobsFn,
    data: jobs,
    isLoading: jobLoading,
  } = useFetch(getJobs, {
    location,
    company_id,
    queryString,
  });

  const {
    fn: companyFn,
    isLoaded: isLoadingCompany,
    data: companyData,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      companyFn();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      getJobsFn();
    }
  }, [isLoaded, location, company_id, queryString]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const queryString = formData.get("search-query");
    if (queryString) setQueryString(queryString);
  };

  if (!isLoaded) {
    return <BarLoader width={"100%"} color={"#36d7b7"} className="mb-4" />;
  }

  const handleClearFilter = () => {
    setCompanyId("");
    setLocation("");
    setQueryString("");
  };
  console.log(companyData);
  return (
    <div>
      <h1 className="gredient-title text-6xl font-extrabold tracking-tighter sm:text-7xl pb-8 text-center">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 h-14 mb-4"
      >
        <Input
          type={"text"}
          placeholder={"Search Jobs by Title..."}
          name="search-query"
          className={"h-full px-4 text-md flex-1"}
        />
        <Button variant={"blue"} className={"sm:w-28 h-full"} type="submit">
          Search
        </Button>
      </form>

      <div className="flex sm:items-center flex-col sm:flex-row gap-2 ">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className={"w-full"}>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("PK").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompanyId(value)}
        >
          <SelectTrigger className={"w-full"}>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companyData?.map(({ name, id }) => (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={handleClearFilter}
          variant={"destructive"}
          className={"sm:w-1/4"}
        >
          Clear Filter
        </Button>
      </div>

      {jobLoading && (
        <BarLoader width={"100%"} color={"#36d7b7"} className="mt-4" />
      )}

      {!jobLoading && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length > 0 ? (
            jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <h1>no Data found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
