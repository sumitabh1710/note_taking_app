import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "./NoteType";
import { RootState } from "../../store/store";

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
      }
    },
    setNoteBackgroundColor: (
      state,
      action: PayloadAction<{ id: string; backgroundColor: string }>
    ) => {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.backgroundColor = action.payload.backgroundColor;
      }
    },
  },
});

export const { addNote, deleteNote, pinNote, setNoteBackgroundColor } =
  notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;
