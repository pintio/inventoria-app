import express, { Request, Response } from "express";

// db
import pool from "../db";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    (await pool).connect(async (connection) => {
      console.log((await pool).getPoolState());
    });
  } catch (error) {}
});

module.exports = router;
