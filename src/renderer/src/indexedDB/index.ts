import { IndexedDB } from '@libs/indexedDB';
import type { TablesType } from '#constants/indexDB';
import { DATABASES_META2D, TABLES } from '#constants/indexDB';

let indexedDB: IndexedDB<TablesType> | undefined = void 0;

export async function setupIndexDB() {
  if (indexedDB) return indexedDB;

  indexedDB = new IndexedDB<TablesType>({
    dbName: DATABASES_META2D.DATABASES_NAME,
    dbVersion: DATABASES_META2D.DATABASES_VERSION
  });

  await indexedDB.connection((db) => {
    const documentStore = db.createObjectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, {
      keyPath: TABLES.TABLE_DOCUMENT.GENERATOR_KEY
    });

    documentStore.createIndex(TABLES.TABLE_DOCUMENT.CREAT_AT, TABLES.TABLE_DOCUMENT.CREAT_AT, { unique: false });
    documentStore.createIndex(TABLES.TABLE_DOCUMENT.EDIT_AT, TABLES.TABLE_DOCUMENT.EDIT_AT, { unique: false });
    documentStore.createIndex(TABLES.TABLE_DOCUMENT.META_2D_DATA, TABLES.TABLE_DOCUMENT.META_2D_DATA, { unique: false });
  });

  return indexedDB;
}
