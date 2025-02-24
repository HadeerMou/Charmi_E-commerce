import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'src/shared/prisma/client';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';

@Injectable()
export class AddressService {
  async getAllAddresses() {
    return await prisma.address.findMany({
      include: {
        UserAddresses: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async getAddressById(id: number) {
    const address = await prisma.address.findUnique({
      where: { id },
      include: { UserAddresses: true },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async createAddress(userId: number, createAddressDto: CreateAddressDto) {
    if (createAddressDto.isDefault) {
      await this.makeAddressUnDefault(userId);
    }

    return await prisma.address.create({
      data: {
        ...createAddressDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserAddresses: {
          create: {
            userId: userId,
            isDefault: createAddressDto.isDefault,
            updatedAt: new Date(),
          },
        },
      },
    });
  }

  private async makeAddressUnDefault(user_id: number) {
    await prisma.userAddresses.updateMany({
      where: {
        userId: user_id,
      },
      data: {
        isDefault: false,
      },
    });
  }

  async updateAddress(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    });
    if (address) {
      await prisma.address.update({
        where: {
          id,
        },
        data: {
          ...updateAddressDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    throw new BadRequestException('Address not Found');
  }

  async deleteAddress(id: number) {
    const address = await prisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await prisma.address.delete({
      where: { id },
    });

    return address;
  }

  async getAddressesByUserId(userId: number) {
    return await prisma.userAddresses.findMany({
      where: { userId },
      include: { Addresses: true },
    });
  }

  async getDefaultAddressByUserId(userId: number) {
    return await prisma.userAddresses.findFirst({
      where: { userId, isDefault: true },
      include: { Addresses: true },
    });
  }

  async setDefaultAddress(userId: number, addressId: number) {
    await this.makeAddressUnDefault(userId);

    return await prisma.userAddresses.update({
      where: { userId_addressId: { userId, addressId } },
      data: { isDefault: true },
    });
  }

  async removeDefaultAddress(userId: number) {
    return await prisma.userAddresses.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
}
