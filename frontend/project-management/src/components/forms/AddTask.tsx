import { useState } from "react";
import { ValidationError } from "yup";
import { BASE_URL } from "../../../config.json";
import { useAuth } from "../../store/useAuth";
import { task } from "../../types";
import { taskSchema } from "../../validations";

interface AddTaskProps {
  onClose: () => void;
  project: string | undefined;
  refreshProject: () => void;
}

const AddTask = ({ onClose, project, refreshProject }: AddTaskProps) => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState<task>({
    name: "",
    addedBy: user._id,
    project: project,
    isDone: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await taskSchema.validate(formData, { abortEarly: false });

      console.log(user);
      const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          jwt: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      onClose();
      refreshProject();
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
    <form onSubmit={formSubmitHandler} className="py-4 px-8 flex flex-col gap-4">
      {/* name */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="name" className="text-lg font-medium text-black ">
          نام تسک :
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

      <div className="flex items-center gap-4 mt-8">
        <button
          className="w-full font-medium text-lg border border-solid border-primary bg-primary text-white rounded py-2 hover:bg-white hover:text-primary transition-all duration-500 ease-in shadow-md hover:shadow-lg relative isolation-auto z-[4] before:absolute before:w-full before:transition-all before:duration-700 scale-100 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          type="submit"
        >
          ثبت تسک
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

export default AddTask;
