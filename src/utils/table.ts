import {BookedTableDetails, SplitTableDetails} from "@src/models";

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
