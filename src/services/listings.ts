const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

// get listings
export async function getListings() {
    const response = await fetch(`${API_URL}/listings`)

    if(!response.ok) {
        throw new Error("Failed to fetch listings");
    }
    const data = await response.json()

    return data
}

// post a listing
export async function postListing(listingData: {}) {
  const response = await fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(listingData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error('Failed to create listing');
  }

  const data = await response.json();
  return data;
}

// delete a listing
export async function deleteListing(listingId: string) {
  const response = await fetch(`${API_URL}/listings/${listingId}`, {
    method: "DELETE",
    credentials: "include"
  })
  if(!response.ok) {
    throw new Error("Failed to delete listing")
  }
  const data = await response.json()
  return data

}
// update a listing
export async function updateListing(listingId: string, listingData: {}) {
  const response = await fetch(`${API_URL}/listings/${listingId}`, {
    method: "PUT",
     headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(listingData),
    credentials: "include"
  })
  if(!response.ok) {
    throw new Error("Failed to update listing :(")
  }
  const data = await response.json()
  return data
}