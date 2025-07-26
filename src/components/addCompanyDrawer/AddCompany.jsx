import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import useFetch from "@/hooks/useFetch";
import { addNewCompanies } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, { message: "Company Name is Required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      { message: "Only Images are allowed" }
    ),
});

const AddCompany = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    fn: fnAddCompany,
    isLoading: addCompnayLoading,
    isError: addCompanyError,
    data: addCompanyData,
  } = useFetch(addNewCompanies);
  const onSubmit = (data) => {
    console.log(data);
    fnAddCompany({ ...data, logo: data.logo[0] });
  };

  useEffect(() => {
    if (addCompanyData?.length > 0) fetchCompanies();
  }, [addCompnayLoading]);
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button type="button" variant="outline" size="sm">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent className="pb-10">
          <DrawerHeader>
            <DrawerTitle>Add New Company</DrawerTitle>
          </DrawerHeader>

          <form className="flex gap-2 p-4 pb-4">
            <Input {...register("name")} placeholder={"Company Name"} />
            <Input
              type={"file"}
              accept="image/*"
              {...register("logo")}
              className={"file:text-gray-500"}
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              type="button"
              variant="destructive"
              className={"w-40"}
            >
              Submit
            </Button>
          </form>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
          {addCompanyError?.message && (
            <p className="text-red-500">{addCompanyError?.message}</p>
          )}
          {addCompnayLoading && <BarLoader width={"100%"} color="#36d7b7" />}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddCompany;
