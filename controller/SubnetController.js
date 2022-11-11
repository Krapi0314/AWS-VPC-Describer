import { EC2Client, DescribeSubnetsCommand } from "@aws-sdk/client-ec2";
import {
  saveSubnetResourceDataInDB,
  getSubnetResourceDataFromDB,
} from "../service/vpcResourceService.js";

const defaultRegion = process.env.AWS_REGION;

export const describeSubnets = async (req, res) => {
  const requestRegion = req.query.region ? req.query.region : defaultRegion;
  const params = {};

  const client = new EC2Client({ region: requestRegion });
  const command = new DescribeSubnetsCommand(params);

  try {
    const data = await client.send(command);
    saveSubnetResourceDataInDB(data);

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const describeSubnetsFromDB = async (req, res) => {
  try {
    const data = await getSubnetResourceDataFromDB();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};
