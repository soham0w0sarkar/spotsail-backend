import express from "express";
import { isAuthentiated } from "../middlewares/auth.js";
import {
  addData,
  login,
  logout,
  register,
} from "../controllers/institution.js";

const institutionRouter = express.Router();

institutionRouter.route("/register").post(register);
institutionRouter.route("/login").post(login);
institutionRouter.route("/logout").get(isAuthentiated, logout);
institutionRouter.route("/addData").post(isAuthentiated, addData);

export default institutionRouter;
