import { Search } from "lucide-react";
import ListViewButton from "./buttons/ListViewButton";
import logo from "../assets/keep.svg";

export default function Navbar({ handleSearch }) {
  return (
    <nav className="md:flex justify-around items-center border-gray-300 border-b my-2">
      <div className="flex justify-center items-center">
        <img src={logo} height={40} width={40} alt="keep" />
        <h1 className="text-xl font-semibold">Keep</h1>
      </div>
      <div className="p-2 md:w-200">
        <label className=" bg-gray-100 rounded-lg flex items-center justify-around px-4">
          <Search color="gray" />
          <input
            type="text"
            placeholder="Search"
            className="font-xl outline-none p-4 w-full"
            onChange={handleSearch}
          />
        </label>
      </div>
      <div className="max-sm:hidden max-md:justify-self-end">
        <ListViewButton />
      </div>
    </nav>
  );
}
