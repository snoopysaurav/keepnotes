import { useRef, useState } from "react";
import { cn } from "../libs/cn";
import CloseButton from "./buttons/CloseButton";

export default function AddNote({ onAddNote }) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const textareaRef = useRef(null);

  function handleContainerBlur(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    // Add note
    if (note === "") return;

    onAddNote({ title, note });
    setIsActive(!isActive);
    setTitle("");
    setNote("");
  }

  function handleInput() {
    const el = textareaRef.current;
    el.style.height = "auto"; //reset height
    el.style.height = el.scrollHeight + "px"; // grow based on content
  }

  return (
    <>
      <div
        className="flex items-center justify-center"
        onBlur={handleContainerBlur}
      >
        <div className="p-3 m-4 shadow-sm w-150 [&_input]:text-gray-600">
          {isActive && (
            <>
              <label className="w-100">
                <input
                  placeholder="Title"
                  className="text-xl font-semibold outline-none mb-2"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
            </>
          )}
          <label className="w-100">
            <textarea
              ref={textareaRef}
              placeholder="Take a note..."
              className="outline-none text-md mt-2 w-100 h-auto overflow-hidden resize-none"
              onInput={handleInput}
              onFocus={() => setIsActive(true)}
              onChange={(e) => setNote(e.target.value)}
              value={note}
            ></textarea>
          </label>
          {isActive && (
            <div className="flex items-center justify-end">
              <CloseButton onClick={() => setIsActive(!isActive)}>
                Close
              </CloseButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
