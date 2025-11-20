import express from "express"
import route from "./Routes/routes.js"
import dotenv from "dotenv"
import connectDB from "./db/connection.js"
import cors from "cors"

dotenv.config()



const app = express()
app.use(express.json());
app.use(cors())

connectDB()

app.use("/api", route)

app.listen(process.env.PORT, console.log("app is listening on port 4000"))
