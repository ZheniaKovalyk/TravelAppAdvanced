import type { RootState } from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Trip {
  id: string;
  title: string;
  description: string;
  level: "easy" | "moderate" | "difficult";
  duration: number;
  price: number;
  image: string;
  createdAt: string;
}

export interface TripsResponse {
  trips: Trip[] | undefined;
}

export interface BookRequest {
  tripId: string;
  guests: number;
  date: string;
}

export interface BookedTrip {
  tripId: string;
  userId: string;
  guests: number;
  totalPrice: number;
  date: string;
  createdAt: string;
  trip: Trip;
}

export interface BookedResponse {
  bookedTrips: BookedTrip[];
}

export interface GetTripsRequest {}

export const tripAPI = createApi({
  reducerPath: "tripAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://travel-app-api.up.railway.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Trips", "BookedTrips"],
  endpoints: (builder) => ({
    getTrips: builder.query<TripsResponse, void>({
      query() {
        return {
          url: "trips",
          method: "GET",
        };
      },
      providesTags: ["Trips"],
    }),
    getTripById: builder.query<Trip, string>({
      query(id) {
        return {
          url: `trips/${id}`,
          method: "GET",
        };
      },
    }),
    getBookedTrips: builder.query<BookedResponse, void>({
      query() {
        return {
          url: `bookings`,
          method: "GET",
        };
      },
      providesTags: ["BookedTrips"],
    }),
    bookTrip: builder.mutation<BookedTrip, BookRequest>({
      query(data) {
        return {
          url: "bookings",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["BookedTrips"],
    }),
    cancelTrip: builder.mutation<BookedTrip, string>({
      query(id) {
        return {
          url: `bookings/${id}`,
          method: "DELETE",
        };
      },
       invalidatesTags: ["BookedTrips"],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripByIdQuery,
  useGetBookedTripsQuery,
  useBookTripMutation,
  useCancelTripMutation,
} = tripAPI;
