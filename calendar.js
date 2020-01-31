const myCalendar = jsCalendar.new("#calendar", "now", {
  navigatorPosition: "right",
  monthFormat: "month YYYY",
  dayFormat: "DDD",
  firstDayOfTheWeek: "2",
  language: "ru"
});

const format = value => (value <= 9 ? `0${value}` : value);

const prepareDates = dates => {
  const strings = [];
  Object.entries(dates).map(([year, monthWitDays]) => {
    return Object.entries(monthWitDays).map(([month, days]) => {
      return days.map(day => {
        strings.push(`${format(day)}/${format(month)}/${year}`);
      });
    });
  });

  return strings;
};

myCalendar.select(prepareDates(dates));
