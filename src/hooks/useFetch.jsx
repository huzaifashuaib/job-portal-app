import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, option = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { session } = useSession();

  const fn = async (...args) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseAccessToken, option, ...args);
      setData(response);
      setIsError(null);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fn, data, isLoading, isError };
};

export default useFetch;
