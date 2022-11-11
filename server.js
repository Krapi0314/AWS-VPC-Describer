import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AWS VPC Describe API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDoc = swaggerJSDoc(options);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/aws/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/v1/aws", router);

app.listen(PORT, () => {
  console.log(`AWS VPC Describer Server running on port ${PORT}`);
});
