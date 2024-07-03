import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../features/notes/notesSlice';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ColorIcon from '../images/image.png';


const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleImageUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', "message_app");

      setLoading(true); 

      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dltvvglvf/image/upload`, formData);
        setLoading(false); 
        return response.data.secure_url;
      } catch (error) {
        setLoading(false); 
        console.error('Error uploading image:', error);
        return '';
      }
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (content.trim() === '') {
      alert('Content is required');
      setIsSubmitted(false);
      return;
    }

    setLoading(true); 

    const imageUrl = await handleImageUpload();

    dispatch(
      addNote({
        id: uuidv4(),
        title,
        content,
        imageUrl,
        backgroundColor,
        pinned: false,
      })
    );

    setLoading(false); 
    setTitle('');
    setContent('');
    setImage(null);
    setBackgroundColor('#000000');
    setIsSubmitted(false);
  };

  return (
    <form style={{backgroundColor:"black"}} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title (Optional)"
        maxLength={40}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={isSubmitted && content.trim() === '' ? 'invalid' : ''}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <div className="color-picker" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img width={30} src={ColorIcon} alt="Color Icon" />
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: backgroundColor,
            border: '1px solid #ccc'
          }}
        ></div>
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <button type="submit">Add Note</button>
      )}
    </form>
  );
};

export default NoteForm;
