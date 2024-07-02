import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
};

export default App;
