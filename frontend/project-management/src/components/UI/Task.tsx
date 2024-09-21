import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { ValidationError } from "yup";
import { BASE_URL } from "../../../config.json";
import { useAuth } from "../../store/useAuth";
import { task } from "../../types";
import Modal from "./Modal";

interface TaskProps {
  task: task;
  refreshProject: () => void;
}

const Task = ({ task, refreshProject }: TaskProps) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState<task>({
    name: task.name,
    isDone: task.isDone,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { token } = useAuth();

  const toggleModalHandler = () => setToggleModal(!toggleModal);

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwt: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toggleModalHandler();
      refreshProject();
      console.log(data);
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

  const deleteTaskHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          jwt: token,
        },
      });
      const data = await res.json();
      console.log(data);
      toggleModalHandler();
      refreshProject();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setToggleModal(false);
    const updatedIsDone = e.target.checked;

    try {
      const res = await fetch(`${BASE_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwt: token,
        },
        body: JSON.stringify({ isDone: updatedIsDone }),
      });
      const data = await res.json();
      refreshProject();
      console.log("Task updated", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {toggleModal && (
        <Modal onClose={toggleModalHandler}>
          <form onSubmit={submithandler} className="bg-gray-50 rounded-lg px-4 py-2">
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  value={formData.name}
                  id="name"
                />
                {errors.name && <span className="text-[#FF0000] text-xs">{errors.name}</span>}
              </div>
            </div>

            {/* buttons */}
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center gap-4 w-2/3">
                <button
                  className="text-nowrap border outline-none rounded-lg px-4 py-2 bg-primary text-white transition-all ease-in duration-200 hover:bg-secondary text-base font-medium flex-1 justify-center"
                  type="submit"
                >
                  ثبت ویرایش
                </button>
                <button
                  className="text-nowrap outline-none rounded-md px-4 py-2 bg-red-600 text-white transition-all ease-in duration-200 hover:bg-red-500 text-base font-medium flex items-center flex-nowrap gap-2 flex-1 justify-center"
                  type="button"
                  onClick={toggleModalHandler}
                >
                  انصراف
                </button>
              </div>

              <button
                className="bg-white outline-none border-2 border-red-600 text-red-600 py-2 px-3 rounded transition-all ease-in duration-200 hover:bg-red-600 hover:text-white flex items-center gap-1 flex-nowrap justify-center"
                type="button"
                onClick={deleteTaskHandler}
              >
                <IoTrashOutline className="w-5 h-5" />
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div
        className="flex flex-nowrap gap-4 items-center cursor-pointer transition-all ease-in duration-200 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
        onClick={toggleModalHandler}
      >
        <input
          type="checkbox"
          name={task.name}
          id={task._id}
          checked={task.isDone}
          onChange={handleCheckboxChange}
          className="transition-all duration-500 ease-in-out w-5 h-5 rounded cursor-pointer"
        />
        <span
          className={
            task.isDone
              ? "relative w-full after:absolute after:content-[''] after:bg-gray-800 after:w-full after:h-[1px] after:top-[60%] after:-translate-y-1/2 after:z-10 after:right-0 text-gray-400"
              : ""
          }
        >
          {task.name}
        </span>
      </div>
    </>
  );
};

export default Task;
