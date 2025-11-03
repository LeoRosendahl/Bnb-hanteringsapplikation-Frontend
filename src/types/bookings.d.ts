// types/booking.ts

export interface NewBooking {
  check_in_date: string;       
  check_out_date: string;    
  total_price: number;
  listing_id: string;
  user_id: string;
}

// när bokningen är skapad, kommer backend lägga till id + createdAt
export interface Booking extends NewBooking {
  id: string;
  createdAt: string;
}

// används om du hämtar bokningar med relationsdata (join på user + listing)
export interface BookingWithUserAndListing extends Booking {
  listing: {
    id: string;
    name: string;
    price_per_night: number;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
}
