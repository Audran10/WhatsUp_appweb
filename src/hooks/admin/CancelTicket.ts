
export async function CancelTicket(ticketId: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/tickets/cancel/${ticketId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to Cancel ticket: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
  }
}
