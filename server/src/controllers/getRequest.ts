import { Request, Response } from "express";

import { sql, ValueExpression } from "slonik";
import psqlDb from "../db";
import { setWorkspaceSessionVariable } from "../utils/setSessionVariable";

async function getAll(req: Request, res: Response, tableName: string) {
  try {
    (await psqlDb).connect(async (connection) => {
      // setting session variable on the db server for the current connection to let the db know the workspace id for the current user, which is then used to get the values from the tables which are RLS protected
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const tableRows = await connection.query(
        sql<queries.Category>`SELECT * FROM ${tableName}`
      );
      res.status(203).send(tableRows.rows);
    });
  } catch (e) {
    res.status(404).send(e);
    console.log(
      e,
      `error while posting a fetching all rows from ${tableName} table`
    );
  }
}

// to get only one row matching the id
function getOneById(
  tableName: string,
  req: Request<{ id: number }>,
  res: Response
) {
  return async function () {
    try {
      (await psqlDb).connect(async (connection) => {
        const data = await connection.query(
          sql`SELECT * FROM ${tableName} WHERE ID = ${req.params.id}`
        );

        if (data) res.status(203).send(data.rows);
        else res.sendStatus(404);
      });
    } catch (e) {
      res.status(404).send(e);
      console.log(
        e,
        `error while posting a fetching a row from ${tableName} table`
      );
    }
  };
}

export { getAll, getOneById };

export declare namespace queries {
  // Generated by @slonik/typegen

  /** - query: `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'categories';` */
  export interface Column {
    /** column: `information_schema.columns.column_name`, regtype: `name` */
    column_name: string | null;

    /** column: `information_schema.columns.data_type`, regtype: `character varying` */
    data_type: string | null;
  }

  /** - query: `SELECT * FROM categories` */
  export interface Category {
    /** column: `public.categories.id`, not null: `true`, regtype: `integer` */
    id: number;

    /** column: `public.categories.category_name`, regtype: `text` */
    category_name: string | null;
  }
}