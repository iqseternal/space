import { IndexedDB } from '@libs/indexedDB';
import type { TablesType } from '#constants/indexDB';
import { DATABASES_META2D, TABLES } from '#constants/indexDB';

let indexedDB: IndexedDB<TablesType> | undefined = void 0;

export async function setupIndexedDB() {
  if (indexedDB) return Promise.resolve(indexedDB);

  indexedDB = new IndexedDB<TablesType>({
    dbName: DATABASES_META2D.DATABASES_NAME,
    dbVersion: DATABASES_META2D.DATABASES_VERSION
  });

  return new Promise<IndexedDB<TablesType>>((resolve, reject) => {
    if (!indexedDB) return reject(null);

    indexedDB.connection((db) => {
      const documentStore = db.createObjectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, {
        keyPath: TABLES.TABLE_DOCUMENT.META_2D_DOC_NAME
      });

      documentStore.createIndex(TABLES.TABLE_DOCUMENT.CREAT_AT, TABLES.TABLE_DOCUMENT.CREAT_AT, { unique: false });
      documentStore.createIndex(TABLES.TABLE_DOCUMENT.EDIT_AT, TABLES.TABLE_DOCUMENT.EDIT_AT, { unique: false });
      documentStore.createIndex(TABLES.TABLE_DOCUMENT.META_2D_DOC_NAME, TABLES.TABLE_DOCUMENT.META_2D_DOC_NAME, { unique: false });
      documentStore.createIndex(TABLES.TABLE_DOCUMENT.META_2D_DATA, TABLES.TABLE_DOCUMENT.META_2D_DATA, { unique: false });
    })
      .then(() => resolve(indexedDB as IndexedDB<TablesType>))
      .catch(() => reject(null))
  })
}
