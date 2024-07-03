import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, pinNote } from '../features/notes/notesSlice';

interface NoteProps {
  id: string;
  title?: string;
  content: string;
  imageUrl?: string;
  backgroundColor?: string;
  pinned: boolean;
}

const Note: React.FC<NoteProps> = ({ id, title, content, imageUrl, backgroundColor, pinned }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`note ${pinned ? 'pinned' : ''}`}
      style={{ backgroundColor }}
    >
      {imageUrl && <img src={imageUrl} width="100%" height="40%" alt="Note" style={{ maxHeight: '200px', objectFit: 'cover' }} />}
      {title && <h3>{title}</h3>}
      
      <div
        className="content-container"
        style={{ maxHeight: '100px', overflowY: 'auto', whiteSpace: 'pre-wrap', fontSize:"14px" }}
      >
        {content}
      </div>
      
      <button
        className="pin-button"
        onClick={() => dispatch(pinNote(id))}
      >
        {pinned ? 'Unpin' : 'Pin'}
      </button>
      <button
        className="delete-button"
        onClick={() => dispatch(deleteNote(id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Note;
