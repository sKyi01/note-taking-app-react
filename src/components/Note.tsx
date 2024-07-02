import React from 'react';
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
      {title && <h3>{title}</h3>}
      <p>{content}</p>
      {imageUrl && <img src={imageUrl} alt="Note" style={{ maxHeight: '100px', objectFit: 'cover' }} />}
      
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
