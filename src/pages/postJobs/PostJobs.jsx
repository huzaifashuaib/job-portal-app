import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompany from "@/components/addCompanyDrawer/AddCompany";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import z from "zod";
const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  description: z.string().min(1, { message: "Description is Required" }),
  location: z.string().min(1, { message: "Select alocation" }),
  company_id: z.string().min(1, { message: "Select or Add a new Compnay" }),
  requirement: z.string().min(1, { message: "Requirements are Required" }),
});

const PostJobs = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const {
    fn: fnCompanies,
    data: companyData,
    // isError: companyError,
    isLoading: loadingCompanies,
  } = useFetch(getCompanies);

  const {
    fn: createJobFn,
    isError: createJobError,
    isLoading: loadingJobCreating,
    data: dataCreateJob,
  } = useFetch(addNewJob);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_id: "",
      location: "Filter by Location",
      requirement: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user?.unsafeMetadata?.role === "candidate") {
      navigate("/jobs-listing");
    }
  }, [user?.unsafeMetadata?.role, navigate]);
  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs-listing");
  }, [loadingJobCreating]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const onSubmit = (data) => {
    createJobFn({ ...data, recruiter_id: user.id });
  };

  if (!isLoaded || loadingCompanies)
    return <BarLoader width={"100%"} color="#36d7b7" />;
  return (
    <div>
      <h1 className="gredient-title text-5xl font-extrabold sm:text-7xl text-center p-8">
        Post Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex items-center gap-4">
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("PK").map((state, index) => (
                      <SelectItem key={index} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="company_id"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Filter by Company">
                    {field.value
                      ? companyData?.find(
                          (comp) => comp.id === Number(field.value)
                        )?.name
                      : ""}
                  </SelectValue>
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
            )}
          />
          <AddCompany fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        <Controller
          name="requirement"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirement && (
          <p className="text-red-500">{errors.requirement.message}</p>
        )}
        {loadingJobCreating && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button variant={"blue"} size={"lg"} type="submit" className={"mt-2"}>
          Submit
        </Button>
        {createJobError?.message && (
          <p className="text-red-500">{createJobError?.message}</p>
        )}
      </form>
    </div>
  );
};

export default PostJobs;
