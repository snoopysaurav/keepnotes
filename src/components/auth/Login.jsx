import { useForm } from "react-hook-form";
import ButtonPrimary from "../buttons/PrimaryButton";
import { cn } from "../../libs/cn";
import google from "@/assets/google.svg";
import { useNavigate } from "react-router";

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const navigateSignup = useNavigate();
  return (
    <>
      <section
        name="Login"
        className="flex items-center justify-center h-screen"
      >
        <div className="w-100 p-4 m-2">
          <form
            className="p-4 m-2 flex flex-col  items-center justify-center [&_label]:my-2 [&_label]:w-full [&_input]:my-2 [&_input]:w-full [&_input]:p-2 [&_input]:rounded-md [&_input]:outline-none [&_input]:border "
            onSubmit={handleSubmit((data) => {
              console.log(data);

              reset();
            })}
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
                {errors.emailOrUsername && (
                  <span className="text-red-500">*</span>
                )}
              </span>
              <input
                {...register("emailOrUsername", { required: "Required" })}
                type="text"
                className={cn("border-gray-200", {
                  "border-red-300": errors.emailOrUsername,
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
                  "border-red-300": errors.emailOrUsername,
                })}
              />
            </label>
            <ButtonPrimary style={{ backgroundColor: "#ACE755" }}>
              Login
            </ButtonPrimary>
            <ButtonPrimary type="button">
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
                  onClick={() => navigateSignup("/signup")}
                >
                  Sign up
                </strong>
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
