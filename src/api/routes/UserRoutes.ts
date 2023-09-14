import express from "express";
import { getUsers, getOneUser, deleteUser , putUser , postUser } from "../controller/UserCtrl";


const userRouter = express.Router();

userRouter.get("/",getUsers);
userRouter.get("/:id",getOneUser);
userRouter.post("/", postUser);
userRouter.put("/:id", putUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
