import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPasswordFlag } = useAuth();

  useEffect(() => {
    const handlePasswordReset = async () => {
      const newPassword = prompt(
        "What would you like your new password to be?",
      );
      if (newPassword) {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (data) {
          alert("Password updated successfully!");
          resetPasswordFlag();
          navigate("/");
        }
        if (error) alert("There was an error updating your password.");
      }
    };

    handlePasswordReset();
  }, []);
  return <div>resetPassword</div>;
};

export default ResetPassword;
