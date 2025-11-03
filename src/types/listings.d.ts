interface Listing {
  id: string;
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  availability: boolean;
  listing_agent_id: string;
 listing_agent?: {
    id: string;
    name: string;
  };
}