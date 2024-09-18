import { createContext, ReactNode, useEffect, useState } from "react";
import { BASE_URL } from "../../config.json";
import { user } from "../types";

interface AuthContextType {
  user: user;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const defaultValue: AuthContextType = {
  user: { name: "", _id: "", token: "" },
  loading: true,
  login: async () => false,
  logout: async () => {},
  signup: async () => false,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(defaultValue);
const initialUser = {
  name: "",
  _id: "",
  token: "",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user>(initialUser);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${user._id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            jwt: user.token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsAuthenticated(true);
        } else {
          console.log("No user logged in");
        }
      } catch (error) {
        console.log("Error fetching user", error);
      } finally {
        setLoading(false);
      }
    };

    if (user._id && user.token) fetchUser();
    else setLoading(false);
  }, [user]);

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
        setIsAuthenticated(true);
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
        setIsAuthenticated(true);
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
    loading,
    login,
    logout,
    signup,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{!loading ? children : <div>Loading...</div>}</AuthContext.Provider>;
};

export default AuthContext;
