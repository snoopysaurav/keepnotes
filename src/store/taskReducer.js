export default function taskReducer(notes, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return [
        ...notes,
        {
          id: action.id,
          title: action.title || "Untitled",
          note: action.note || "",
        },
      ];

    case "DELETE_NOTE":
      return notes.filter((note) => note.id !== action.id);

    case "EDIT_NOTE":
      return notes.map((note) => {
        if (note.id === action.note.id) {
          return action.note;
        } else {
          return note;
        }
      });

    default:
      return console.log("Unexpected Event ");
  }
}
