import { Trash } from "lucide-react";
import { useContext, useState } from "react";
import { cn } from "../libs/cn";
import CloseButton from "./buttons/CloseButton";

export const NoteCard = ({ note, handleDelete, handleEdit }) => {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function handleMouseEvent() {
    setIsHover((prev) => !prev);
  }

  function toggleEditMode() {
    if (note.title === "") {
      handleDelete(note.id);
    }
    setIsEdit((prev) => !prev);
  }

  return (
    <>
      {isEdit ? (
        <div
          className="absolute inset-0 h-full w-full bg-amber-50"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5.1px)",
            WebkitBackdropFilter: "blur(5.1px)",
            border: " 1px solid rgba(255, 255, 255, 0.28)",
          }}
          onClick={toggleEditMode}
        >
          <div className=" w-full h-full flex justify-center items-center">
            <div
              className="w-125 p-4 m-4  rounded-lg"
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-red-400 font-semibold bg-gray-50 px-2 my-2 rounded-md">
                Edit
              </span>
              <label className="w-full">
                <input
                  className="text-xl font-semibold outline-none mb-2 w-full"
                  value={note.title}
                  onChange={(e) => {
                    handleEdit({
                      ...note,
                      title: e.target.value,
                    });
                  }}
                />
              </label>
              <textarea
                className="outline-none text-md mt-2 w-full overflow-hidden resize-none"
                value={note.note}
                onChange={(e) => {
                  handleEdit({
                    ...note,
                    note: e.target.value,
                  });
                }}
              ></textarea>
              <div className="justify-self-end">
                <CloseButton onClick={toggleEditMode}>Close</CloseButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "px-2 py-4 m-4 rounded-lg hover:shadow-lg flex-row justify-end items-center",
          )}
          style={{
            boxShadow: isHover
              ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
              : "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
          }}
          onMouseEnter={handleMouseEvent}
          onMouseLeave={handleMouseEvent}
          onClick={toggleEditMode}
        >
          <div>
            <h1 className="text-md font-semibold">{note.title}</h1>
            <h3 className="text-sm ">{note.note}</h3>
          </div>
          <div className="flex items-center justify-end h-5">
            <button
              className={cn(
                "p-2 my-2 transition-all duration-300 rounded-md hover:bg-gray-100 hover:cursor-pointer ",
                { hidden: !isHover },
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(note.id);
              }}
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
