import { Request, Response } from "express";
import User from "../models/UserMdl";


const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allUser = await User.find();
        return res.status(200).json(allUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getOneUser = async (req, res) => {
    try {
      const { id } = req.params;
      const oneUser =  await User
      return res.status(200).json(oneUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
const postUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newUser = new User(req.body)
        const createdUser = await newUser.save()
        return res.status(201).json(createdUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const putUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const putUser = new User(req.body)
        putUser._id = id;
        const updateUser = await User.findByIdAndUpdate(id, putUser, { new: true })
        if (!updateUser) {
            return res.status(404).json({ message: "Sorry but we don't have users with this id" })
        }
        return res.status(200).json(updateUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteUser= async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(404).json({ message: "this user doesn't exist" })
        }
        return res.status(200).json(deleteUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { getUsers, getOneUser, deleteUser , putUser , postUser };