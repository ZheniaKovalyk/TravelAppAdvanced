import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTripByIdQuery } from "../redux/api/tripAPI";

const Trip = () => {
  const { id } = useParams();
  const { data: trip, isLoading, error } = useGetTripByIdQuery(id!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState({ date: "", guests: "" });

  if (isLoading) return <div>Loading...</div>;
  if (error || !trip) return <h2>Trip not found</h2>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const validateForm = () => {
    const newErrors = { date: "", guests: "" };
    const selectedDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (!date) {
      newErrors.date = "Date is required";
    } else if (selectedDate < tomorrow) {
      newErrors.date = "Date must be at least tomorrow";
    }

    if (!guests || guests < 1 || guests > 10) {
      newErrors.guests = "Guests must be from 1 to 10";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const booking = {
      id: Date.now(),
      tripId: trip?.id,
      title: trip?.title,
      date,
      guests,
      price: trip?.price! * guests,
      image: trip?.image,
    };
    navigate("/bookings", { state: { newBooking: booking } });
  };

  return (
    <>
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        <div className="trip">
          <img
            data-test-id="trip-details-image"
            src={trip.image}
            className="trip__img"
            alt="trip photo"
          />
          <div className="trip__content">
            <div className="trip-info">
              <h3
                data-test-id="trip-details-title"
                className="trip-info__title"
              >
                {trip.title}
              </h3>
              <div className="trip-info__content">
                <span
                  data-test-id="trip-details-duration"
                  className="trip-info__duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                <span
                  data-test-id="trip-details-level"
                  className="trip-info__level"
                >
                  {trip.level}
                </span>
              </div>
            </div>
            <div
              data-test-id="trip-details-description"
              className="trip__description"
            >
              {trip.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong
                data-test-id="trip-details-price-value"
                className="trip-price__value"
              >
                ${trip.price}
              </strong>
            </div>
            <button
              data-test-id="trip-details-button"
              className="trip__button button"
              onClick={openModal}
            >
              Book a trip
            </button>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div className="modal">
          <div data-test-id="book-trip-popup" className="book-trip-popup">
            <button
              data-test-id="book-trip-popup-close"
              className="book-trip-popup__close"
              onClick={closeModal}
            >
              ×
            </button>
            <form
              className="book-trip-popup__form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="trip-info">
                <h3
                  data-test-id="book-trip-popup-title"
                  className="trip-info__title"
                >
                  {trip.title}
                </h3>
                <div className="trip-info__content">
                  <span
                    data-test-id="book-trip-popup-duration"
                    className="trip-info__duration"
                  >
                    <strong>{trip.duration}</strong> days
                  </span>
                  <span
                    data-test-id="book-trip-popup-level"
                    className="trip-info__level"
                  >
                    {trip.level}
                  </span>
                </div>
              </div>
              <label className="input">
                <span className="input__heading">Date</span>
                <input
                  data-test-id="book-trip-popup-date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                {errors.date && <p className="error">{errors.date}</p>}
              </label>
              <label className="input">
                <span className="input__heading">Number of guests</span>
                <input
                  data-test-id="book-trip-popup-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  required
                />
                {errors.guests && <p className="error">{errors.guests}</p>}
              </label>
              <span className="book-trip-popup__total">
                Total:
                <output
                  data-test-id="book-trip-popup-total-value"
                  className="book-trip-popup__total-value"
                >
                  ${trip.price * guests}
                </output>
              </span>
              <button
                data-test-id="book-trip-popup-submit"
                className="button"
                type="submit"
              >
                Book a trip
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Trip;
