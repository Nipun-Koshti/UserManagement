import express from "express"
import userRoutes from "./user.routes.js"

const route = express.Router()

route.use("/user",userRoutes)

export default route