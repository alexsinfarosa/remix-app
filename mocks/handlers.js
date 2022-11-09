const { rest } = require("msw");

const handlers = [
  rest.get("https://newa.rcc-acis.workers.dev/v0/stations", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          extraelems: "",
          srqual: false,
          affiliationUrl: "https://www.oardc.ohio-state.edu/weather1/",
          elems: {
            wdir: 27,
            srad: 132,
            rhum: 24,
            wspd: 28,
            temp: 23,
          },
          activeStatus: true,
          affiliation: "The Ohio State University CFAES Weather System",
          lat: 41.4517,
          isIcao: false,
          id: "avon oardc",
          name: "Avon",
          startYear: 2017,
          lon: -82.0356,
          state: "OH",
          elev: 670,
        },
        {
          extraelems: [
            {
              vX: 120,
              name: "tmps",
              vN: 68,
            },
          ],
          srqual: true,
          affiliationUrl: "https://www.oardc.ohio-state.edu/weather1/",
          elems: {
            srad: 132,
            lwet: 118,
            temp: 23,
            wdir: 27,
            wspd: 28,
            rhum: 24,
            prcp: 5,
          },
          activeStatus: true,
          affiliation: "The Ohio State University CFAES Weather System",
          lat: 39.8633,
          isIcao: false,
          id: "west oardc",
          name: "South Charleston (Western ARS)",
          startYear: 2009,
          lon: -83.6721,
          state: "OH",
          elev: 1124,
        },
      ])
    );
  }),
];

module.exports = handlers;
