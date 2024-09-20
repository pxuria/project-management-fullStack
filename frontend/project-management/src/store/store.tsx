import { createContext, ReactNode, useState } from "react";
import { BASE_URL } from "../../config.json";
import { user } from "../types";

interface AuthContextType {
  user: user;
  setUser: React.Dispatch<React.SetStateAction<user>>;
  token: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
  toggleAddTask: boolean;
  toggleAddProduct: boolean;
  toggleAddTaskHandler: () => void;
  toggleAddProductHandler: () => void;
}

const defaultValue: AuthContextType = {
  user: { name: "", _id: "", token: "", email: "", projects: [] },
  setUser: () => {},
  token: "",
  login: async () => false,
  logout: async () => {},
  fetchUser: async () => {},
  signup: async () => false,
  isAuthenticated: false,
  toggleAddTask: false,
  toggleAddProduct: false,
  toggleAddTaskHandler: () => {},
  toggleAddProductHandler: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);
const initialUser = {
  name: "",
  email: "",
  _id: "",
  tasks: [],
  token: "",
  projects: [],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user>(initialUser);
  const [token, setToken] = useState<string>("");
  const [toggleAddProduct, setToggleAddProduct] = useState(false);
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAddProductHandler = () => setToggleAddProduct(!toggleAddProduct);
  const toggleAddTaskHandler = () => setToggleAddTask(!toggleAddTask);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          jwt: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const fetchedUser: user = await data.data;
        setUser(fetchedUser);
        setIsAuthenticated(true);
        localStorage.setItem("userId", fetchedUser._id);
        localStorage.setItem("token", fetchedUser.token);
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/users/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("token", data.token);
        return true;
      } else {
        console.error("Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("token", data.token);
        return true;
      } else {
        console.error("signup failed");
        return false;
      }
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };

  const logout = () => {
    setUser(initialUser);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    setUser,
    login,
    token,
    fetchUser,
    toggleAddTask,
    toggleAddProduct,
    logout,
    signup,
    isAuthenticated,
    toggleAddTaskHandler,
    toggleAddProductHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
