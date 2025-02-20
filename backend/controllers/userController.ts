import { Request, Response } from "express";
import {
  addUser,
  fetchAllUsers,
  fetchUserById,
  fetchUserEnigmasById,
  removeUser,
} from "../services/userService";
import { handleErrorResponse } from "../utils/errorHandler";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await fetchUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getEnigmaByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enigmas = await fetchUserEnigmasById(req.params.id);
    if (!enigmas) {
      res.status(404).json({ message: "No enigmas found for this user" });
      return;
    }
    res.status(200).json(enigmas);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.username && !req.body.email) {
      res.status(400).json({ message: "No valid update data provided" });
      return;
    }
    res.status(204).json();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await removeUser(req.params.id);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
