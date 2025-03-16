import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/config";
import prisma from "../src/prisma/prismaClient";

export const fetchAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: { enigmas: true },
    });
    return users.map(({ password, enigmas, ...userWithoutPassword }) => ({
      ...userWithoutPassword,
      enigmas,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch users: ${(error as Error).message}`);
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { enigmas: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      enigmas: user.enigmas,
    };
  } catch (error) {
    throw new Error(`Failed to fetch user: ${(error as Error).message}`);
  }
};

export const fetchUserEnigmasById = async (userId: string) => {
  try {
    const enigmas = await prisma.enigma.findMany({ where: { userId } });
    if (!enigmas) {
      throw new Error("Enigmas not found");
    }
    return enigmas;
  } catch (error) {
    throw new Error(`Failed to fetch enigmas: ${(error as Error).message}`);
  }
};

export const addUser = async ({
  username,
  email,
  password,
  role,
}: {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};

export const modifyUser = async (
  id: string,
  {
    username,
    email,
    avatarUrl,
    role,
  }: {
    username?: string;
    email?: string;
    avatarUrl?: string;
    role?: "USER" | "ADMIN";
  }
) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        avatarUrl,
        role,
      },
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Failed to update user: ${(error as Error).message}`);
  }
};

export const removeUser = async (id: string) => {
  try {
    await prisma.enigma.deleteMany({ where: { userId: id } });

    await prisma.user.delete({ where: { id } });
  } catch (error) {
    throw new Error(`Failed to delete user: ${(error as Error).message}`);
  }
};
