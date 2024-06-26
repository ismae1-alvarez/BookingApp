import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import Inputs from "../shared/Inputs";
import Buttons from "../shared/Buttons";
import { Toaster, toast } from "sonner";
import { Fragment } from "react/jsx-runtime";

type Inputs = {
  email: string;
  password: string;
};

export const Form = () => {
  const { register, reset, handleSubmit } = useForm<Inputs>();

  const { loginUser } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    loginUser({ email: data.email, password: data.password });
    toast(`Bienvenido ${data.email}`);
    reset({
      email: "",
      password: "",
    });
  };
  return (
    <Fragment>
      <Toaster position="top-center" />
      <section className="py-5 px-10 w-full flex flex-col gap-5 ">
        <img
          src="/bxs-user-circle.svg"
          alt="user"
          className="w-20 mx-auto bg-black rounded-full"
        />
        <form
          className="w-full md:w-2/3  p-1 mx-auto flex flex-col gap-3 bg-gray-500 rounded-lg space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <Inputs
              label="Email"
              name="email"
              type="email"
              register={register("email", { required: "Email is required" })}
            />
          </div>
          <div className="flex flex-col">
            <Inputs
              label="Password"
              name="password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <Buttons title={"submit"} type={"submit"} />
        </form>
      </section>
    </Fragment>
  );
};
