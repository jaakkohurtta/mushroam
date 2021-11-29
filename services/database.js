import { CREATE_TABLE, SELECT_ALL, DELETE_BY_ID } from "../sql";

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
  selectAll,
  deleteById,
};

export default dbService;
