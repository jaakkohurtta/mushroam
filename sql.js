export const CREATE_TABLE =
  "CREATE TABLE if not EXISTS roams (id integer primary key not null, date text, latitude int, longitude int, title text, type text, haul int, notes text, rainfall int, avgtemp int);";
export const SELECT_ALL = "SELECT * FROM roams;";
