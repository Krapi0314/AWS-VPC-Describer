import express from "express";
import { describeRegions } from "../controller/RegionController.js";
import { describeSubnets } from "../controller/SubnetController.js";
import { describeVpcs } from "../controller/VpcController.js";

const router = express.Router();
/**
 *  @swagger
 *  tags:
 *    name: AWS API
 *    description: API to fetch AWS VPC resources directly from AWS
 */

/**
 * @openapi
 * /api/v1/aws/regions:
 *   get:
 *     tags: [AWS API]
 *     description: API for describing all AWS regions
 *     responses:
 *       200:
 *         description: AWS regions fetch success
 *       400:
 *         description: AWS regions fetch fail
 */
router.get("/regions", describeRegions);

/**
 * @openapi
 * /api/v1/aws/vpcs:
 *   get:
 *     tags: [AWS API]
 *     description: API for describing all AWS vpcs in specific region
 *     parameters:
 *              - in: query
 *                name: region
 *                type: string
 *                description: Pass a region name or default region is picked from env file.
 *     responses:
 *       200:
 *         description: AWS vpcs fetch success
 *       400:
 *         description: AWS vpcs fetch fail
 */
router.get("/vpcs", describeVpcs);

/**
 * @openapi
 * /api/v1/aws/subnets:
 *   get:
 *     tags: [AWS API]
 *     description: API for describing all AWS subnets in specific region
 *     parameters:
 *              - in: query
 *                name: region
 *                type: string
 *                description: Pass a region name or default region is picked from env file.
 *     responses:
 *       200:
 *         description: AWS subnets fetch success
 *       400:
 *         description: AWS subnets fetch fail
 */
router.get("/subnets", describeSubnets);

export default router;
