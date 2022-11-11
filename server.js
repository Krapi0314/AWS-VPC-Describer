import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import awsRoutes from "./routes/awsRoutes.js";
import dbRoutes from "./routes/dbRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AWS VPC Describe API",
      version: "1.0.0",
      description:
        "This server fetch AWS VPC resources(regions, VPCs, subnets) and stores in MySQL Database.You can either fetch AWS VPC resources directly from AWS or alternatively fetch from MySQL DB",
      contact: {
        name: "Krapi0314",
        url: "https://github.com/krapi0314",
        email: "krapi0314@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
        description: "Local Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDoc = swaggerJSDoc(options);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/aws/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/v1/aws", awsRoutes);
app.use("/api/v1/db/aws", dbRoutes);

app.listen(PORT, () => {
  console.log(`AWS VPC Describer Server running on port ${PORT}`);
});
