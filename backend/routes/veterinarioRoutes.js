import express from "express";
import { register, profile, confirm, authtentication,forgetPassword,validatePassword,newPassword  } from "../controllers/veterinarioController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const router = express.Router()


router

// PUBLIC AREA
    .post("/", register)
    .get("/verify/:token", confirm)
    .post("/login", authtentication)
    .post("/forget-password",forgetPassword)
    .get("/forget-password/:token", validatePassword)
    .post("/forget-password/:token", newPassword)

    //ANOTHER WAY
    //router.route("/forget-password/:token").get(validatePassword.post(newPassword))


    // PUBLIC AREA
    .get("/profile",checkAuth, profile)

    








export default router