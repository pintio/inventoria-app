import { Request, Response } from "express";
import { sql, ValueExpression } from "slonik";

// db pool
import psqlDb from "../db";

//data and Types
import { suppliers } from "../api/dbschema";
import { ColumnName, ForeignKey, TableData } from "../api/types/table";
import { setWorkspaceSessionVariable } from "../utils/setSessionVariable";

async function getSuppliersData(req: Request, res: Response): Promise<void> {
  try {
    (await psqlDb).connect(async (connection) => {
      // setting session variable on the db server for the current connection to let the db know the workspace id for the current user, which is then used to get the values from the tables which are RLS protected
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const columnData = await connection.query(
        sql<queries.Column>`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'suppliers';`
      );
      let tableData: TableData = {
        columns: columnData.rows as unknown as ColumnName[],
        primary_key: suppliers.primaryKey,
        foreign_keys: suppliers.foreignKeys as unknown as ForeignKey,
      };

      res.status(203).send(tableData);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getAllSuppliers(req: Request, res: Response): Promise<void> {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const data = await connection.query(
        sql<queries.Supplier>`SELECT * FROM suppliers`
      );

      if (data) res.status(203).send(data);
      else res.sendStatus(404);
    });
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
}

// to get only one supplier matching the id
async function getSupplierById(req: Request<{ id: number }>, res: Response) {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const data = await connection.query(
        sql<queries.Supplier>`SELECT * FROM suppliers WHERE ID = ${req.params.id}`
      );

      if (data) res.status(203).send(data.rows);
      else res.sendStatus(404);
    });
  } catch (e) {
    res.status(404).send(e);
    console.log(e, "error while posting a fetching a row from suppliers table");
  }
}

async function postSupplier(
  req: Request<{ name: ValueExpression }>,
  res: Response
): Promise<void> {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const workspace_id = req.app.locals.user.workspace_id;

      await connection.query(
        sql`INSERT INTO suppliers(supplier_name, workspace_id) VALUES(${req.params.name}, ${workspace_id})`
      );
      res.sendStatus(203);
    });
  } catch (error) {
    res.status(404).send(error);
    console.log(error, "error while adding a new supplier");
  }
}

async function deleteSupplier(
  req: Request<{ id: ValueExpression }>,
  res: Response
) {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      await connection.query(
        sql`DELETE FROM suppliers WHERE id = ${req.params.id}`
      );
      res.sendStatus(204);
    });
  } catch (error) {
    res.status(404).send(error);
    console.log(error, "error while deleting a supplier");
  }
}

export {
  getSuppliersData,
  getAllSuppliers,
  getSupplierById,
  postSupplier,
  deleteSupplier,
};



export declare namespace queries {
    // Generated by @slonik/typegen

    /** - query: `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'suppliers';` */
    export interface Column {

        /** regtype: `name` */
        column_name: (string) | null;

        /** regtype: `character varying` */
        data_type: (string) | null;
    }

    /**
    * queries:
    * - `SELECT * FROM suppliers`
    * - `SELECT * FROM suppliers WHERE ID = $1`
    */
    export interface Supplier {

        /** regtype: `integer` */
        id: (number) | null;

        /** regtype: `text` */
        supplier_name: (string) | null;

        /** regtype: `uuid` */
        workspace_id: (string) | null;
    }
}
