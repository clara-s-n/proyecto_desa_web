import fp from "fastify-plugin";
import cors from "@fastify/cors";

const frontUrl = process.env.FRONTEND_URL;

if (!frontUrl)
  throw new Error("Debes especificar la variable de entorno FRONTEND_URL.");

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: [
      "https://localhost",
      "capacitor://localhost",
      "ionic://localhost",
      frontUrl,
    ],
  });
});
