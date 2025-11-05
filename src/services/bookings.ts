const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);
// import of interfaces for bookings
import type { Booking, NewBooking } from "../types/bookings";

// get bookings
export async function getBookings() {
    const response = await fetch(`${API_URL}/bookings`)

    if(!response.ok) {
        throw new Error("Failed to fetch bookings");
    }
    const data = await response.json()

    return data
}
// create booking
export async function createBooking(bookingData: NewBooking): Promise<{ booking: Booking }> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error('Failed to create booking');
  }

  return response.json();
}
