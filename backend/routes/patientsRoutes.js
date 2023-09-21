import express  from "express";
import { addPatient,getPatients,patientByID,updatePatient,deletePatient } from "../controllers/patientsControllers.js";
import {checkAuth} from "../middleware/authMiddleware.js"

const router = express.Router()


    router
            //ADD PATIENT
            .post("/",checkAuth, addPatient)

            //GET PATIENTS
            .get("/",checkAuth, getPatients)

            //GET PATIENT
            .get("/:id",checkAuth, patientByID)

            //UPDATE PATIENT
            .put("/:id",checkAuth, updatePatient)

            //DELETE PATIENT
            .delete("/:id",checkAuth, deletePatient)






export default router