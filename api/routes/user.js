import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userCtrl.js";
import { verifyAdmin, verifyToken, verifyUser } from "../../Utils/verifyToken.js";
const router = express.Router();

// /// check Token authentication

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user You are logged in Sucessfully");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user You are logged in and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin You are logged in and you can delete all account");
// });
// Update
router.put("/:id",verifyUser, updateUser);

// Delete
router.delete("/:id",verifyUser, deleteUser);

// get
router.get("/:id",verifyUser, getUser);

// get all
router.get("/",verifyAdmin, getUsers);

export default router;
