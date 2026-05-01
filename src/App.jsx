import { useReducer, useState } from "react";
import AddNote from "./components/AddNote";
import NoteCard from "./components/NoteCard";

import taskReducer from "./store/taskReducer";
import { initialState } from "./libs/initialState";

let initialId = 3;

// App component
export const App = () => {
  const [notes, dispatch] = useReducer(taskReducer, initialState);

  function handleNoteAdd(noteData) {
    dispatch({
      type: "ADD_NOTE",
      id: initialId++,
      title: noteData.title,
      note: noteData.note,
    });
  }

  function handleNoteDelete(noteId) {
    dispatch({ type: "DELETE_NOTE", id: noteId });
  }

  function handleNoteEdit(note) {
    dispatch({ type: "EDIT_NOTE", note: note });
  }

  return (
    <>
      <AddNote onAddNote={handleNoteAdd} />
      <div className="grid grid-cols-4 grap-4 h-auto my-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            handleDelete={handleNoteDelete}
            handleEdit={handleNoteEdit}
          />
        ))}
      </div>
    </>
  );
};

export default App;
