const sush = new SUSH({
  mode: 'lower',
});

const sheetUrl =
  'https://docs.google.com/spreadsheets/d/1RyoXWAqO4MQykn2NHNvBKgmofikO_1r9ErE4KUc0TCA/edit#gid=748715091';

sush.flow([
  SUSH.$trimId({
    head: 1,
  }),
  SUSH.$spreadsheet({
    sheetUrl,
  }),
  SUSH.$addObject({
    '': '/about/',
  }),
  SUSH.$googleAnalytics({
    analyticsId: 'UA-74328816-1',
  }),
  SUSH.$redirect({
    fallback: '/404/',
  }),
])
.catch((err) => {
  alert(err.message);
  console.error(err);
});
