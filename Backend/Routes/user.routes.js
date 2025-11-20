import express from "express"
import {userCreate, userDelete,userUpdate,userFindById,userList} from "../controller/user.controller.js"

const userRoutes = express.Router()

userRoutes.post("/create", userCreate)

userRoutes.get("/list", userList)

userRoutes.get("/profile/:id",userFindById)

userRoutes.delete("/delete/:id",userDelete)

userRoutes.put("/update/:id",userUpdate)


export default userRoutes