import { useState } from "react";
import { formProps } from "../../types";
import { LoginForm, SignupForm } from "./index";

const AuthForm = ({ onClose }: formProps) => {
  const [form, setForm] = useState("login");
  const defaultTitleClasses =
    "cursor-pointer font-semibold text-lg w-full text-center rounded-lg py-2 transition-all duration-300";

  return (
    <div className="bg-white rounded-lg border-solid border-[#EDEDED] border ">
      <div className="flex items-center justify-around mb-4">
        <span
          className={`${defaultTitleClasses} ${
            form === "login" && "bg-primary text-white"
          } rounded-tl-none rounded-bl-none`}
          onClick={() => setForm("login")}
        >
          ورود
        </span>
        <span
          className={`${defaultTitleClasses} ${
            form === "signup" && "bg-primary text-white"
          } rounded-tr-none rounded-br-none`}
          onClick={() => setForm("signup")}
        >
          ثبت نام
        </span>
      </div>
      {form === "login" ? <LoginForm onClose={onClose} /> : <SignupForm onClose={onClose} />}
    </div>
  );
};

export default AuthForm;
