import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "API Villa Midnight",
    description:
      "Documentation de l'API Villa Midnight - Plateforme d'énigmes immersives",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Serveur de développement",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Endpoints d'authentification",
    },
    {
      name: "Users",
      description: "Endpoints de gestion des utilisateurs",
    },
    {
      name: "Enigmas",
      description: "Endpoints de gestion des énigmes",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          avatarUrl: { type: "string" },
          googleId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          role: { type: "string", enum: ["USER", "ADMIN"] },
        },
      },
      Enigma: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          numberOfHours: { type: "integer" },
          numberOfParticipants: { type: "integer" },
          difficulty: { type: "string", enum: ["ONE", "TWO", "THREE"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      LoginRequest: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
      RegisterRequest: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["username", "email", "password"],
      },
    },
  },
  definitions: {
    User: {
      $ref: "#/components/schemas/User",
    },
    Enigma: {
      $ref: "#/components/schemas/Enigma",
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
