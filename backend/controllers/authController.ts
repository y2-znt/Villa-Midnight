import { Request, Response } from "express";
import { loggedInUser, loginUser, registerUser } from "../services/authService";
import { handleErrorResponse } from "../utils/errorHandler";
import { AuthenticatedRequest } from "../utils/express";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return handleErrorResponse(res, new Error("Unauthorized: No user found"));
    }

    const user = await loggedInUser(req.user.userId);
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    console.error("Error retrieving current user:", error);
    handleErrorResponse(res, error);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
