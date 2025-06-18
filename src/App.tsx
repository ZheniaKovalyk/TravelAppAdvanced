import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Layout from "./layout";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Bookings from "./pages/Bookings";
import Trip from "./pages/Trip";
import ProtectedRoute from "./layout/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    const notify = () => {
      toast.info("Welcome to the Travel App! Explore your next adventure.");
    };
    notify();
  }, []);

  return (
    <>
      <ToastContainer toastClassName="notification" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route
            path="bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="trip/:id"
            element={
              <ProtectedRoute>
                <Trip />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
