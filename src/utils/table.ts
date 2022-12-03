import {
  BookedTableDetails,
  BookingDetailsBooked,
  BookingDetailsSplit,
  SplitTableDetails,
} from "@src/models";

export function isSplitTableDetails(
  tableData: SplitTableDetails | BookedTableDetails,
): tableData is SplitTableDetails {
  return (
    "joined_users" in tableData &&
    "men_seat" in tableData &&
    "men_seat_price" in tableData &&
    "women_seat" in tableData &&
    "women_seat_price" in tableData
  );
}

export function isBookedTableDetails(
  tableData: SplitTableDetails | BookedTableDetails,
): tableData is BookedTableDetails {
  return "total_seat" in tableData && "price" in tableData;
}

export function isBookedBookingDetails(
  bookingDetails: BookingDetailsBooked | BookingDetailsSplit,
): bookingDetails is BookingDetailsBooked {
  return "Booked Guests" in bookingDetails;
}

export function isSplitBookingDetails(
  bookingDetails: BookingDetailsBooked | BookingDetailsSplit,
): bookingDetails is BookingDetailsSplit {
  return "Men Guests" in bookingDetails && "Women Guests" in bookingDetails;
}
