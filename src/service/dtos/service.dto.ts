import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class OrderDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  id: number;

  @IsString()
  @IsUrl()
  @MinLength(0)
  @MaxLength(2048)
  link: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number; // should be checked again in code
}
