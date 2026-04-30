import { useReducer } from "react";
import { GlobalStateContext, taskReducer } from "../store/taskReducer";
import { initialState } from "../libs/initialState";

export function GlobalProvider({ children }) {
  const [notes, dispatch] = useReducer(taskReducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ notes, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
