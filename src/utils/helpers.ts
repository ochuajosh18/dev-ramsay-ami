import _ from "lodash";
import moment from "moment";

// for table pagination
export const paginate = (
  items: any[],
  currentPage: number,
  pageSize: number
) => {
  const startIndex = currentPage * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

// for table sorting
export const sort = (items: any[], path: string, order: "asc" | "desc") =>
  _.orderBy(items, [path], [order]);

// for formatting datePosted (and dateExpired)
export const formatDatePosted = (datePosted: Date | null | string) => {
  return moment(datePosted).format("MMMM D, YYYY");
};

// for parsing material datepicker date
export const parseDate = (dateValue: Date | null | string) => {
  if (dateValue === null) return "";
  return moment(dateValue).format("YYYY-MM-DD HH:mm:ss.SSSZ");
};
