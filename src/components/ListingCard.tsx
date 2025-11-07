import { useContext } from "react"
import { AuthContext } from "../context/authContext"

type ListingCardProps = {
    listing: Listing,
    handleDeleteClick: Function,
    handleEditClick: Function,
    handleBookingClick: (listing: Listing) => void;
    bookingListingId: string | null;
    bookingData: { check_in_date: string; check_out_date: string };
    // type define strict to string from listings.tsx
    setBookingData: React.Dispatch<React.SetStateAction<{ check_in_date: string; check_out_date: string }>>;
    setBookingListingId: React.Dispatch<React.SetStateAction<string | null>>,
    handleBookingSubmit: (e: React.FormEvent) => Promise<void>
}

export default function ListingCard({
    listing,
    handleDeleteClick,
    handleEditClick,
    handleBookingClick,
    bookingListingId,
    bookingData,
    setBookingData,
    handleBookingSubmit,
    setBookingListingId
}: ListingCardProps) {
    const { user } = useContext(AuthContext)

    const isOwner = user?.id === listing.listing_agent?.id || user?.id === listing.listing_agent_id

    return (
        <li className="listingCard" key={listing.id}>
            <div className="listingInfo">
                <h2 className="listingTitle">{listing.name}</h2>
                <p className="listingDescription">{listing.description}</p>
                <p className="listingDetails">
                    <span>📍 {listing.location}</span> <br />
                    <span>💰 {listing.price_per_night} SEK / night</span> <br />
                    <span>👤 Host: {listing.listing_agent?.name}</span>
                </p>
            </div>

            <div className="listingActions">
                {/* if not owner show booking btn */}
                {!isOwner && (
                    <button className="btnPrimary" type="button" onClick={() => handleBookingClick(listing)} disabled={isOwner}>Book</button>
                )}
                {/* show delete btn if user.id ==== listing_agent.id */}
                {isOwner && (
                    <button className="btnDelete" onClick={() => handleDeleteClick(listing.id)}>Delete</button>
                )}
                {/* show update btn if user.id === listing_agent.id */}
                {isOwner && (
                    <button className="btnEdit" onClick={() => handleEditClick(listing)}>Edit listing</button>
                )}
            </div>

            {/* show booking form */}
            {bookingListingId === listing.id && (
                <form onSubmit={handleBookingSubmit} className="bookingForm">
                    <label>
                        check-in
                        <input type="date" value={bookingData.check_in_date} onChange={(e) =>
                            setBookingData((prev) => ({
                                ...prev,
                                check_in_date: e.target.value
                            }))
                        }
                            required
                        />
                    </label>
                    <label>
                        check-out
                        <input type="date" value={bookingData.check_out_date} onChange={(e) =>
                            setBookingData((prev) => ({
                                ...prev,
                                check_out_date: e.target.value
                            }))
                        }
                            required
                        />
                    </label>
                    <div className="bookingButtons">
                        <button className="btnPrimary" type="submit">Confirm Booking</button>
                        <button className="btnSecondary" type="button" onClick={() => {
                            setBookingListingId(null);
                            setBookingData({ check_in_date: "", check_out_date: "" });
                        }}>Close</button>
                    </div>
                </form>
            )}
        </li>
    )
}