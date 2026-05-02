import ListViewButton from "./buttons/ListViewButton";

export default function Navbar() {
  return (
    <nav className="flex justify-around items-center border-gray-300 border-b ">
      <div className="">
        <h1>Logo</h1>
      </div>
      <div>
        <h1>Search Box</h1>
      </div>
      <div>
        <ListViewButton />
      </div>
    </nav>
  );
}
