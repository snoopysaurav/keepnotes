export default function ButtonPrimary({ children, onClick, style, type }) {
  return (
    <button
      className="p-4 m-2 rounded-md outline-none w-full hover:cursor-pointer bg-gray-100 text-black font-medium text-sm"
      style={style}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
