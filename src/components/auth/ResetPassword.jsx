import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthContext";
import ButtonPrimary from "../buttons/PrimaryButton";
import { useForm } from "react-hook-form";
import { cn } from "../../libs/cn";
import keep from "../../assets/keep.svg";
import { errorToast, successToast } from "../Toast";
import { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const { resetPasswordFlag } = useAuth();

  async function handlePasswordReset() {
    const { data, error } = await supabase.auth.updateUser({
      password: getValues("password"),
    });
    if (error) {
      errorToast(error.message, 3000);
      return;
    }
    successToast("Password updated successfully", 3000);
    resetPasswordFlag();
    reset();
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-100">
        <div className="flex items-center my-2">
          <img src={keep} height={50} width={50} />
          <h1 className="text-2xl text-gray-900 font-medium my-2">
            Reset Password
          </h1>
        </div>

        <form className="w-full" onSubmit={handleSubmit(handlePasswordReset)}>
          <label>
            <span className="w-full font-medium">Your new password</span>
            <input
              type="password"
              {...register("password", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Min length is 6",
                },
              })}
              className={cn(
                "outline-none p-2 text-lg border my-2 border-gray-200 rounded-md w-full",
                { "border-red-300": errors.password },
              )}
            />
          </label>
          {errors.password && (
            <p className="text-sm text-red-500 mb-2">
              {errors?.password?.message}
            </p>
          )}
          <ButtonPrimary
            style={{ backgroundColor: "rgb(172, 231, 85)", margin: 0 }}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </ButtonPrimary>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
