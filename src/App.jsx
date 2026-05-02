import { useContext, useReducer, useState } from "react";
import AddNote from "./components/AddNote";
import NoteCard from "./components/NoteCard";
import Navbar from "./components/Navbar";

import taskReducer from "./store/taskReducer";
import { initialState } from "./libs/initialState";
import { ListViewContext } from "./context/ListVIewContext";
import { cn } from "./libs/cn";

let initialId = 3;

// App component
export const App = () => {
  const [notes, dispatch] = useReducer(taskReducer, initialState);
  const { isListView } = useContext(ListViewContext);

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
      <Navbar />
      <AddNote onAddNote={handleNoteAdd} />
      <div
        className={cn(
          {
            "md:columns-5 gap-1 max-md:columns-2 max-sm:columns-1": !isListView,
          },
          {
            " flex-row items-center justify-center w-160 justify-self-center":
              isListView,
          },
        )}
      >
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
