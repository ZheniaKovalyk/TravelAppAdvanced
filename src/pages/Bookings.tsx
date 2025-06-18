import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetBookedTripsQuery, useCancelTripMutation } from "../redux/api/tripAPI";

const Bookings = () => {
  const location = useLocation();
  const newBooking = location.state?.newBooking;

  const { data, isLoading, error } = useGetBookedTripsQuery();
  const [cancelTrip] = useCancelTripMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  const bookings = data?.bookedTrips || [];

  const handleCancel = (id: string) => {
    cancelTrip(id);
  };

  const allBookings = newBooking
    ? [
        ...bookings.map((b) => ({ ...b, total: b.totalPrice })), // json-броні
        { ...newBooking, total: newBooking.guests * newBooking.price }, // нове бронювання
      ]
    : bookings.map((b) => ({ ...b, total: b.totalPrice }));

  const sortedBookings = allBookings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Зберігаємо у стані
  const [filteredBookings, setBookings] = useState(sortedBookings);

  return (
    <>
      <main className="bookings-page">
        <h1 className="visually-hidden">Travel App</h1>
        <ul className="bookings__list">
          {allBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            filteredBookings.map((booking) => (
              <li key={booking.id} data-test-id="booking" className="booking">
                <h3 data-test-id="booking-title" className="booking__title">
                  {booking.trip?.title || booking.title}
                </h3>
                <span data-test-id="booking-guests" className="booking__guests">
                  {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                </span>
                <span data-test-id="booking-date" className="booking__date">
                  {booking.date}
                </span>
                <span data-test-id="booking-total" className="booking__total">
                  ${booking.total}
                </span>
                <button
                  data-test-id="booking-cancel"
                  className="booking__cancel"
                  title="Cancel booking"
                  onClick={() => handleCancel(booking.id)}
                >
                  <span className="visually-hidden">Cancel booking</span>×
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </>
  );
};

export default Bookings;
