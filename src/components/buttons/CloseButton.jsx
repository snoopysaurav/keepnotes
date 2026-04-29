export default function CloseButton({ children, onClick }) {
  return (
    <button
      className="text-sm text-gray-900 font-semibold hover:cursor-pointer p-2 hover:bg-gray-100 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
