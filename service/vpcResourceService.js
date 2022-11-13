import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveRegionResourceDataInDB = async (data) => {
  const regions = data.Regions;

  regions.map(async (region) => {
    await prisma?.region?.upsert({
      where: { RegionName: region?.RegionName },
      update: {
        Endpoint: region?.Endpoint,
        RegionName: region?.RegionName,
        OptInStatus: region?.OptInStatus,
      },
      create: {
        Endpoint: region?.Endpoint,
        RegionName: region?.RegionName,
        OptInStatus: region?.OptInStatus,
      },
    });
  });
};

export const saveVpcResourceDataInDB = async (data) => {
  const vpcs = data.Vpcs;

  vpcs.map(async (vpc) => {
    await prisma.vpc.upsert({
      where: { VpcId: vpc?.VpcId },
      update: {
        CidrBlock: vpc?.CidrBlock,
        DhcpOptionsId: vpc?.DhcpOptionsId,
        InstanceTenancy: vpc?.InstanceTenancy,
        IsDefault: vpc?.IsDefault,
        OwnerId: vpc?.OwnerId,
        State: vpc?.State,
        Tags: vpc?.Tags,
        VpcId: vpc?.VpcId,
      },
      create: {
        CidrBlock: vpc?.CidrBlock,
        DhcpOptionsId: vpc?.DhcpOptionsId,
        InstanceTenancy: vpc?.InstanceTenancy,
        IsDefault: vpc?.IsDefault,
        OwnerId: vpc?.OwnerId,
        State: vpc?.State,
        Tags: vpc?.Tags,
        VpcId: vpc?.VpcId,
      },
    });

    const vpcCidrBlockAssociations = vpc.CidrBlockAssociationSet;

    if (vpcCidrBlockAssociations) {
      vpcCidrBlockAssociations.map(async (vpcCidrBlockAssociation) => {
        await prisma.vpcCidrBlockAssociation.upsert({
          where: { AssociationId: vpcCidrBlockAssociation?.AssociationId },
          update: {
            AssociationId: vpcCidrBlockAssociation?.AssociationId,
            CidrBlock: vpcCidrBlockAssociation?.CidrBlock,
            State: vpcCidrBlockAssociation?.CidrBlockState?.State,
            StatusMessage:
              vpcCidrBlockAssociation?.CidrBlockState?.StatusMessage,
            vpcId: vpc?.VpcId,
          },
          create: {
            AssociationId: vpcCidrBlockAssociation?.AssociationId,
            CidrBlock: vpcCidrBlockAssociation?.CidrBlock,
            State: vpcCidrBlockAssociation?.CidrBlockState?.State,
            StatusMessage:
              vpcCidrBlockAssociation?.CidrBlockState?.StatusMessage,
            vpcId: vpc?.VpcId,
          },
        });
      });
    }

    const vpcIpv6CidrBlockAssociations = vpc.Ipv6CidrBlockAssociationSet;

    if (vpcIpv6CidrBlockAssociations) {
      vpcIpv6CidrBlockAssociations.map(async (vpcIpv6CidrBlockAssociation) => {
        await prisma.vpcIpv6CidrBlockAssociation.upsert({
          where: { AssociationId: vpcIpv6CidrBlockAssociation?.AssociationId },
          update: {
            AssociationId: vpcIpv6CidrBlockAssociation?.AssociationId,
            Ipv6CidrBlock: vpcIpv6CidrBlockAssociation?.Ipv6CidrBlock,
            State: vpcIpv6CidrBlockAssociation?.Ipv6CidrBlockState?.State,
            StatusMessage:
              vpcIpv6CidrBlockAssociation?.Ipv6CidrBlockState?.StatusMessage,
            Ipv6Pool: vpcIpv6CidrBlockAssociation?.Ipv6Pool,
            NetworkBorderGroup: vpcIpv6CidrBlockAssociation?.NetworkBorderGroup,
            vpcId: vpc?.VpcId,
          },
          create: {
            AssociationId: vpcIpv6CidrBlockAssociation?.AssociationId,
            Ipv6CidrBlock: vpcIpv6CidrBlockAssociation?.Ipv6CidrBlock,
            State: vpcIpv6CidrBlockAssociation?.Ipv6CidrBlockState?.State,
            StatusMessage:
              vpcIpv6CidrBlockAssociation?.Ipv6CidrBlockState?.StatusMessage,
            Ipv6Pool: vpcIpv6CidrBlockAssociation?.Ipv6Pool,
            NetworkBorderGroup: vpcIpv6CidrBlockAssociation?.NetworkBorderGroup,
            vpcId: vpc?.VpcId,
          },
        });
      });
    }
  });
};

