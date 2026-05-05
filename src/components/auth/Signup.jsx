import { useForm } from "react-hook-form";
import { cn } from "../../libs/cn";
import ButtonPrimary from "../buttons/PrimaryButton";
import google from "@/assets/google.svg";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigateLogin = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="p-4 m-2 w-100">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
          })}
          className={cn(
            "[&_label]:my-1 [&_label]:w-full p-4 m-2 flex flex-col items-center justify-center  [&_input]:outline-none [&_input]:my-2 [&_input]:border [&_input]:rounded-md [&_input]:p-2 [&_input]:w-full",
          )}
        >
          <div className="w-full my-2">
            <h1 className="text-2xl text-gray-900 font-medium">
              Try Snoopy Keep for free!
            </h1>
            <h3 className="text-md text-gray-700">
              Sign up or login to continue
            </h3>
          </div>
          <label>
            <span className="font-medium">
              Username{" "}
              {errors.username && <span className="text-red-500">*</span>}
            </span>
            <input
              {...register("username", {
                required: "Required",
                maxLength: 20,
                minLength: {
                  value: 3,
                  message: "Min length is 3",
                },
              })}
              type="text"
              className={cn("border-gray-300", {
                "border-red-200": errors.username,
              })}
            />
            {errors.username && (
              <p className=" text-sm text-red-500">
                {errors?.username?.message}
              </p>
            )}
          </label>
          <label>
            <span className="font-medium">
              Email {errors.email && <span className="text-red-500">*</span>}
            </span>
            <input
              {...register("email", {
                required: "Required",
                maxLength: 40,
                type: "email",
              })}
              className={cn("border-gray-300", {
                "border-red-200": errors?.email,
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            )}
          </label>
          <label>
            <span className="font-medium">
              Password{" "}
              {errors.password && <span className="text-red-500">*</span>}
            </span>
            <input
              {...register("password", { required: "Required" })}
              type="password"
              className={cn("border-gray-300", {
                "border-red-200": errors?.password,
              })}
            />
            {errors.password && (
              <p className=" text-sm text-red-500">
                {errors?.password?.message}
              </p>
            )}
          </label>

          <ButtonPrimary style={{ backgroundColor: "#ACE755" }}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </ButtonPrimary>
          <div className="w-full flex items-center justify-center">
            <hr className="border-t-2  border-gray-300 w-full" />
            <span className="text-md mx-4">or</span>
            <hr className="border-t-2 border-gray-300 w-full" />
          </div>
          <ButtonPrimary type="button">
            <div className="flex items-center justify-center">
              <img
                src={google}
                alt="google"
                className="mx-2"
                height={20}
                width={20}
              />
              <span>Sign up with Google</span>
            </div>
          </ButtonPrimary>
          <div>
            <span className="text-sm">
              Already have an account?{" "}
              <strong
                className="hover:cursor-pointer"
                onClick={() => navigateLogin("/login")}
              >
                Login
              </strong>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
