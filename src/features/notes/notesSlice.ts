import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  backgroundColor: string;
  pinned: boolean;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
      }
    },
  },
});

export const { addNote, deleteNote, pinNote } = notesSlice.actions;

export default notesSlice.reducer;
