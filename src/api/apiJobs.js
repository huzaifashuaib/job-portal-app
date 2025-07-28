import supabaseClient from "@/utilities/supabase";

export const getJobs = async (token, { location, company_id, queryString }) => {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_jobs(id)");
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (queryString) {
    query = query.ilike("title", `%${queryString}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error Fetching Jobs", error);
    return null;
  }
  return data;
};

export const savedJob = async (token, { alreadySave }, savedData) => {
  const supabase = await supabaseClient(token);
  if (alreadySave) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", savedData.job_id);

    if (deleteError) {
      console.error("Error Delete Saved Job :", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([savedData])
      .select();
    if (insertError) {
      console.error("Error Insert Saved Job :", insertError);
      return null;
    }
    return data;
  }
};

export const getSingleJob = async (token, { job_id }) => {
  const supabase = await supabaseClient(token);
  let { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),application:applications(*)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Fetch Error of Single Job :", error);
    return null;
  }
  return data;
};

export const updatingHiringStatus = async (token, { job_id }, isopen) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isopen })
    .eq("id", job_id)
    .select();
  if (error) {
    console.error("Updating Job Error :", error);
    return null;
  }
  return data;
};

export const addNewJob = async (token, _, jobData) => {
  const supabase = await supabaseClient(token);
  const { error, data } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();
  if (error) {
    console.error("insert Job Error :", error);
    return null;
  }
  return data;
};

export const getAllSavedJobs = async (token) => {
  const supabase = await supabaseClient(token);
  const { data: savedJobData, error: savedJobError } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name, logo_url))");
  if (savedJobError) {
    console.error("saved Jobs fetching error", savedJobError);
    return null;
  }
  return savedJobData;
};
export const getAllJobsOfRecuriter = async (token, { recruiter_id }) => {
  const supabase = await supabaseClient(token);
  const { data, error: jobError } = await supabase
    .from("jobs")
    .select("*,  company:companies(name, logo_url))")
    .eq("recruiter_id", recruiter_id);
  if (jobError) {
    console.error(" Jobs fetching error", jobError);
    return null;
  }
  return data;
};

export const deleteJob = async (token, { job_id }) => {
  const supabase = await supabaseClient(token);
  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();
  if (deleteError) {
    console.error(" Jobs Delete error", deleteError);
    return null;
  }
  return data;
};
