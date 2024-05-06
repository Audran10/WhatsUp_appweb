import User from "../../models/User";

const updateMyUser = async (id: string, formData: FormData): Promise<User> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  } catch (error) {
    return {} as User;
  }
};

export default updateMyUser;
