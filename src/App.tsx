import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import Bookings from './pages/Bookings';
import Trip from './pages/Trip';
import ProtectedRoute from './layout/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="/trip/:id" element={<Trip />} />
      </Route>
    </Routes>
  );
};

export default App;
