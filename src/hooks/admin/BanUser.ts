export async function BanUser(userId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/ban/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to ban user: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
  }
}
