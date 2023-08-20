// db.ts
import Dexie, { Table } from "dexie";
import { Dataset, FhirPathAlias } from "../datasets/lib/types";
import { DashboardCard } from "../datasets/[datasetId]/dashboard/lib/types";
import { CSVExportColumns } from "../datasets/[datasetId]/export/lib/types";

export class MySubClassedDexie extends Dexie {
  datasets!: Table<Dataset, string>;
  dashboardCards!: Table<DashboardCard, string>;
  csvExportColumns!: Table<CSVExportColumns, string>;

  constructor() {
    super("vhipple-db");
    this.version(1).stores({
      datasets: "id",
      dashboardCards: "id",
      csvExportColumns: "id",
    });
  }
}

export const db = new MySubClassedDexie();
