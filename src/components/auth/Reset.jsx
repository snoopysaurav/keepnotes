import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabase";

const Reset = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  return (
    <>
      <div className="w-full h-full items-center justify-center">
        <h1 className="text-xl">Reset Password</h1>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
          })}
        >
          <input
            type="text"
            {...register("email", { required: "Required" })}
            className="p-2 text-md border rounded-md border-gray-300 outline-none"
          />
        </form>
      </div>
    </>
  );
};

export default Reset;
