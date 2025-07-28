import supabaseClient, { supabaseUrl } from "@/utilities/supabase";

export const applyToJob = async (token, _, jobData) => {
  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 9000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;
  const { error: storageError } = await supabase.storage
    .from("resume")
    .upload(fileName, jobData.resume);
  if (storageError) {
    console.error("Storage Error :", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`;

  const { data, error: applyError } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ]);
  if (applyError) {
    console.error("Insert Application Error", applyError);
    return null;
  }
  return data;
};

export const upateApplicationStatus = async (token, { job_id }, status) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();
  if (error || data.length === 0) {
    console.error("Upate Application Status Error", error);
    return null;
  }
  return data;
};

export const getAllApplications = async (token, { user_id }) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title , company:companies(name))")
    .eq("candidate_id", user_id);
  if (error || data.length === 0) {
    console.error("fetch All Applications Error", error);
    return null;
  }
  return data;
};
