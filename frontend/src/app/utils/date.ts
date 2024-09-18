export const timestampToDate = (timestamp: any) => {
  const milliseconds = timestamp * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleString();
};

export const getConvertedDate = (date: any) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};
export const getFormatedDate = (date: any) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export const getEventFormattedDate = (date: any) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log({ date, type: typeof date });
  const convertedDate = new Date(date);
  return `${convertedDate.getDate()} ${monthNames[convertedDate.getMonth()]} `;
};
