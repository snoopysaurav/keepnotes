import { useContext, useState } from "react";
import { Rows2, LayoutGrid } from "lucide-react";
import { ListViewContext } from "../../context/ListVIewContext";

export default function ListViewButton() {
  const { isListView, toggleListView } = useContext(ListViewContext);
  return (
    <button
      onClick={toggleListView}
      className="p-3 m-1 hover:rounded-full hover:bg-gray-100 hover:cursor-pointer"
    >
      {isListView ? <LayoutGrid /> : <Rows2 />}
    </button>
  );
}
