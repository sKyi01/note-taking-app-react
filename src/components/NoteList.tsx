import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { deleteNote, pinNote, Note } from '../features/notes/notesSlice';

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes); // Accessing notes array from the state
  const dispatch = useDispatch();

  const [expandedNotes, setExpandedNotes] = useState<{ [key: string]: boolean }>({});

  const toggleNoteExpansion = (id: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderNotes = (notes: Note[]) => {
    const sortedNotes = [...notes].sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
    return sortedNotes.map((note: Note) => (
      <div
        key={note.id}
        className={`note ${note.pinned ? 'pinned' : ''}`}
        style={{ backgroundColor: note.backgroundColor }}
      >
        {note.title && <h3>{note.title}</h3>}
        {note.imageUrl && <img src={note.imageUrl} alt="Note" style={{ maxHeight: '100px', objectFit: 'cover' }} />}
        <p>
          {expandedNotes[note.id] ? note.content : `${note.content.substring(0, 100)}...`}
          {note.content.length > 100 && (
            <span
              onClick={() => toggleNoteExpansion(note.id)}
              style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
            >
              {expandedNotes[note.id] ? 'See Less' : 'See More'}
            </span>
          )}
        </p>
        <button
          className="pin-button"
          onClick={() => dispatch(pinNote(note.id))}
        >
          {note.pinned ? 'Unpin' : 'Pin'}
        </button>
        <button
          className="delete-button"
          onClick={() => dispatch(deleteNote(note.id))}
        >
          Delete
        </button>
      </div>
    ));
  };

  return <div className="note-list">{renderNotes(notes)}</div>;
};

export default NoteList;
