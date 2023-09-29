import express from "express"
import conectarDB from "./config/db.js"
import dotenv from "dotenv"
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import patientsRoutes from "./routes/patientsRoutes.js"
import cors from "cors"

const app = express()
app.use(express.json()) // PARA HABILTAR POSTS TIPO JSON

dotenv.config(); // Cargar las variables de entorno

conectarDB()

app.use(cors());

app.use("/api/veterinarios",veterinarioRoutes)
app.use("/api/patients",patientsRoutes)

const PORT =  4001



app.listen(PORT,()=>{
    console.log(`server listenning on port ${PORT}`)
}) 



