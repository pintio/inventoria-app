import express from "express";

const router = express.Router();

import {
  signUp,
  signIn,
  authData,
  getUsers,
  loginData,
} from "../controllers/auth.controller";

router.get("/authdata", authData);

router.get("/logindata", loginData);

router.get("/users", getUsers);

router.post("/signup", signUp);

router.post("/signin", signIn);

// for debugging
router.post("/bruh", async (req, res) => {
  res.send(req.body);
  console.log("lol13213213");
});

// // checking if the user has completed its profile or not.
// // currently logged in user is passed to this function, function checks if the user's uuid exist in the user table or not.
// async function isProfileComplete(
//   user: User | null,
//   res: Response
// ): Promise<{ isCompleted: Boolean; error: PostgrestError | null }> {
//   try {
//     let { data: users, error } = await psqlDb
//       .from("users")
//       .select("*")
//       .eq("uid", user?.id);

//     if (error) {
//       res.sendStatus(401);
//       console.log(error, "error while redirect");
//       return { isCompleted: false, error: error };
//     } else {
//       switch (users) {
//         case null:
//           return { isCompleted: false, error: error };

//         default:
//           return { isCompleted: true, error: error };
//       }
//     }
//   } catch (error) {
//     console.log(error, "error while fetching account info");
//     return { isCompleted: false, error: error as PostgrestError };
//   }
// }

// router.get("/api/auth/logout", async (req, res) => {
//   let { error } = await psqlDb.auth.signOut();
//   if (error) console.log(error, "error while signing out");
//   else {
//     res.send("success");
//   }
// });

module.exports = router;
