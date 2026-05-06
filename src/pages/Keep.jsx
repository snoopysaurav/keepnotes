import { useContext, useEffect, useReducer, useState } from "react";
import AddNote from "@/components/AddNote";
import NoteCard from "@/components/NoteCard";
import Navbar from "@/components/Navbar";

import taskReducer from "../store/taskReducer";
import { initialState } from "@/libs/initialState";
import { ListViewContext } from "@/context/ListVIewContext";
import { cn } from "@/libs/cn";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";
import { errorToast, successToast } from "../components/Toast";
import { Toaster } from "react-hot-toast";

// App component
export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isListView } = useContext(ListViewContext);
  const { user } = useAuth();

  // Sync notes to Supabase when they change
  useEffect(() => {
    if (!user) return;
    getNotes(); //function called <--
  }, [user]);

  //function to get data from supabase
  async function getNotes() {
    const { data } = await supabase.from("notes").select();
    setNotes(data);
  }

  async function handleNoteAdd(noteData) {
    // Update local state first
    // dispatch({
    //   type: "ADD_NOTE",
    //   title: noteData.title,
    //   note: noteData.note,
    // });

    // Then sync to Supabase
    if (user) {
      await supabase.from("notes").insert([
        {
          user_id: user.id,
          title: noteData.title || "",
          content: noteData.note || "",
        },
      ]);
    }
  }

  async function handleNoteDelete(noteId) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
  }

  async function handleNoteEdit(id, title, content) {
    const [data, error] = await supabase
      .from("notes")
      .update({
        title: title,
        content: content,
      })
      .eq("id", id);
    successToast("Note Deleted", 3000);
  }

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <Navbar handleSearch={handleSearchQuery} />
      <AddNote onAddNote={handleNoteAdd} />
      <div className="p-4 m-4 text-xl">
        Welcome,{" "}
        <span className="text-yellow-500">{user?.user_metadata?.username}</span>
      </div>
      <div
        className={cn(
          {
            "md:columns-5 gap-1 max-md:columns-2 max-sm:columns-1 md:px-4":
              !isListView,
          },
          {
            " flex-row items-center justify-center md:w-160 justify-self-center":
              isListView,
          },
        )}
      >
        {/* For Search Functionality */}
        {searchQuery.length > 1 ? (
          <>
            {notes
              .filter((note) =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((note) => (
                <div
                  key={note.id}
                  className="w-full inline-block break-inside-avoid"
                >
                  <NoteCard
                    note={note}
                    handleDelete={handleNoteDelete(note.id)}
                    handleEdit={handleNoteEdit}
                  />
                </div>
              ))
              .reverse()}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Home;
