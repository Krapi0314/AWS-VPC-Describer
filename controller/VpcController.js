import { EC2Client, DescribeVpcsCommand } from "@aws-sdk/client-ec2";
import {
  saveVpcResourceDataInDB,
  getVpcResourceDataFromDB,
} from "../service/vpcResourceService.js";

const defaultRegion = process.env.AWS_REGION;

export const describeVpcs = async (req, res) => {
  const requestRegion = req.query.region ? req.query.region : defaultRegion;
  const params = {};

  const client = new EC2Client({ region: requestRegion });
  const command = new DescribeVpcsCommand(params);

  try {
    const data = await client.send(command);
    saveVpcResourceDataInDB(data);

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const describeVpcsFromDB = async (req, res) => {
  try {
    const data = await getVpcResourceDataFromDB();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};
