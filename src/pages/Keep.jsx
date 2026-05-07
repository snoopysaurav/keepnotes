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
import { errorToast, successToast, iconToast } from "../components/Toast";
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
    if (user) {
      const { data, error } = await supabase
        .from("notes")
        .insert([
          {
            user_id: user.id,
            title: noteData.title || "",
            content: noteData.note || "",
          },
        ])
        .select();
      if (!error) {
        setNotes((prev) => [...prev, data[0]]);
        successToast("Note Added", 2000);
      }
    }
  }

  async function handleNoteDelete(noteId) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
    if (!error) setNotes((prev) => prev.filter((note) => note.id !== noteId));
    iconToast("Note Deleted", 2000, "top-center", "😣");
  }

  async function handleNoteEdit(id, updatedData) {
    try {
      // Optimistic update - update UI immediately
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                title: updatedData.title,
                content: updatedData.content,
              }
            : note,
        ),
      );

      // Sync to Supabase
      const { error } = await supabase
        .from("notes")
        .update({
          title: updatedData.title,
          content: updatedData.content,
        })
        .eq("id", id);

      if (error) throw error;

      successToast("Note Updated Successfully", 2000);
    } catch (error) {
      console.error("Error updating note:", error);
      errorToast("Failed to update note", 2000);
      // Revert state on error by refetching
      getNotes();
    }
  }

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <Navbar handleSearch={handleSearchQuery} />
      <AddNote onAddNote={handleNoteAdd} />
      <div className="p-4 m-4 text-lg">
        Welcome,{" "}
        <span className="text-yellow-500 font-semibold">
          {user?.user_metadata?.username}
        </span>
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
                    handleDelete={() => handleNoteDelete(note.id)}
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
                    handleDelete={() => handleNoteDelete(note.id)}
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
