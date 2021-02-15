import { Min, IsMongoId, IsOptional } from 'class-validator';

export class CreateRechargeServiceDto {
  @Min(0)
  mount: number;

  @IsMongoId()
  createdBy: string;

  @IsMongoId()
  @IsOptional()
  wallet?: string;
}
