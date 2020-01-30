const dates = {
  2019: {
    12: [28, 29, 30]
  },
  2020: {
    1: [2, 6, 9],
    2: [2, 4, 5, 6]
  }
};

const format = value => (value <= 9 ? `0${value}` : value);

const prepareDates = dates => {
  const strings = [];
  Object.entries(dates).map(([year, monthWitDays]) => {
    Object.entries(monthWitDays).map(([month, days]) => {
      days.map(day => {
        console.log(`${year}.${format(month)}.${format(day)}`);
      });
    });
  });

  return strings;
};

prepareDates(dates);

// const formatedDates = prepareDates(dates);

// console.log(formatedDates);
