import { Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "../libs/cn";

export const NoteCard = ({ data, handleDelete, handleEdit }) => {
  const [isHover, setIsHover] = useState(false);
  function handleMouseEvent() {
    setIsHover((prev) => !prev);
  }
  return (
    <>
      <div
        className=" px-2 py-4 m-4 shadow-sm rounded-lg hover:shadow-lg flex-row justify-around  items-center"
        onMouseEnter={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
        onClick={handleEdit}
      >
        <div>
          <h1 className="text-md font-semibold">{data.title}</h1>
          <h3 className="text-sm ">{data.note}</h3>
        </div>
        <div className="flex items-center justify-end h-5">
          <button
            className={cn(
              "p-2 my-2 transition-all duration-300 rounded-md hover:bg-gray-100 hover:cursor-pointer",
              { hidden: !isHover },
            )}
            onClick={() => handleDelete(data.id)}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
