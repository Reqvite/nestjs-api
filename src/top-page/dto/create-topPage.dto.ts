import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';

export type TopLevelCategory = 'courses' | 'services' | 'books' | 'products';

class Hh {
  @IsNumber()
  count: number;
  @IsNumber()
  juniorSalary: number;
  @IsNumber()
  middleSalary: number;
  @IsNumber()
  seniorSalary: number;
}

class Advantages {
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class CreateTopPageDto {
  @IsString()
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @ValidateNested({ each: true })
  @Type(() => Hh)
  @IsOptional()
  hh?: Hh;

  @ValidateNested({ each: true })
  @Type(() => Advantages)
  advantages: Advantages[];

  @IsString()
  seoText: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  tagsTitle: string;
}
