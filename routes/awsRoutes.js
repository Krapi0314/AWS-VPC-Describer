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

/**
 * @swagger
 *     components:
 *         schemas:
 *             Region:
 *                 type: object
 *                 properties:
 *                     Endpoint:
 *                         type: string
 *                         description: The Region service endpoint.
 *                     OptInStatus:
 *                         type: string
 *                         description: The Region opt-in status. The possible values are opt-in-not-required, opted-in, and not-opted-in.
 *                     RegionName:
 *                         type: string
 *                         description: The name of the Region.
 *             Vpc:
 *                 type: object
 *                 properties:
 *                     CidrBlock:
 *                         type: string
 *                         description: The Region service endpoint.
 *                     CidrBlockAssociationSet:
 *                         type: VpcCidrBlockAssociation[]
 *                         description: Information about the IPv4 CIDR blocks associated with the VPC.
 *                     DhcpOptionsId:
 *                         type: string
 *                         description: The ID of the set of DHCP options you've associated with the VPC.
 *                     InstanceTenancy:
 *                         type: string
 *                         description: The allowed tenancy of instances launched into the VPC.
 *                     Ipv6CidrBlockAssociationSet:
 *                         type: VpcIpv6CidrBlockAssociation[]
 *                         description: Information about the IPv6 CIDR blocks associated with the VPC.
 *                     IsDefault:
 *                         type: boolean
 *                         description: Indicates whether the VPC is the default VPC.
 *                     OwnerId:
 *                         type: string
 *                         description: The ID of the Amazon Web Services account that owns the VPC.
 *                     State:
 *                         type: string
 *                         description: The current state of the VPC.
 *                     Tags:
 *                         type: Tag[]
 *                         description: Any tags assigned to the VPC.
 *                     VpcId:
 *                         type: string
 *                         description: The ID of the VPC.
 *             Subnet:
 *                 type: object
 *                 properties:
 *                     AssignIpv6AddressOnCreation:
 *                         type: boolean
 *                         description: Indicates whether a network interface created in this subnet (including a network interface created by RunInstances) receives an IPv6 address.
 *                     AvailabilityZone:
 *                         type: string
 *                         description: The Availability Zone of the subnet.
 *                     AvailabilityZoneId:
 *                         type: string
 *                         description: The AZ ID of the subnet.
 *                     AvailableIpAddressCount:
 *                         type: integer
 *                         description: The number of unused private IPv4 addresses in the subnet. The IPv4 addresses for any stopped instances are considered unavailable.
 *                     CidrBlock:
 *                         type: string
 *                         description: The IPv4 CIDR block assigned to the subnet.
 *                     CustomerOwnedIpv4Pool:
 *                         type: string
 *                         description: The customer-owned IPv4 address pool associated with the subnet.
 *                     DefaultForAz:
 *                         type: boolean
 *                         description: Indicates whether this is the default subnet for the Availability Zone.
 *                     EnableDns64:
 *                         type: boolean
 *                         description: Indicates whether DNS queries made to the Amazon-provided DNS Resolver in this subnet should return synthetic IPv6 addresses for IPv4-only destinations.
 *                     EnableLniAtDeviceIndex:
 *                         type: integer
 *                         description: Indicates the device position for local network interfaces in this subnet. For example, 1 indicates local network interfaces in this subnet are the secondary network interface (eth1).
 *                     Ipv6CidrBlockAssociationSet:
 *                         type: SubnetIpv6CidrBlockAssociation[]
 *                         description: Information about the IPv6 CIDR blocks associated with the subnet.
 *                     Ipv6Native:
 *                         type: boolean
 *                         description: Indicates whether this is an IPv6 only subnet.
 *                     MapCustomerOwnedIpOnLaunch:
 *                         type: boolean
 *                         description: Indicates whether a network interface created in this subnet (including a network interface created by RunInstances) receives a customer-owned IPv4 address.
 *                     MapPublicIpOnLaunch:
 *                         type: boolean
 *                         description: Indicates whether instances launched in this subnet receive a public IPv4 address.
 *                     OutpostArn:
 *                         type: string
 *                         description: The Amazon Resource Name (ARN) of the Outpost.
 *                     OwnerId:
 *                         type: string
 *                         description: The ID of the Amazon Web Services account that owns the subnet.
 *                     PrivateDnsNameOptionsOnLaunch:
 *                         type: PrivateDnsNameOptionsOnLaunch
 *                         description: The type of hostnames to assign to instances in the subnet at launch. An instance hostname is based on the IPv4 address or ID of the instance.
 *                     State:
 *                         type: string
 *                         description: The current state of the subnet.
 *                     SubnetArn:
 *                         type: string
 *                         description: The Amazon Resource Name (ARN) of the subnet.
 *                     SubnetId:
 *                         type: string
 *                         description: The ID of the subnet.
 *                     Tags:
 *                         type: Tag[]
 *                         description: Any tags assigned to the subnet.
 *                     VpcId:
 *                         type: string
 *                         description: The ID of the VPC the subnet is in.
 */
export default router;
