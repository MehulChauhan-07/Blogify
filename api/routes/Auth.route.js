import express from "express";
import {
  GoogleLogin,
  Login,
  Logout,
  Register,
} from "../controllers/Auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validators.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", validateRegistration, Register);
AuthRoute.post("/login", validateLogin, Login);
AuthRoute.post("/google-login", GoogleLogin);
AuthRoute.get("/logout", authenticate, Logout);

export default AuthRoute;
