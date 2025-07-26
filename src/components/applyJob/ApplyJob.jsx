import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import z, { number } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";

const schema = z.object({
  experience: z.coerce
    .number()
    .min(1, { message: "Experience must be at least 0" })
    .int(),
  skill: z.string().min(1, { message: "skill required" }),
  education: z.enum(["intermediate", "graduate", "post-graduate"], {
    message: "Education required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      {
        message: "Only pdf and word document are allowed",
      }
    ),
});

const ApplyJob = ({ job, user, fetchJob, applied = false }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      education: "intermediate",
    },
    resolver: zodResolver(schema),
  });

  const {
    isLoading: loadingApply,
    isError: errorsApply,
    fn: fnApply,
  } = useFetch(applyToJob);
  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size={"lg"}
          variant={job?.isopen && !applied ? "blue" : "destructive"}
          disabled={!job?.isopen || applied}
        >
          {job?.isopen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={"!text-start"}>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill the form below.</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-4 pb-0 gap-4"
        >
          <Input
            placeholder="Year of Experience"
            type={"text"}
            className={"flex-1"}
            {...register("experience")}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}
          <Input
            placeholder="Skills (Comma Separated)"
            type={"text"}
            className={"flex-1"}
            {...register("skill")}
          />
          {errors.skill && (
            <p className="text-red-500">{errors.skill.message}</p>
          )}
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="postGraduate" id="postGraduate" />
                  <Label htmlFor="postGraduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}
          <Input
            type={"file"}
            accept={".doc,.pdf,.docx"}
            className={"flex-1 file:text-gray-500"}
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorsApply?.message && (
            <p className="text-red-500">{errorsApply?.message}</p>
          )}

          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}
          <Button variant={"blue"} size={"lg"} type="submit">
            {isSubmitting ? "Applying" : "Apply"}
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJob;
