import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class UpdateAddressDto {
  @ApiProperty()
  street_name: string;

  @ApiProperty()
  district_id: string;

  @ApiProperty()
  is_default: boolean;

  @ApiProperty()
  apartment_number: string;

  @ApiProperty()
  building_number: string;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  city_id: number;
}

export const updateAddressSchema = Joi.object<UpdateAddressDto>({
  building_number: Joi.string().required(),
  street_name: Joi.string().required(),
  district_id: Joi.string().required(),
  country_id: Joi.number().integer().required(),
  city_id: Joi.number().integer().required(),
  is_default: Joi.boolean().required(),
  apartment_number: Joi.string().optional(),
});
