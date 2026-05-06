import { LogOut } from "lucide-react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    navigate("/");
  };
  return (
    <button
      className="p-3 m-1 hover:rounded-full hover:bg-gray-100 hover:cursor-pointer"
      onClick={signOut}
    >
      <LogOut />
    </button>
  );
};

export default LogoutButton;
