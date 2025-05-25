import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nail Spa API",
      version: "1.0.0",
      description: "API documentation for Nail Spa backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["src/routes/*.ts", "src/controllers/*.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
