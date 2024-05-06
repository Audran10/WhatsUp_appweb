export async function UnbanUser(userId: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/unban/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to unban user: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
  }
}
