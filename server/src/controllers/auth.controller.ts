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
import * as argon2 from "argon2";

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
    password,
    fullname,
    position,
  }: {
    email_id: string;
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
        sql`INSERT INTO users(email_id,password,fullname,position,joining_date) VALUES(${email_id},${passwordHash},${fullname},${position},${today})`
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

    // checking if a user exists with the email id.
    (await psqlDb).connect(async (connection) => {
      const data = await connection.query(
        sql`SELECT * FROM users WHERE email_id=${email_id}`
      );
      user = data;

      // if the db does not return any user, or there is something wrong with the result, the beloe code is excecuted.
      if (!user) {
        res.status(404).send("incorrect email id");
        throw Error("incorrect email id");
      }
      // if the result contain some data.
      // but the resulted object does not contain any row, ie, there is no user matching the email id provided by the user.
      // an error message with 404 is sent as the response that the user does not exist
      if ((user.rowCount as number) < 1) {
        res.status(404).send("user does not exist");
        return;
      }

      // checking if the password submitted by the user is same as the one stored in the db.
      // password is verified against the hash stored in the db by using the verify function provided by the argon2 library
      if (await argon2.verify(user.rows[0].password as string, password)) {
        // generating the jwt for signed in user.
        // uuid of the user is taken from the db.
        // then, the encoded jwt is generated.
        const token = jwt.sign({ uuid: user.rows[0].unique_id }, jwtSecret);

        // setting the generated jwt (encoded uuid of the user) to the cookies. this token is used to verify any user is logged in or not.
        // max age is 24 hrs
        // httpOnly, secures the cookie by not exposing it to the client
        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.status(202).send("successfully logged in");
      } else {
        // if the varification returns false, ie, entered password is wrong
        res.status(404).send("wrong password");
      }
    });
  } catch (error) {}
}

function signOut(req: Request, res: Response) {
  if (req.cookies.jwt) {
    // removing jwt cookie
    res.clearCookie("jwt");

    // removing current user from the app.local object, which was set using the auth middleware
    req.app.locals.user = "";

    res.send(205);
  }

  res.end();
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

export { signUp, signIn, signOut, authData, getUsers, loginData };
