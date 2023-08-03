// db.ts
import Dexie, { Table } from "dexie";

import { Dataset } from "../lib/types";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  datasets!: Table<Dataset, string>;

  constructor() {
    super("whipple-db");
    this.version(1).stores({
      datasets: "name",
    });
  }
}

export const db = new MySubClassedDexie();
