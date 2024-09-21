import { useEffect, useState } from "react";
import { BASE_URL } from "../../config.json";
import { user } from "../types";

const Users = () => {
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  return (
    <div className="w-full flex flex-col gap-3">
      {users.map((user) => (
        <div
          className="flex flex-col gap-1 py-2 bg-gray-50 hover:bg-gray-200 px-4 rounded cursor-pointer transition-all ease-in duration-200"
          key={user._id}
        >
          <h2 className="font-medium text-base">{user.name}</h2>
          <span className="text-sm font-normal text-gray-400">{user.email}</span>
        </div>
      ))}
    </div>
  );
};

export default Users;
