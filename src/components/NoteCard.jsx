import { Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/libs/cn";
import CloseButton from "@/components/buttons/CloseButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export const NoteCard = ({ note, handleDelete, handleEdit }) => {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state - separate from note data
  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
  });

  function openEditMode() {
    // Reset form to current note data
    setFormData({
      title: note.title,
      content: note.content,
    });
    setIsEdit(true);
  }

  function closeEditMode() {
    setIsEdit(false);
    // Discard changes
    setFormData({
      title: note.title,
      content: note.content,
    });
  }

  async function handleSave() {
    // Validation: don't allow empty title and content
    if (formData.title.trim() === "" && formData.content.trim() === "") {
      handleDelete(note.id);
      closeEditMode();
      return;
    }
    setIsSaving(true);
    try {
      await handleEdit(note.id, formData);
      closeEditMode();
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleInputChange(e, field) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <>
      {isEdit ? (
        <div
          className="fixed top-0 left-0 h-screen w-full z-50 flex justify-center items-center"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(5.1px)",
            WebkitBackdropFilter: "blur(5.1px)",
          }}
          onClick={closeEditMode}
        >
          <div
            className="w-125 p-4 m-4 rounded-lg bg-white"
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-red-400 font-semibold bg-gray-100 px-2 my-2 rounded-md">
              Edit
            </span>

            {/* Title Input */}
            <label className="w-full block mt-4">
              <input
                type="text"
                placeholder="Note title"
                className="text-xl font-medium outline-none mb-2 w-full border p-2 border-gray-200 rounded px-2 py-1 focus:border-blue-400"
                value={formData.title}
                onChange={(e) => handleInputChange(e, "title")}
                disabled={isSaving}
              />
            </label>

            {/* Content Textarea */}
            <label className="w-full block">
              <textarea
                placeholder="Note content"
                className="outline-none text-md mt-2 w-full p-2 border border-gray-200 rounded overflow-hidden resize-none focus:border-blue-400 min-h-32"
                value={formData.content}
                onChange={(e) => handleInputChange(e, "content")}
                disabled={isSaving}
              />
            </label>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-1 mt-2">
              <PrimaryButton onClick={closeEditMode} disabled={isSaving}>
                Cancel
              </PrimaryButton>
              <PrimaryButton onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "px-2 py-4 m-4 rounded-lg hover:shadow-lg flex-row justify-end items-center cursor-pointer",
          )}
          style={{
            boxShadow: isHover
              ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
              : "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={openEditMode}
        >
          <div className="*:wrap-break-word">
            <h1 className="text-lg font-medium my-1">{note.title}</h1>
            <h3 className="text-sm">{note.content}</h3>
          </div>
          <div className="flex items-center justify-end h-5">
            <button
              className={cn(
                "p-2 my-2 transition-all duration-300 rounded-md hover:bg-gray-100 hover:cursor-pointer",
                { "md:hidden": !isHover },
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(note.id);
              }}
              aria-label="Delete note"
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
