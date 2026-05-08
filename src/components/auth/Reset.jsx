import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabase";
import PrimaryButton from "../buttons/PrimaryButton";
import { CircleX } from "lucide-react";
import { cn } from "../../libs/cn";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "../Toast";
import keep from "../../assets/keep.svg";

const Reset = ({ onClick }) => {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  async function handleReset() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      getValues("email"),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );
    if (error) {
      errorToast(error.message, 3000);
    } else {
      successToast(
        "If an account exists for this email, a reset link has been sent.",
        3000,
      );
    }
    reset();
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(5.1px)",
          WebkitBackdropFilter: "blur(5.1px)",
        }}
      >
        <div
          className=" w-100 p-4 m-4 rounded-md flex flex-col gap-3 bg-white z-50"
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={keep} height={50} width={50} />
              <h1 className="text-xl font-medium">Reset Password</h1>
            </div>
            <button
              className="p-2 text-gray-700 hover:cursor-pointer outline-none hover:scale-110 transition-all delay-100"
              onClick={onClick}
            >
              <CircleX size={24} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(handleReset)}
            className="w-full *:w-full flex flex-col gap-1 items-center justify-start"
          >
            <input
              type="email"
              {...register("email", { required: "Required" })}
              className={cn(
                "p-2 text-md border rounded-md border-gray-300 outline-none",
                { "border-red-300": errors.email },
              )}
              placeholder="Your email address"
            />
            <PrimaryButton style={{ backgroundColor: "rgb(172, 231, 85)" }}>
              {isSubmitting ? "Sending..." : "Send"}
            </PrimaryButton>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Reset;
