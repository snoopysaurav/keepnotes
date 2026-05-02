import { useContext, useRef, useState } from "react";
import { cn } from "../libs/cn";
import CloseButton from "./buttons/CloseButton";

export default function AddNote({ onAddNote }) {
  const [isActive, setIsActive] = useState(false);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  function handleContainerBlur(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    // Add note
    if (note === "") return;

    onAddNote({ title, note });
    setIsActive(!isActive);
    setTitle("");
    setNote("");
  }

  function handleChangeNote(e) {
    setNote(e.target.value);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  return (
    <>
      <div
        className="flex items-center justify-center"
        onBlur={handleContainerBlur}
      >
        <div
          className="p-3 m-4 w-150 rounded-lg"
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          {isActive && (
            <>
              <label className="w-full">
                <input
                  placeholder="Title"
                  className="text-xl font-semibold outline-none h-10 py-2 w-full"
                  onChange={(e) => handleChangeTitle(e)}
                  value={title}
                />
              </label>
            </>
          )}
          <label className="w-full">
            <textarea
              placeholder="Take a note..."
              className="outline-none text-md h-10 py-2 w-full overflow-hidden resize-none field-sizing-content"
              onFocus={() => setTimeout(() => setIsActive(true), 500)}
              onChange={(e) => handleChangeNote(e)}
              value={note}
            ></textarea>
          </label>
          {isActive && (
            <div className="flex items-center justify-end">
              <CloseButton
                onClick={() => {
                  setIsActive(!isActive);
                  setNote("");
                  setTitle("");
                }}
              >
                Close
              </CloseButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
