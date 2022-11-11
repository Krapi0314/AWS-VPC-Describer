import express from "express";
import { describeRegionsFromDB } from "../controller/RegionController.js";
import { describeSubnetsFromDB } from "../controller/SubnetController.js";
import { describeVpcsFromDB } from "../controller/VpcController.js";

const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: AWS VPC Resource DB Fetch API
 *    description: API to fetch AWS VPC resources alternatively from MySQL DB
 */

/**
 * @openapi
 * /api/v1/db/aws/regions:
 *   get:
 *     tags: [AWS VPC Resource DB Fetch API]
 *     description: API for describing all AWS regions from DB
 *     responses:
 *       200:
 *         description: AWS regions fetch success
 *       400:
 *         description: AWS regions fetch fail
 */
router.get("/regions", describeRegionsFromDB);

/**
 * @openapi
 * /api/v1/db/aws/vpcs:
 *   get:
 *     tags: [AWS VPC Resource DB Fetch API]
 *     description: API for describing all AWS vpcs in specific region from DB
 *     responses:
 *       200:
 *         description: AWS vpcs fetch success
 *       400:
 *         description: AWS vpcs fetch fail
 */
router.get("/vpcs", describeVpcsFromDB);

/**
 * @openapi
 * /api/v1/db/aws/subnets:
 *   get:
 *     tags: [AWS VPC Resource DB Fetch API]
 *     description: API for describing all AWS subnets in specific region from DB
 *     responses:
 *       200:
 *         description: AWS subnets fetch success
 *       400:
 *         description: AWS subnets fetch fail
 */
router.get("/subnets", describeSubnetsFromDB);

export default router;
