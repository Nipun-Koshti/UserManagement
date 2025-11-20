import express from "express"
import asyncHandler from "../utils/asyncHandeler.js"
import User from "../Model/user.model.js"
import mongoose from "mongoose"


const userCreate = asyncHandler(async(req,res)=>{
    const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
})

const userList = asyncHandler(async(req,res)=>{
    const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
})

const userFindById = asyncHandler(async(req,res)=>{

  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format",
    });
  }

    const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });

})

const userDelete = asyncHandler(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
})

const userUpdate = asyncHandler(async(req,res)=>{
    const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
})



export{userCreate, userDelete,userUpdate,userFindById,userList}