export const saveSubnetResourceDataInDB = async (data) => {
  const subnets = data.Subnets;

  subnets?.map(async (subnet) => {
    await prisma.subnet.upsert({
      where: { SubnetId: subnet?.SubnetId },
      update: {
        AssignIpv6AddressOnCreation: subnet?.AssignIpv6AddressOnCreation,
        AvailabilityZone: subnet?.AvailabilityZone,
        AvailabilityZoneId: subnet?.AvailabilityZoneId,
        AvailableIpAddressCount: subnet?.AvailableIpAddressCount,
        CidrBlock: subnet?.CidrBlock,
        CustomerOwnedIpv4Pool: subnet?.CustomerOwnedIpv4Pool,
        DefaultForAz: subnet?.DefaultForAz,
        EnableDns64: subnet?.EnableDns64,
        EnableLniAtDeviceIndex: subnet?.EnableLniAtDeviceIndex,
        Ipv6Native: subnet?.Ipv6Native,
        MapCustomerOwnedIpOnLaunch: subnet?.MapCustomerOwnedIpOnLaunch,
        MapPublicIpOnLaunch: subnet?.MapPublicIpOnLaunch,
        OutpostArn: subnet?.OutpostArn,
        OwnerId: subnet?.OwnerId,
        EnableResourceNameDnsAAAARecord:
          subnet?.PrivateDnsNameOptionsOnLaunch
            ?.EnableResourceNameDnsAAAARecord,
        EnableResourceNameDnsARecord:
          subnet?.PrivateDnsNameOptionsOnLaunch?.EnableResourceNameDnsARecord,
        HostnameType: subnet?.PrivateDnsNameOptionsOnLaunch?.HostnameType,
        State: subnet?.State,
        SubnetArn: subnet?.SubnetArn,
        SubnetId: subnet?.SubnetId,
        Tags: subnet?.Tags,
        VpcId: subnet?.VpcId,
      },
      create: {
        AssignIpv6AddressOnCreation: subnet?.AssignIpv6AddressOnCreation,
        AvailabilityZone: subnet?.AvailabilityZone,
        AvailabilityZoneId: subnet?.AvailabilityZoneId,
        AvailableIpAddressCount: subnet?.AvailableIpAddressCount,
        CidrBlock: subnet?.CidrBlock,
        CustomerOwnedIpv4Pool: subnet?.CustomerOwnedIpv4Pool,
        DefaultForAz: subnet?.DefaultForAz,
        EnableDns64: subnet?.EnableDns64,
        EnableLniAtDeviceIndex: subnet?.EnableLniAtDeviceIndex,
        Ipv6Native: subnet?.Ipv6Native,
        MapCustomerOwnedIpOnLaunch: subnet?.MapCustomerOwnedIpOnLaunch,
        MapPublicIpOnLaunch: subnet?.MapPublicIpOnLaunch,
        OutpostArn: subnet?.OutpostArn,
        OwnerId: subnet?.OwnerId,
        EnableResourceNameDnsAAAARecord:
          subnet?.PrivateDnsNameOptionsOnLaunch
            ?.EnableResourceNameDnsAAAARecord,
        EnableResourceNameDnsARecord:
          subnet?.PrivateDnsNameOptionsOnLaunch?.EnableResourceNameDnsARecord,
        HostnameType: subnet?.PrivateDnsNameOptionsOnLaunch?.HostnameType,
        State: subnet?.State,
        SubnetArn: subnet?.SubnetArn,
        SubnetId: subnet?.SubnetId,
        Tags: subnet?.Tags,
        VpcId: subnet?.VpcId,
      },
    });

    const subnetIpv6CidrBlockAssociations = subnet.Ipv6CidrBlockAssociationSet;

    if (subnetIpv6CidrBlockAssociations) {
      subnetIpv6CidrBlockAssociations.map(
        async (subnetIpv6CidrBlockAssociation) => {
          await prisma.subnetIpv6CidrBlockAssociation.upsert({
            where: {
              AssociationId: subnetIpv6CidrBlockAssociation?.AssociationId,
            },
            update: {
              AssociationId: subnetIpv6CidrBlockAssociation?.AssociationId,
              Ipv6CidrBlock: subnetIpv6CidrBlockAssociation?.Ipv6CidrBlock,
              State: subnetIpv6CidrBlockAssociation?.Ipv6CidrBlockState?.State,
              StatusMessage:
                subnetIpv6CidrBlockAssociation?.Ipv6CidrBlockState
                  ?.StatusMessage,
              subnetId: subnetIpv6CidrBlockAssociation?.subnetId,
            },
            create: {
              AssociationId: subnetIpv6CidrBlockAssociation?.AssociationId,
              Ipv6CidrBlock: subnetIpv6CidrBlockAssociation?.Ipv6CidrBlock,
              State: subnetIpv6CidrBlockAssociation?.Ipv6CidrBlockState?.State,
              StatusMessage:
                subnetIpv6CidrBlockAssociation?.Ipv6CidrBlockState
                  ?.StatusMessage,
              subnetId: subnetIpv6CidrBlockAssociation?.subnetId,
            },
          });
        }
      );
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
      Ipv6CidrBlockAssociationSet: true,
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
