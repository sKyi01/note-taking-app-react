import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { deleteNote, pinNote, Note as NoteType } from '../features/notes/notesSlice';
import Note from './Note';

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes); 
  const dispatch = useDispatch();

  const [expandedNotes, setExpandedNotes] = useState<{ [key: string]: boolean }>({});

  const toggleNoteExpansion = (id: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderNotes = (notes: NoteType[]) => {
    const sortedNotes = [...notes].sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
    return sortedNotes.map((note: NoteType) => (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        imageUrl={note.imageUrl}
        backgroundColor={note.backgroundColor}
        pinned={note.pinned}
      />
    ));
  };

  return <div className="note-list">{renderNotes(notes)}</div>;
};

export default NoteList;
