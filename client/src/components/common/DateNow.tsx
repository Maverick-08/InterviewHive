const getOrdinal = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const today = new Date();
const day = today.getDate();
const month = today.toLocaleString("default", { month: "long" });
const year = today.getFullYear();
const ordinal = getOrdinal(day);

const DateNow = () => {
  return <div className="text-[8px] sm:text-[16px]">
    <span>{` ${month} ${day}${ordinal}, ${year}`}</span>
  </div>;
};

export default DateNow;
