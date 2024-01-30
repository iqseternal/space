import { print, printError, printInfo } from '@suey/printer';
import type { IndexedDbDatabase, IndexedDBOptions, IndexedDBTransaction } from './declare';

export class IndexedDB<DatabasesConstruct> {
  #db: IndexedDbDatabase | undefined;

  public get db() { return this.#db as unknown as IndexedDbDatabase; }
  public set db(db: IndexedDbDatabase) { this.#db = db; }

  constructor(public readonly dbOptions: IndexedDBOptions<DatabasesConstruct>) {}

  connection(upgrade?: (db: IndexedDbDatabase) => void | Promise<void>) {
    return new Promise<void>((re, rj) => {
      const request = window.indexedDB.open(this.dbOptions.dbName, this.dbOptions.dbVersion);

      const resolve = () => { this.db = request.result;re(); }
      const reject = () => { this.db = request.result;rj(); }

      request.onerror = () => reject();
      request.onupgradeneeded = async e => {
        upgrade && await upgrade(request.result);

      };

      request.onsuccess = () => resolve();
    });
  }

  transition<
    Name extends Exclude<keyof DatabasesConstruct, number | symbol>,
    TableConstruct extends DatabasesConstruct[Name],
    Args extends Parameters<IndexedDbDatabase['transaction']>
  >(storeNames: Name | Name[], mode?: Args[1], options?: Args[2]): IndexedDBTransaction<Name, TableConstruct> {
    return this.db.transaction(storeNames, mode, options);
  }
}
