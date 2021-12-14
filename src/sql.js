export const CREATE_TABLE =
  "CREATE TABLE if not EXISTS roams (id integer primary key not null, timestamp int, date text, latitude int, longitude int, title text, mushroom text, haul int, vibes text, image text, rainfall int, avgtemp int, clouds int, colorid text);";
export const DROP_TABLE = "DROP TABLE roams;";
export const SELECT_ALL = "SELECT * FROM roams ORDER BY timestamp DESC;";
export const DELETE_BY_ID = "DELETE FROM roams WHERE id = ?;";
export const INSERT_INTO_ROAMS =
  "INSERT INTO roams (title, timestamp, date, mushroom, haul, vibes, latitude, longitude, image, rainfall, avgtemp, clouds, colorid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
