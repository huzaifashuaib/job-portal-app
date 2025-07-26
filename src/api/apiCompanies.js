import supabaseClient, { supabaseUrl } from "@/utilities/supabase";

export const getCompanies = async (token) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.error("Fetch Companies Error :", error);
  }
  return data;
};

export const addNewCompanies = async (token, _, comapanyData) => {
  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 9000);
  const logoName = `logo-${random}-${comapanyData.name}`;
  const { error: storageError } = await supabase.storage
    .from("logos")
    .upload(logoName, comapanyData.logo);
  if (storageError) {
    console.error("Error Upload Company Logo", storageError);
    return null;
  }
  const logo_url = `${supabaseUrl}/storage/v1/object/public/logos/${logoName}`;
  const { data: uploadedData, error: uploadError } = await supabase
    .from("companies")
    .insert([
      {
        name: comapanyData.name,
        logo_url,
      },
    ])
    .select("*");
  if (uploadError) {
    console.error("Upload Company Data Error", uploadError);
    return null;
  }
  return uploadedData;
};
