import { useReducer, useState } from "react";
import AddNote from "./components/AddNote";
import NoteCard from "./components/NoteCard";
//Dummy Data Import
import { initialData } from "./libs/initialData";
import taskReducer from "./TaskReducer";

let initialId = 3;

// App component
export const App = () => {
  const [notes, dispatch] = useReducer(taskReducer, initialData);

  // Function to Submit Form
  function handleNoteAdd(noteData) {
    dispatch({
      type: "ADD_NOTE",
      id: initialId++,
      title: noteData.title,
      note: noteData.note,
    });
  }

  //Function to Delete Note
  function handleNoteDelete(noteId) {
    dispatch({ type: "DELETE_NOTE", id: noteId });
  }
  return (
    <>
      <AddNote onAddNote={handleNoteAdd} />
      <div className="grid grid-cols-4 h-auto my-4">
        {notes
          .map((note) => (
            <NoteCard
              key={note.id}
              data={note}
              handleDelete={handleNoteDelete}
            />
          ))
          .reverse()}
      </div>
    </>
  );
};

export default App;
