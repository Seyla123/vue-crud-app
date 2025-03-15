import { defineStore } from "pinia";
import { db } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useAuthStore } from "@/stores/authStore";

let notesCollectionRef;
let getNotesSnapshot = null;

export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: [],
    note: {},
    isLoading: false,
    error: null,
    isError: false,
    isCreating: false,
    isUpadating: false,
  }),
  actions: {
    init() {
      const authStore = useAuthStore();
      console.log("this is auth store : ", authStore.user);
      notesCollectionRef = collection(db, "users", authStore.user.id, "notes");
      this.getNotes();
    },
    /**
     * get notes real time updating
     * IMPORTANT : we can't use ( finally catch ) to set isLoading in this real time updating
     */
    async getNotes() {
      this.isLoading = true;
      try {
        getNotesSnapshot = onSnapshot(notesCollectionRef, (querySnapshot) => {
          this.notes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.isLoading = false;
        });
      } catch (error) {
        this.isError = true;
        this.error = error;
        this.isLoading = false;
      }
    },
    /**
     * Fetches a single note by its ID.
     */
    async getOneNote(id) {
      this.isLoading = true;
      try {
        const docRef = doc(notesCollectionRef, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.note = {
            id: docSnap.id,
            ...docSnap.data(),
          };
          console.log("this note : ", this.note);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          this.isError = true;
          this.error = error;
        }
      } catch (error) {
        this.isError = true;
        this.error = error;
        console.log("error : ", error);
      } finally {
        this.isLoading = false;
      }
    },
    async addNote(newNote) {
      this.isCreating = true;
      try {
        await addDoc(notesCollectionRef, {
          title: newNote.title,
          content: newNote.content,
          tag: newNote.tag,
          date: serverTimestamp(),
        });
        console.log("note added");
      } catch (error) {
        console.log("error : ", error);
        this.isError = true;
        this.error = error;
      } finally {
        this.isCreating = false;
      }
    },
    async deleteNote(id) {
      try {
        await deleteDoc(doc(notesCollectionRef, id));
        console.log("this delete note success");
      } catch (error) {
        console.log("this note error : ", error);
      }
    },
    async updateNote(id, note) {
      this.isUpadating = true;
      try {
        await updateDoc(doc(notesCollectionRef, id), note);
      } catch (error) {
        console.log("updating error : ", error);
      } finally {
        this.isUpadating = false;
      }
    },
    setNote(noteData) {
      this.notes = noteData;
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot();
    },
  },
});
