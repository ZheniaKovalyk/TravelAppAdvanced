import { useGetBookedTripsQuery, useCancelTripMutation } from "../redux/api/tripAPI";
import { toast } from "react-toastify";

const Bookings = () => {
  const { data, isLoading, error } = useGetBookedTripsQuery();
  const [cancelTrip] = useCancelTripMutation();

  if (isLoading) return <div data-test-id="loader">Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  const bookings = Array.isArray(data) ? data : data?.bookedTrips || [];
console.log(data);
const handleCancel = async (id: string) => {
  try {
    await cancelTrip(id).unwrap();
    toast.success("Booking cancelled successfully!", { className: "notification" });
  } catch {
    toast.error("Failed to cancel booking.", { className: "notification" });
  }
};

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <li key={booking.id} className="booking">
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
                ${booking.totalPrice}
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
  );
};

export default Bookings;
