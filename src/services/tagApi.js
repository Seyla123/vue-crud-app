import { useQuery } from "@tanstack/vue-query";
import { baseApi } from "@/services/baseApi";

const getTags = async (params) => {
  const { data } = await baseApi.get("/tags", { params });
  return data;
};

// Query to get tags
export const useGetTag = (params = {}) =>
  useQuery({
    queryKey: ["tags", params],
    queryFn: () => getTags(params),
    staleTime: 60000,
  });
