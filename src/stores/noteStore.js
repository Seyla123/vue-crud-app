import { defineStore } from "pinia";

export const useNoteStore = defineStore("note", {
  state: () => ({
    note: null,
  }),
  actions: {
    setNote(noteData) {
      this.note = noteData;
    },
  },
});
