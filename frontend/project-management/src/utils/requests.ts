import { BASE_URL } from "../../config.json";

export const fetchUser = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
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
      localStorage.setItem("userId", data._id);
      localStorage.setItem("token", data.token);
    } else {
      console.log("No user logged in");
    }
  } catch (error) {
    console.log("Error fetching user", error);
  } finally {
    setLoading(false);
  }
};
