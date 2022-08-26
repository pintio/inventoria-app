import {
  Categories,
  Warehouses,
  Materials,
  Users,
  Suppliers,
} from "../dbschema";

export interface ColumnName {
  column_name: string;
  data_type: string;
}

export interface ForeignKey {
  [key: string]: {
    table: string;
    column: string;
  };
}

export interface TableData {
  columns: ColumnName[];
  primary_key: string;
  foreign_keys: ForeignKey;
}

export interface QueryResult {
  command: string;
  fields: {
    dataTypeId: number;
    name: string;
  }[];
  notices: unknown[];
  rowCount: number;
  rows: Categories[] | Warehouses[] | Materials[] | Users[] | Suppliers[];
}

export interface Error {
  errorMessage: string;
  table: string;
}
