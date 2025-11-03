import { useContext } from "react"
import { AuthContext } from "../context/authContext"

type ListingCardProps = {
    listing: Listing,
    handleDeleteClick: Function,
    handleEditClick: Function,
    handleBooking: Function
}

export default function ListingCard({listing, handleDeleteClick, handleEditClick, handleBooking}: ListingCardProps) {
    const {user} = useContext(AuthContext)

    const isOwner = user?.id === listing.listing_agent?.id || user?.id === listing.listing_agent_id

    return (
        <li key={listing.id}>
              <p>{listing.name}- {listing.description}</p>
              <p>Location: {listing.location} <br />
                Price per night: {listing.price_per_night}</p>
              <p>Created by: {listing.listing_agent?.name} (
                {listing.listing_agent?.id})</p>
              <p>Available: {listing.availability}</p>

              <button type="button" onClick={() => handleBooking(listing.id)} >Book</button>

              {/* show delete btn if user.id ==== listing_agent.id */}
              {isOwner&& (
                <button onClick={() => handleDeleteClick(listing.id)}>Delete</button>
              )}
              {/* show update btn if user.id === listing_agent.id */}
              {isOwner && (
                <button onClick={() => handleEditClick(listing)}>Edit listing</button>
              )}
            </li>
    )
}