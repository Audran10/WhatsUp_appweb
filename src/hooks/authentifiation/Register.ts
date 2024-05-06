interface RegisterHook {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export async function RegisterHook({
  name,
  email,
  phoneNumber,
  password,
}: RegisterHook): Promise<void> {
  const body = {
    pseudo: name,
    email: email,
    phone: phoneNumber,
    password: password,
  };
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error! status: 400");
  }
}
