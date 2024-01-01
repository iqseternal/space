

const database = window.indexedDB.open('asds', 1);

database.onerror = (evt) => {

}

database.onsuccess = (evt) => {

  const db = database.result;


}

export interface IndexDbOptions {
  dbName: string;
  dbVersion: number;
}

export async function setupIndexDb(options: IndexDbOptions) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(options.dbName, options.dbVersion);

    request.onsuccess = (evt) => {
      resolve(request.result);
    }

    request.onerror = (evt) => {
      reject(null);
    }
  })
}
