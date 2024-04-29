export async function AcceptTicket(ticketId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/tickets/accept/${ticketId}`,
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
      throw new Error(`Failed to unban user: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
  }
}
