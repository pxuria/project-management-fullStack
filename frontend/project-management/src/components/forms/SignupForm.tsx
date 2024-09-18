import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ValidationError } from "yup";
import { useAuth } from "../../store/useAuth";
import { formProps, signup } from "../../types";
import { signupSchema } from "../../validations";

const SignupForm = ({ onClose }: formProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<signup>({});
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signupSchema.validate(formData, { abortEarly: false });

      const success = await signup(formData.name, formData.email, formData.password);

      if (success) onClose();
      else console.error("Signup failed");
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const formDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form action="" onSubmit={formSubmitHandler} className="py-4 px-8 flex flex-col gap-4">
      {/* name */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="name" className="text-lg font-medium text-black ">
          نام کاربری :
        </label>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="text"
            className="w-full outline-none py-2 px-4 text-base rounded border border-solid border-[#d9d9d9]"
            name="name"
            onChange={formDataChangeHandler}
            value={formData.name}
            id="name"
          />
          {errors.name && <span className="text-[#FF0000] text-xs">{errors.name}</span>}
        </div>
      </div>

      {/* email */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="email" className="text-lg font-medium text-black ">
          ایمیل :
        </label>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="text"
            className="w-full outline-none py-2 px-4 text-base rounded border border-solid border-[#d9d9d9]"
            name="email"
            onChange={formDataChangeHandler}
            value={formData.email}
            placeholder="example@gmail.com"
            id="email"
          />
          {errors.email && <span className="text-[#FF0000] text-xs">{errors.email}</span>}
        </div>
      </div>

      {/*  password */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="password" className="text-lg font-medium text-black ">
          رمز عبور :
        </label>
        <div className="relative w-full flex flex-col gap-1">
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="w-full outline-none py-2 px-4 text-base rounded border border-solid border-[#d9d9d9]"
            name="password"
            onChange={formDataChangeHandler}
            value={formData.password}
            placeholder="******"
            id="password"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
            {showPassword === false ? (
              <IoEyeOffOutline className="w-5 h-5 cursor-pointer" />
            ) : (
              <IoEyeOutline className="w-5 h-5 cursor-pointer" />
            )}
          </span>
          {errors.password && <span className="text-[#FF0000] text-xs">{errors.password}</span>}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          className="w-full font-medium text-lg border border-solid border-primary bg-primary text-white rounded py-2 hover:bg-white hover:text-primary transition-all duration-500 ease-in shadow-md hover:shadow-lg relative isolation-auto z-[4] before:absolute before:w-full before:transition-all before:duration-700 scale-100 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          type="submit"
        >
          ثبت نام
        </button>
        <button
          className="w-full font-medium text-lg border border-solid border-black bg-white text-black rounded py-2 hover:bg-black hover:text-white transition-all duration-500 ease-in shadow-md hover:shadow-lg relative isolation-auto z-[4] before:absolute before:w-full before:transition-all before:duration-700 scale-100 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          type="button"
          onClick={onClose}
        >
          انصراف
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
