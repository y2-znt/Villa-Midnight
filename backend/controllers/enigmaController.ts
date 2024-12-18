import { Request, Response } from 'express';
import prisma from "../src/prisma/prismaClient";

export const getAllEnigma = async (req: Request, res: Response) => {
    try {
      const enigmas = await prisma.enigma.findMany();
      res.status(200).json(enigmas);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  
  export const getEnigmaById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing ID parameter' });
      }
      const enigma = await prisma.enigma.findUnique({
        where: { id },
      });
      if (!enigma) {
        return res.status(404).json({ message: "Enigma not found" });
      }
      res.status(200).json(enigma);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  export const getEnigmaByUserId = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
        if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const enigmas = await prisma.enigma.findMany({
        where: { userId },
      });
      res.status(200).json(enigmas);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  

  export const getEnigmaByDifficulty = async (req: Request, res: Response) => {
    try {
      const difficulty = parseInt(req.params.difficulty, 10);
      if (isNaN(difficulty)) {
        return res.status(400).json({ message: 'Invalid difficulty parameter' });
      }
  
      const enigmas = await prisma.enigma.findMany({
        where: { difficulty },
      });
  
      res.status(200).json(enigmas);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  export const createEnigma = async (req: Request, res: Response) => {
    const { title, description, difficulty, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      const enigma = await prisma.enigma.create({
        data: {
          title,
          description,
          difficulty,
          user: {
            connect: { id: userId },
          },
        },
      });
      res.status(201).json(enigma);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  
  
  
  export const updateEnigma = async (req: Request, res: Response) => {
    const { title, description, difficulty } = req.body;
  
    try {
      const enigma = await prisma.enigma.update({
        where: { id: req.params.id },
        data: {
          title,
          description,
          difficulty,
        },
      });
      res.status(200).json(enigma);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  
  export const deleteEnigma = async (req: Request, res: Response) => {
    try {
      await prisma.enigma.delete({ where: { id: req.params.id } });
      res.status(200).json({ message: "Enigma deleted" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };