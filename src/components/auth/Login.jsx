import { useForm } from "react-hook-form";
import ButtonPrimary from "../buttons/PrimaryButton";
import { cn } from "../../libs/cn";
import google from "@/assets/google.svg";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "../Toast";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: getValues("email"),
      password: getValues("password"),
    });
    if (error) {
      console.log(error);
      setError(error.message);
      errorToast(error.message, 3000);
    } else {
      console.log("Login Successful");
      navigate("/keep");
    }
    reset();
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/keep`,
      },
    });
    if (error) {
      setError(error.message);
      errorToast(error.message, 3000);
    }
  };

  return (
    <>
      <section
        name="Login"
        className="flex items-center justify-center h-screen"
      >
        <div className="w-100 p-4 m-2">
          <form
            className="p-4 m-2 flex flex-col  items-center justify-center [&_label]:my-2 [&_label]:w-full [&_input]:my-2 [&_input]:w-full [&_input]:p-2 [&_input]:rounded-md [&_input]:outline-none [&_input]:border "
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="w-full my-2">
              <h1 className="text-2xl text-gray-900 font-medium">
                Try Snoopy Keep for free!
              </h1>
              <h3 className="text-md text-gray-700">Login to continue</h3>
            </div>
            <label>
              <span className="font-medium">
                Email or Username{" "}
                {errors.email && <span className="text-red-500">*</span>}
              </span>
              <input
                {...register("email", { required: "Required" })}
                type="text"
                className={cn("border-gray-200", {
                  "border-red-300": errors.email,
                })}
              />
            </label>
            <label>
              <span className="font-medium">
                Password{" "}
                {errors.password && <span className="text-red-500">*</span>}
              </span>
              <input
                {...register("password", { required: "Required" })}
                type="password"
                className={cn("border-gray-200", {
                  "border-red-300": errors.password,
                })}
              />
            </label>
            <div className="w-full flex justify-end">
              <span className="text-sm font-medium hover:underline hover:cursor-pointer">
                <Link to="/reset">Forgot Password?</Link>
              </span>
            </div>
            <ButtonPrimary style={{ backgroundColor: "#ACE755" }}>
              {isSubmitting ? "Loading..." : "Login"}
            </ButtonPrimary>
            <ButtonPrimary type="button" onClick={handleGoogleSignup}>
              <div className="flex items-center justify-center">
                <img
                  src={google}
                  alt="google"
                  className="mx-2"
                  height={20}
                  width={20}
                />
                <span>Login with Google</span>
              </div>
            </ButtonPrimary>
            <div>
              <span className="text-sm">
                Don't have an account?{" "}
                <strong
                  className="hover:cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </strong>
              </span>
            </div>
          </form>
        </div>
        <Toaster />
      </section>
    </>
  );
}
