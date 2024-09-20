import { useState } from "react";
import { ValidationError } from "yup";
import { BASE_URL } from "../../../config.json";
import { useAuth } from "../../store/useAuth";
import { formProps, project } from "../../types";
import { projectSchema } from "../../validations";
import { Badge } from "../UI";

const ProjectForm = ({ onClose }: formProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<project>({
    name: "",
    description: "",
    technologies: [] as string[],
    deadline: new Date().toISOString().split("T")[0],
    users: [user._id],
    isDone: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [badges, setBadges] = useState<string[]>([]);
  console.log(formData);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);
      await projectSchema.validate(formData, { abortEarly: false });

      const res = await fetch(`${BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          jwt: user.token,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      onClose();
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

  const addTechHandler = (e: React.KeyboardEvent<HTMLInputElement>, text: string) => {
    if (text.trim() === "") return;
    else if (e.key === " " && e.shiftKey) {
      setBadges((prevBadges) => [...prevBadges, text]);
      setFormData((prev) => ({
        ...prev,
        technologies: [...(Array.isArray(prev.technologies) ? prev.technologies : []), text],
      }));

      e.currentTarget.value = "";
    }
  };

  const handleDeleteBadge = (badge: string) => {
    setBadges(badges.filter((item) => item !== badge));

    setFormData((prev) => ({
      ...prev,
      technologies: Array.isArray(prev.technologies) ? prev.technologies.filter((tech) => tech !== badge) : [],
    }));
  };

  return (
    <form onSubmit={formSubmitHandler} className="py-4 px-8 flex flex-col gap-4">
      {/* name */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="name" className="text-lg font-medium text-black ">
          نام پروژه :
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

      {/* description */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="description" className="text-lg font-medium text-black ">
          توضیحات پروژه :
        </label>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="text"
            className="w-full outline-none py-2 px-4 text-base rounded border border-solid border-[#d9d9d9]"
            name="description"
            onChange={formDataChangeHandler}
            value={formData.description}
            id="description"
          />
          {errors.description && <span className="text-[#FF0000] text-xs">{errors.description}</span>}
        </div>
      </div>

      {/* technologies */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="technologies" className="text-lg font-medium text-black ">
          تکنولوژی های پروژه :
        </label>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="text"
            className="w-full outline-none py-2 px-4 text-base rounded border border-solid border-[#d9d9d9]"
            name="technologies"
            onKeyDown={(e) => addTechHandler(e, e.currentTarget.value)}
            id="technologies"
          />
          {errors.technologies && <span className="text-[#FF0000] text-xs">{errors.technologies}</span>}

          {badges.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {badges.map((badge, index) => (
                <Badge key={index} onDelete={handleDeleteBadge}>
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* deadline */}
      <div className="flex items-start flex-col gap-3">
        <label htmlFor="deadline" className="text-lg font-medium text-black ">
          ددلاین پروژه :
        </label>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="date"
            className="w-full outline-none py-2 px-4 text-base rounded border border-solid border-[#d9d9d9]"
            name="deadline"
            onChange={formDataChangeHandler}
            value={formData.deadline}
            id="deadline"
          />
          {errors.deadline && <span className="text-[#FF0000] text-xs">{errors.deadline}</span>}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          className="w-full font-medium text-lg border border-solid border-primary bg-primary text-white rounded py-2 hover:bg-white hover:text-primary transition-all duration-500 ease-in shadow-md hover:shadow-lg relative isolation-auto z-[4] before:absolute before:w-full before:transition-all before:duration-700 scale-100 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          type="submit"
        >
          ثبت پروژه
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

export default ProjectForm;
