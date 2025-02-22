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
import { AuthenticatedRequest } from "../utils/express";

export const getAllUsers = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      res.status(403).json({
        message: "Access forbidden: Admin access required",
      });
      return;
    }
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only access your own data",
      });
      return;
    }
    const user = await fetchUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getEnigmaByUserId = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only access your own enigmas",
      });
      return;
    }
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
    const { username, email, password } = req.body;
    const user = await addUser({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Les admins peuvent modifier tous les profils
    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only modify your own data",
      });
      return;
    }
    const { username, email } = req.body;
    const user = await modifyUser(req.params.id, { username, email });
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only delete your own account",
      });
      return;
    }
    await removeUser(req.params.id);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
