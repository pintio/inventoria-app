import express, { Request, Response } from "express";
import { sql, ValueExpression } from "slonik";

// database pool
import psqlDb from "../db";

import { setWorkspaceSessionVariable } from "../utils/setSessionVariable";

// column names
import { categories } from "../api/dbschema";
import { ColumnName, ForeignKey, TableData } from "../api/types/table";

// to get column names and types
async function categoriesData(req: Request, res: Response) {
  try {
    (await psqlDb).connect(async (connection) => {
      // setting session variable on the db server for the current connection to let the db know the workspace id for the current user, which is then used to get the values from the tables which are RLS protected
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const columnData = await connection.query(
        sql<queries.Column>`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'categories';`
      );

      let tableData: TableData = {
        columns: columnData.rows as unknown as ColumnName[],
        primary_key: categories.primaryKey,
        foreign_keys: categories.foreignKeys as unknown as ForeignKey,
      };

      res.status(203).send(tableData);
    });
  } catch (e) {
    res.status(404).send(e);
    console.log(e, "error while fetching categoriesdata");
  }
}

// to get only one category matching the id
async function getCategoryById(req: Request<{ id: number }>, res: Response) {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const data = await connection.query(
        sql`SELECT * FROM catagories WHERE ID = ${req.params.id}`
      );

      if (data) res.status(203).send(data.rows);
      else res.sendStatus(404);
    });
  } catch (e) {
    res.status(404).send(e);
    console.log(
      e,
      "error while posting a fetching a row from categories table"
    );
  }
}

// to get all categories
async function getAllCategories(req: Request, res: Response) {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const categories = await connection.query(
        sql<queries.Category>`SELECT * FROM categories`
      );
      res.status(203).send(categories);
    });
  } catch (e) {
    res.status(404).send(e);
    console.log(
      e,
      "error while posting a fetching all rows from categories table"
    );
  }
}

// Adding new category
async function postCategory(
  req: Request<{ name: ValueExpression }>,
  res: Response
) {
  try {
    (await psqlDb).connect(async (connection) => {
      await setWorkspaceSessionVariable(
        connection,
        req.app.locals.user.workspace_id
      );

      const workspace_id = req.app.locals.user.workspace_id;

      await connection.query(
        sql`INSERT INTO categories(category_name, workspace_id) VALUES(${req.params.name}, ${workspace_id})`
      );
    });

    res.status(204).send();
  } catch (e) {
    res.status(404).send(e);
    console.log(e, "error while posting a new category");
  }
}

// Deleting a category
async function deleteCategory(
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
        sql`DELETE FROM categories WHERE id = ${req.params.id}`
      );
    });

    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
}

export {
  categoriesData,
  getAllCategories,
  getCategoryById,
  postCategory,
  deleteCategory,
};

export declare namespace queries {
  // Generated by @slonik/typegen

  /** - query: `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'categories';` */
  export interface Column {
    /** regtype: `name` */
    column_name: string | null;

    /** regtype: `character varying` */
    data_type: string | null;
  }

  /** - query: `SELECT * FROM categories` */
  export interface Category {
    /** regtype: `integer` */
    id: number | null;

    /** regtype: `text` */
    category_name: string | null;

    /** regtype: `uuid` */
    workspace_id: string | null;
  }
}
