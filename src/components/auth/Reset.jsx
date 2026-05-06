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
      <p>Enter your email</p>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input
          type="text"
          {...register("email", { required: "Required" })}
          className="p-2 text-md border rounded-md border-gray-300 outline-none"
        />
      </form>
    </>
  );
};

export default Reset;
