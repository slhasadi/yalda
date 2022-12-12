import moment from "jalali-moment";

export const getDate = (
  day: "today" | "yesterday" | "tomorow" | any,
  locale: "fa" | "en" = "fa",
  format = "YYYY-MM-DD"
) => {
  if (day === "today") {
    return moment().locale(locale).format(format);
  }
  if (day === "yesterday") {
    return moment().subtract(1, "day").locale(locale).format(format);
  }
  if (day === "tomorow") {
    return moment().add(1, "day").locale(locale).format(format);
  } else {
    return moment(day).locale(locale).format(format);
  }
};
