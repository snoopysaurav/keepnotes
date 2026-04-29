// Reducer function for useReducer()
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
    default:
      return notes;
  }
}
