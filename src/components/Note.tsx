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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`note ${pinned ? 'pinned' : ''}`}
      style={{ backgroundColor }}
    >
      {imageUrl && <img src={imageUrl} width="100%" height="50%" alt="Note" style={{ maxHeight: '200px', objectFit: 'cover' }} />}
      {title && <h3>{title}</h3>}
      
      <p className='scroll'>
        {isExpanded ? content : `${content.substring(0, 100)}...`}
        {content.length > 100 && (
          <span
            className="see-more"
            onClick={toggleContent}
            style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
          >
            {isExpanded ? ' See less' : ' See more'}
          </span>
        )}
      </p>

     
      
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
