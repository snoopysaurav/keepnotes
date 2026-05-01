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
      <div className="columns-5 gap-2">
        {notes
          .map((note) => (
            <div
              key={note.id}
              className="w-full inline-block break-inside-avoid"
            >
              <NoteCard
                note={note}
                handleDelete={handleNoteDelete}
                handleEdit={handleNoteEdit}
              />
            </div>
          ))
          .reverse()}
      </div>
    </>
  );
};

export default App;
