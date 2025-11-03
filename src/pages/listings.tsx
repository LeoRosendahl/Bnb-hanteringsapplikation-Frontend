import { useEffect, useState, type ChangeEvent } from 'react'
import { deleteListing, getListings, postListing, updateListing } from '../services/listings';
import { useContext } from 'react';
import { AuthContext } from "../context/authContext";

import { useNavigate } from "react-router-dom";
import '../App.css'
import ListingCard from '../components/ListingCard';

function ListingPage() {
  const navigate = useNavigate();
  // context login (funktion to log in) isLoggedIn (check to see if user is logged in)
  const { user, login, isLoggedIn, logout } = useContext(AuthContext);

  // gör att datan vi sätter in i listings matchar interfacet jag skapade innan
  const [listings, setListings] = useState<Listing[]>([]);
  // makes update form exclusive to listing id 
  const [updatingListingId, setUpdatingListingId] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    description: "",
    location: "",
    price_per_night: "",
    availability: true
  });
  const [showForm, setShowForm] = useState(false)
  const [postListingData, setPostListingData] = useState({
    name: "",
    description: "",
    location: "",
    price_per_night: "",
    availability: true
  })

  const propertyName = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setPostListingData({
      ...postListingData,
      name: inputValue
    });
  }

  const locationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setPostListingData({
      ...postListingData,
      location: inputValue
    });
  }

  const priceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setPostListingData({
      ...postListingData,
      price_per_night: inputValue
    });
  }


  const descriptionInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setPostListingData({
      ...postListingData,
      description: inputValue
    });
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', postListingData);

    //if user is not logged in stop function end send alert to user
    if (!isLoggedIn) {
      alert("Please Log in")
      return
    }

    try {
      // Sends data to backend via postListing in services/listings.ts
      const response = await postListing(postListingData);
      const newListing = response.listing
      // will update the shown listings on page and update the previus one id:s to bypass key={prop} problelm
      setListings(prev => {
        const exists = prev.some(l => l.id === newListing.id);
        return exists ? prev : [...prev, newListing];
      });


    } catch (error) {

    }

  }

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        if (error instanceof Error) {
        } else {
          console.error(error);
        }
      }
    }
    fetchListings();
  }, []);

  // delete listing btn function
  const handleDeleteClick = async (listingId: string) => {
    try {
      await deleteListing(listingId); // anropar din API-funktion
      // ta bort listing från state så UI uppdateras direkt
      setListings(prev => prev.filter(l => l.id !== listingId));
    } catch (err) {
      console.error("Failed to delete listing", err);
    }
  };

  const handleEditClick = (listing: Listing) => {
    setUpdatingListingId(listing.id)
    setUpdateData({
      name: listing.name,
      description: listing.description,
      location: listing.location,
      price_per_night: listing.price_per_night.toString(),
      availability: listing.availability
    })
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatingListingId) return;

    const updatedData = {
      ...updateData,
      price_per_night: Number(updateData.price_per_night)
    };

    try {
      const updatedResponse = await updateListing(updatingListingId, updatedData);
      const updatedListing = updatedResponse.listing;
      setListings(prev => prev.map(l => l.id === updatingListingId ? updatedListing : l));

      setUpdatingListingId(null)
    }catch(error) {
      console.error("Failed to update listing", error)
    }

  }


  const handleBooking = (listing: Listing) => {
      // skapar en booknign baserat på listings id 
      console.log(listing.id)
  }

  return (
    <div className='listingPageContainer'>
      {/* logout btn toggles if you are logged in or out */}
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : null}
      {/* button that toggles show form on and of */}
      <div className='createListing'>
        <button className='createListingButton'
          onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create listing'}</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Poperty name'
            value={postListingData.name}
            onChange={propertyName}
            required></input>
          <input type='text' placeholder='Location'
            value={postListingData.location}
            onChange={locationInput}
            required></input>
          <input type='number' placeholder='Price per night'
            value={postListingData.price_per_night}
            onChange={priceInput}
            required></input>
          <textarea placeholder='Enter a short desciption'
            value={postListingData.description}
            onChange={descriptionInput}
            required></textarea>
          {/* if user is logged in show submit btn if not show login/register btn */}
          {isLoggedIn ? (
            <button type='submit' className="submitListingButton">Submit</button>
          ) :
            <div>
              <p className="textLinkToLogin" onClick={() => { navigate("/login") }}>login/register</p>
            </div>
          }
        </form>
      )}
      <h1>Listings</h1>
      {listings.length > 0 ? (
        <ul>
          {listings.map(listing => <ListingCard key={listing.id} listing={listing} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleBooking={handleBooking}/>)}
        </ul>
      ) : (
        <p>No listings yet...</p>
      )}
      {updatingListingId && (
           <form onSubmit={handleUpdateSubmit}>
             <input type='text' placeholder='Name' value={updateData.name} onChange={e => setUpdateData({ ...updateData, name: e.target.value })} />
             <input type='text' placeholder='Location' value={updateData.location} onChange={e => setUpdateData({ ...updateData, location: e.target.value })} />
             <input type='number' placeholder='Price per night' value={updateData.price_per_night} onChange={e => setUpdateData({ ...updateData, price_per_night: e.target.value })} />
             <textarea placeholder='Description' value={updateData.description} onChange={e => setUpdateData({ ...updateData, description: e.target.value })} ></textarea>
             <button type='submit'>Save</button>
             <button type='button' onClick={() => setUpdatingListingId(null)}>Cancel</button>
           </form>
         )}
    </div>
  );
}

export default ListingPage;



