import { Types } from 'mongoose';
import { IsString, IsNumber, Max, Min, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  _id: Types.ObjectId;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(1)
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
