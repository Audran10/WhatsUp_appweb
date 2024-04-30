export async function BanUser(userId: string) {
  try {
    const response = await fetch(`http://localhost:3000/users/ban/${userId}`, {
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
