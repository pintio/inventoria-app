import { Request, Response } from "express";
import { QueryResult, QueryResultRow, sql } from "slonik";

import { getCurrentDate } from "../utils/date";

// psql db pool
import psqlDb from "../db";

// interfaces
import { ColumnName, ForeignKey, TableData } from "../api/types/table";

// data
import { users } from "../api/dbschema";

// argon2
import { argon2i } from "argon2";
import { Connection } from "pg";
const argon2 = require("argon2");

// jwt for token generation
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_SECRET;

// ------------------//

// borken function, improve it
async function getUser(email: string): Promise<QueryResult<QueryResultRow>> {
  let data;
  try {
    (await psqlDb).connect(async (connection) => {
      data = await connection.query(
        sql`SELECT * FROM users WHERE email_id=${email}`
      );
      return data;
    });
    return data as unknown as QueryResult<QueryResultRow>;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function authData(req: Request, res: Response) {
  try {
    (await psqlDb).connect(async (connection) => {
      const columnData = await connection.query(
        sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';`
      );

      let tableData: TableData = {
        columns: columnData.rows as unknown as ColumnName[],
        primary_key: users.primaryKey,
        foreign_keys: users.foreignKeys as unknown as ForeignKey,
      };

      res.status(203).send(tableData);
    });
  } catch (e) {
    console.log(e);
  }
}

async function loginData(req: Request, res: Response) {
  const columnData: ColumnName[] = [
    { column_name: "email_id", data_type: "email" },
    { column_name: "password", data_type: "password" },
  ];

  let tableData: TableData = {
    columns: columnData as unknown as ColumnName[],
    primary_key: users.primaryKey,
    foreign_keys: users.foreignKeys as unknown as ForeignKey,
  };

  res.status(203).send(tableData);
}

async function signUp(req: Request, res: Response) {
  const {
    email_id,
    username,
    password,
    fullname,
    position,
  }: {
    email_id: string;
    username: string;
    password: string;
    fullname: string;
    position: string;
  } = req.body;

  let user;

  const today: string = getCurrentDate();

  try {
    (await psqlDb).connect(async (connection) => {
      const data = await connection.query(
        sql`SELECT * FROM users WHERE email_id=${email_id}`
      );
      user = data;

      if (!user) {
        res.status(404).send("error");
        return;
      }
      if ((user.rowCount as number) > 0) {
        res.status(203).send("user already exists");
        return;
      }
    });

    const passwordHash = await argon2.hash(password, { type: argon2i });

    (await psqlDb).connect(async (connection) => {
      await connection.query(
        sql`INSERT INTO users(email_id,username,password,fullname,position,joining_date) VALUES(${email_id},${username},${passwordHash},${fullname},${position},${today})`
      );

      // 201 -> created
      res.status(201).send("registration successfull");
    });
  } catch (error) {
    res.status(404).send(error);
  }

  //   if (!error) {
  //     console.log(user);
  //     res.json({ email: user?.email, uuid: user?.id });
  //     res.status(200);
  //     return;
  //     // res.redirect(200, `/profile-setup/${user?.email}/${user?.id}`);
  //     // since redirect is not possible after making POST request from AXIOS. redirect is done from the client side.
  //   } else {
  //     res.status(401);
  //     res.send(error);
  //   }
}

async function signIn(req: Request, res: Response) {
  let user;

  try {
    const { email_id, password }: { email_id: string; password: string } =
      req.body;

    (await psqlDb).connect(async (connection) => {
      const data = await connection.query(
        sql`SELECT * FROM users WHERE email_id=${email_id}`
      );
      user = data;

      if (!user) {
        res.status(404).send("incorrect email id");
        throw Error("incorrect email id");
      }
      if ((user.rowCount as number) < 1) {
        res.status(404).send("user does not exist");
        return;
      }

      if (argon2.verify(user.rows[0].password, password)) {
        const token = jwt.sign({ uuid: user.rows[0].unique_id }, jwtSecret);
        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.status(202).send("successfully logged in");
      } else {
        res.status(404).send("wrong password");
      }
    });

    // else {
    //   const { isCompleted, error } = await isProfileComplete(user, res);
    //   console.log(isCompleted, error, "lol");
    //   if (error) {
    //     console.log(error, "failed");
    //     return;
    //   }
    //   if (!isCompleted) {
    //     res.json({
    //       email: user?.email,
    //       uuid: user?.id,
    //       redirect: "/profile-setup",
    //     });
    //     // console.log(psqlDb.auth.user());
    //     res.status(200);
    //   } else {
    //     res.json({ redirect: "/app" });
    //     res.status(200);
    //   }
    // }
  } catch (error) {}
}

async function getUsers(req: Request, res: Response) {
  try {
    (await psqlDb).connect(async (Connection) => {
      const data = await Connection.query(sql`SELECT * FROM users`);
      if (data.rowCount > 0) {
        res.status(200).send(data.rows);
      } else res.status(200).send("no user exist");
    });
  } catch (error) {}
}

export { signUp, signIn, authData, getUsers, loginData };
