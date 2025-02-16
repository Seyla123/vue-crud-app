import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { baseApi } from "@/services/baseApi";

// Fetch notes
const getNotes = async (params) => {
  const { data } = await baseApi.get("/notes", { params });
  return data;
};

// Update note
const updateNote = async (formData) => {
  const { data } = await baseApi.put("/notes", formData);
  return data;
};

// Query to get notes
export const useGetNote = (params = {}) =>
  useQuery({
    queryKey: ["notes", params],
    queryFn: () => getNotes(params),
    staleTime: 60000,
  });

// Mutation to update notes
export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]); // Invalidates the notes query after a successful mutation
    },
  });
};
