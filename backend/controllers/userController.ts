import { Request, Response } from "express";
import {
  addUser,
  fetchAllUsers,
  fetchUserById,
  fetchUserEnigmasById,
  modifyUser,
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
    const user = await modifyUser(req.params.id, req.body);
    res.status(200).json(user);
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
