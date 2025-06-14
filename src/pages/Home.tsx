import {Link } from 'react-router-dom';
import trips from '../assets/data/trips.json';
import { useState } from 'react';



const Home = () => {
const [searchTerm, setSearchTerm] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');

 const filteredTrips = trips.filter((trip) =>{
    const matchesTitle = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) 

    const matchesDuration =
      duration === '' ||
      (duration === '0_x_5' && trip.duration <= 5) ||
      (duration === '5_x_10' && trip.duration > 5 && trip.duration <= 10) ||
      (duration === '10' && trip.duration > 10);

    const matchesLevel = level === '' || trip.level === level;

    return matchesTitle && matchesDuration && matchesLevel;
});

return (
  <>
        <main>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form className="trips-filter__form" autoComplete="off">
          <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input
              data-test-id="filter-search"
              name="search"
              type="search"
              placeholder="search by title"
               onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select data-test-id="filter-duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10">&ge; 10 days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select data-test-id="filter-level" name="level" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">level</option>
              <option value="easy">easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </select>
          </label>
        </form>
      </section>
      <section className="trips">
        <h2 className="visually-hidden">Trips List</h2>
        <ul className="trip-list">
          {filteredTrips.map((trip) => (
            <li key={trip.id} data-test-id="trip-card" className="trip-card">
              <img
                data-test-id="trip-card-image"
                src={trip.image}
                alt="trip photo"
              />
              <div className="trip-card__content">
                <div className="trip-info">
                  <h3 data-test-id="trip-card-title" className="trip-info__title">
                    {trip.title}
                  </h3>
                  <div className="trip-info__content">
                    <span
                      data-test-id="trip-card-duration"
                      className="trip-info__duration"
                    >
                      <strong>{trip.duration}</strong> days
                    </span>
                    <span data-test-id="trip-card-level" className="trip-info__level">
                      {trip.level}
                    </span>
                  </div>
                </div>
                <div className="trip-price">
                  <span>Price</span>
                  <strong
                    data-test-id="trip-card-price-value"
                    className="trip-price__value"
                  >
                    ${trip.price}
                  </strong>
                </div>
              </div>
              <Link data-test-id="trip-card-link" className="button" to={`/trip/${trip.id}`}>
                Discover a trip
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  </>
);
};
export default Home;
