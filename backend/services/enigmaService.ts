import prisma from "../src/prisma/prismaClient";

// Fetch all enigmas
export const fetchAllEnigmas = async () => {
  try {
    const enigmas = await prisma.enigma.findMany();
    return enigmas;
  } catch (error) {
    throw new Error(`Failed to fetch enigmas: ${(error as Error).message}`);
  }
};

export const fetchEnigmaById = async (id: string) => {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid or missing ID parameter");
    }

    const enigma = await prisma.enigma.findUnique({ where: { id } });
    if (!enigma) {
      throw new Error("Enigma not found");
    }
    return enigma;
  } catch (error) {
    throw new Error(`Failed to fetch enigma: ${(error as Error).message}`);
  }
};

export const fetchEnigmaByDifficulty = async (difficulty: number) => {
  try {
    if (isNaN(difficulty)) {
      throw new Error("Invalid difficulty parameter");
    }

    const enigmas = await prisma.enigma.findMany({ where: { difficulty } });
    return enigmas;
  } catch (error) {
    throw new Error(`Failed to fetch enigmas: ${(error as Error).message}`);
  }
};

export const addEnigma = async ({
  title,
  description,
  difficulty,
  image,
  userId,
  numberOfParticipants,
  numberOfHours,
}: {
  title: string;
  description: string;
  difficulty: number;
  image: string;
  userId: string;
  numberOfParticipants?: number;
  numberOfHours?: number;
}) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error("User not found");
    }

    const enigma = await prisma.enigma.create({
      data: {
        title,
        description,
        difficulty,
        image,
        user: {
          connect: { id: userId },
        },
        numberOfParticipants,
        numberOfHours,
      },
    });
    return enigma;
  } catch (error) {
    throw new Error(`Failed to create enigma: ${(error as Error).message}`);
  }
};

export const modifyEnigma = async (
  id: string,
  {
    title,
    description,
    difficulty,
    image,
    numberOfParticipants,
    numberOfHours,
  }: {
    title?: string;
    description?: string;
    difficulty?: number;
    image?: string;
    numberOfParticipants?: number;
    numberOfHours?: number;
  }
) => {
  try {
    const enigma = await prisma.enigma.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        image,
        numberOfParticipants,
        numberOfHours,
      },
    });
    return enigma;
  } catch (error) {
    throw new Error(`Failed to update enigma: ${(error as Error).message}`);
  }
};

export const removeEnigma = async (id: string) => {
  try {
    await prisma.enigma.delete({ where: { id } });
    return { message: "Enigma deleted" };
  } catch (error) {
    throw new Error(`Failed to delete enigma: ${(error as Error).message}`);
  }
};
