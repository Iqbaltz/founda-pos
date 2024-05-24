const isLoggedIn = async () => {};

export const Utils = {};

export const formatCurrency = (value: number) => {
  return `Rp. ${value.toLocaleString("id-ID")},-`;
};

export const formatBoolean = (value: boolean) => {
  if (value) return "Ya";
  return "Tidak";
};

export const changeDateTimeToNow = (value: Date) => {
  const originalDate = new Date(value);
  const currentDate = new Date(); // Current date and time

  // Extract date part from the original date
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth();
  const date = originalDate.getDate();

  // Create a new Date object with the same date part and current time
  const newDate = new Date(
    year,
    month,
    date,
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  );

  // Convert the new date to ISO string format
  const formattedDate = newDate.toISOString().slice(0, 19).replace("T", " ");
  return new Date(formattedDate);
};

export const formatDate = (value: Date) => {
  const date = new Date(value);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const newDate = date.toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions
  );
  return newDate;
};
