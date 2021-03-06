import { CREATE_TABLE, DROP_TABLE, SELECT_ALL, DELETE_BY_ID, INSERT_INTO_ROAMS } from "../sql";

const init = async (database) => {
  return new Promise((resolve) => {
    database.transaction(
      (tx) => {
        tx.executeSql(CREATE_TABLE);
      },
      null,
      async () => {
        const result = await dbService.selectAll(database);
        resolve(result);
      }
    );
  });
};

const dropTable = (database) => {
  database.transaction(
    (tx) => {
      tx.executeSql(DROP_TABLE);
    },
    null,
    console.log("Table dropped.")
  );
};

const selectAll = async (database) => {
  return new Promise((resolve) => {
    database.transaction((tx) => {
      tx.executeSql(SELECT_ALL, [], (_, { rows }) => {
        let result = rows._array;
        resolve(result);
      });
    });
  });
};

const insertInto = async (database, roam) => {
  const {
    title,
    timestamp,
    date,
    mushroom,
    haul,
    vibes,
    latitude,
    longitude,
    image,
    rainfall,
    avgtemp,
    clouds,
    colorid,
  } = roam;

  return new Promise((resolve) => {
    database.transaction(
      (tx) => {
        tx.executeSql(INSERT_INTO_ROAMS, [
          title,
          timestamp,
          date,
          mushroom,
          haul,
          vibes,
          latitude,
          longitude,
          image,
          rainfall,
          avgtemp,
          clouds,
          colorid,
        ]);
      },
      null,
      async () => {
        const result = await dbService.selectAll(database);
        resolve(result);
      }
    );
  });
};

const deleteById = async (database, id) => {
  return new Promise((resolve) => {
    database.transaction(
      (tx) => {
        tx.executeSql(DELETE_BY_ID, [id]);
      },
      null,
      async () => {
        const result = await selectAll(database);
        resolve(result);
      }
    );
  });
};

const dbService = {
  init,
  dropTable,
  selectAll,
  insertInto,
  deleteById,
};

export default dbService;
