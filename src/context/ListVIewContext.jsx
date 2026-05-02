import { createContext, useState } from "react";

export const ListViewContext = createContext();

export default function ListViewProvider({ children }) {
  const [isListView, setIsListView] = useState(false);

  function toggleListView() {
    setIsListView(!isListView);
    console.log("isListView: " + isListView);
  }

  return (
    <ListViewContext.Provider value={{ isListView, toggleListView }}>
      {children}
    </ListViewContext.Provider>
  );
}
