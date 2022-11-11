import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveRegionResourceDataInDB = async (data) => {
  const regions = data.Regions;

  regions.map(async (region) => {
    await prisma.region.upsert({
      where: { RegionName: region.RegionName },
      update: {
        Endpoint: region.Endpoint,
        RegionName: region.RegionName,
        OptInStatus: region.OptInStatus,
      },
      create: {
        Endpoint: region.Endpoint,
        RegionName: region.RegionName,
        OptInStatus: region.OptInStatus,
      },
    });
  });
};

export const saveVpcResourceDataInDB = async (data) => {
  const vpcs = data.Vpcs;

  vpcs.map(async (vpc) => {
    await prisma.vpc.upsert({
      where: { VpcId: vpc.VpcId },
      update: {
        CidrBlock: vpc.CidrBlock,
        DhcpOptionsId: vpc.DhcpOptionsId,
        State: vpc.State,
        VpcId: vpc.VpcId,
        OwnerId: vpc.OwnerId,
        InstanceTenancy: vpc.InstanceTenancy,
        IsDefault: vpc.IsDefault,
        Tags: vpc.Tags,
      },
      create: {
        CidrBlock: vpc.CidrBlock,
        DhcpOptionsId: vpc.DhcpOptionsId,
        State: vpc.State,
        VpcId: vpc.VpcId,
        OwnerId: vpc.OwnerId,
        InstanceTenancy: vpc.InstanceTenancy,
        IsDefault: vpc.IsDefault,
        Tags: vpc.Tags,
      },
    });

    const cidrBlockAssociations = vpc.CidrBlockAssociationSet;

    if (cidrBlockAssociations) {
      cidrBlockAssociations.map(async (cidrBlockAssociation) => {
        await prisma.cidrBlockAssociation.upsert({
          where: { AssociationId: cidrBlockAssociation.AssociationId },
          update: {
            AssociationId: cidrBlockAssociation.AssociationId,
            CidrBlock: cidrBlockAssociation.CidrBlock,
            CidrBlockState: cidrBlockAssociation.CidrBlockState,
            vpcId: vpc.VpcId,
          },
          create: {
            AssociationId: cidrBlockAssociation.AssociationId,
            CidrBlock: cidrBlockAssociation.CidrBlock,
            CidrBlockState: cidrBlockAssociation.CidrBlockState,
            vpcId: vpc.VpcId,
          },
        });
      });
    }
  });
};

export const saveSubnetResourceDataInDB = async (data) => {
  const subnets = data.Subnets;

  subnets.map(async (subnet) => {
    await prisma.subnet.upsert({
      where: { SubnetId: subnet.SubnetId },
      update: {
        AvailabilityZone: subnet.AvailabilityZone,
        AvailabilityZoneId: subnet.AvailabilityZoneId,
        AvailableIpAddressCount: subnet.AvailableIpAddressCount,
        CidrBlock: subnet.CidrBlock,
        DefaultForAz: subnet.DefaultForAz,
        MapPublicIpOnLaunch: subnet.MapPublicIpOnLaunch,
        MapCustomerOwnedIpOnLaunch: subnet.MapCustomerOwnedIpOnLaunch,
        State: subnet.State,
        SubnetId: subnet.SubnetId,
        VpcId: subnet.VpcId,
        OwnerId: subnet.OwnerId,
        AssignIpv6AddressOnCreation: subnet.AssignIpv6AddressOnCreation,
        Tags: subnet.Tags,
        SubnetArn: subnet.SubnetArn,
        EnableDns64: subnet.EnableDns64,
        Ipv6Native: subnet.Ipv6Native,
        PrivateDnsNameOptionsOnLaunch: subnet.PrivateDnsNameOptionsOnLaunch,
      },
      create: {
        AvailabilityZone: subnet.AvailabilityZone,
        AvailabilityZoneId: subnet.AvailabilityZoneId,
        AvailableIpAddressCount: subnet.AvailableIpAddressCount,
        CidrBlock: subnet.CidrBlock,
        DefaultForAz: subnet.DefaultForAz,
        MapPublicIpOnLaunch: subnet.MapPublicIpOnLaunch,
        MapCustomerOwnedIpOnLaunch: subnet.MapCustomerOwnedIpOnLaunch,
        State: subnet.State,
        SubnetId: subnet.SubnetId,
        VpcId: subnet.VpcId,
        OwnerId: subnet.OwnerId,
        AssignIpv6AddressOnCreation: subnet.AssignIpv6AddressOnCreation,
        Tags: subnet.Tags,
        SubnetArn: subnet.SubnetArn,
        EnableDns64: subnet.EnableDns64,
        Ipv6Native: subnet.Ipv6Native,
        PrivateDnsNameOptionsOnLaunch: subnet.PrivateDnsNameOptionsOnLaunch,
      },
    });

    const ipv6CidrBlockAssociations = subnet.Ipv6CidrBlockAssociationSet;

    if (ipv6CidrBlockAssociations) {
      ipv6CidrBlockAssociations.map(async (ipv6CidrBlockAssociation) => {
        await prisma.ipv6CidrBlockAssociation.upsert({
          where: { AssociationId: ipv6CidrBlockAssociation.AssociationId },
          update: {
            AssociationId: ipv6CidrBlockAssociation.AssociationId,
            Ipv6CidrBlock: ipv6CidrBlockAssociation.Ipv6CidrBlock,
            Ipv6CidrBlockState: ipv6CidrBlockAssociation.Ipv6CidrBlockState,
            subnetId: ipv6CidrBlockAssociation.subnetId,
          },
          create: {
            AssociationId: ipv6CidrBlockAssociation.AssociationId,
            Ipv6CidrBlock: ipv6CidrBlockAssociation.Ipv6CidrBlock,
            Ipv6CidrBlockState: ipv6CidrBlockAssociation.Ipv6CidrBlockState,
            subnetId: ipv6CidrBlockAssociation.subnetId,
          },
        });
      });
    }
  });
};

export const getRegionResourceDataFromDB = async () => {
  const regions = await prisma.region.findMany();

  return regions;
};

export const getVpcResourceDataFromDB = async () => {
  const vpcs = await prisma.vpc.findMany({
    include: {
      CidrBlockAssociationSet: true,
    },
  });

  return vpcs;
};

export const getSubnetResourceDataFromDB = async () => {
  const subnets = await prisma.subnet.findMany({
    include: {
      Ipv6CidrBlockAssociationSet: true,
    },
  });

  return subnets;
};
