import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { baseApi } from "@/services/baseApi";

// Fetch notes
const getNotes = async (params) => {
  const { data } = await baseApi.get("/notes", { params });
  return data.reverse();
};
// Query to get notes
export const useGetNote = (params = {}) =>
  useQuery({
    queryKey: ["notes", params],
    queryFn: () => getNotes(params),
    staleTime: 60000,
  });

// get note by id
const getNote = async (id) => {
  const { data } = await baseApi.get("/notes/" + id);
  return data;
};
// Query to get note by id
export const useGetNoteById = (id) => {
  return useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
    staleTime: 60000,
  });
};

// Update note
const updateNote = async ({ id, body }) => {
  const { data } = await baseApi.put(`/notes/${id}`, body);
  return data;
};
// Mutation to update notes
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params) => updateNote(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
    onError: (error) => {
      console.error("Error updating note:", error);
    },
  });
};

//create note
const createNote = async (formData) => {
  const { data } = await baseApi.post("/notes", formData);
  return data;
};
// Mutation to create note
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });
};
// delete note
const deleteNote = async (id) => {
  const { data } = await baseApi.delete("/notes/" + id);
  return data;
};
//Mutation to delete note
export const useDeleteNote = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteNote(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["note", data.id]);
      console.log("note deleted :", data);
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });
};
