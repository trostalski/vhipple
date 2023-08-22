// db.ts
import Dexie, { Table } from "dexie";
import { Dataset } from "../datasets/lib/types";

export class MySubClassedDexie extends Dexie {
  datasets!: Table<Dataset, string>;

  constructor() {
    super("vhipple-db");
    this.version(1).stores({
      datasets: "id",
    });
  }
}

export const db = new MySubClassedDexie();
