const PORT = 3000;
const SERVER_MSG = "player server";
const SUCESSFUL = 200;
const NOT_FOUND = 404;
const FORBIDEEN = 403;
const CRASH = 503;
const SUCESSFUL_MSG = "sucessful";
const NOT_FOUND_MSG = "not found";
const FORBIDEEN_MSG = "request forbidden";
const CRASH_MSG = "unexpected issue";
const print = (show) => console.log(show);

export {
  PORT,
  SERVER_MSG,
  SUCESSFUL,
  NOT_FOUND,
  FORBIDEEN,
  CRASH,
  SUCESSFUL_MSG,
  NOT_FOUND_MSG,
  FORBIDEEN_MSG,
  CRASH_MSG,
  print,
};
