import express, { NextFunction, query, Request, Response } from "express";
import { sql } from "slonik";
import jwt from "jsonwebtoken";

import psqlDb from "../db";

const jwtSecret = process.env.TOKEN_SECRET as string;

// to check if the any user is logged in or not.
// if the user has logged in; i.e. has a valid jwt, they will be able to process further.
// else, they will be redirected to the login page.
// this middleware should be applied to the routes which are to be protected, the ones the user need to be logged in to access.
// most of the app routes (/app/*) is going to use this middleware.

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.jwt;

  if (token && jwtSecret) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err, "noice");
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    console.log("wrong token");
    res.redirect("/login");
  }
}

// checking if there is any loggedin user exists

function checkCurrentUser(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      const userData = decodedToken as unknown as { uuid: string };

      if (err) {
        console.log(err, "jdhfkdsjhf");
        res.redirect("/login");
      } else {
        try {
          (await psqlDb).connect(async (connection) => {
            // console.log("before checking user  noice");
            const user = await connection.query(
              sql`SELECT fullname, position, joining_date, email_id, workspace_id FROM users WHERE unique_id=${userData.uuid};`
            );
            if (user) {
              const noice = { ...req.app.locals };
              noice.user = user.rows[0];
              req.app.locals = noice;

              next();
            } else {
              throw new Error("user not found");
            }
          });
        } catch (error) {
          console.log(error, "error while getting the current user");
        }

        // next();
      }
    });
  } else {
    console.log("wrong token");
    res.redirect("/login");
  }
}

export { requireAuth, checkCurrentUser };
