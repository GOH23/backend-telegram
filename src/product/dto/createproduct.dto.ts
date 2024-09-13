import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Max, Min } from "class-validator"

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    @Length(3,100)
    Name: string
    @IsNotEmpty()
    @IsNumberString()
    Value: number
    @IsNotEmpty()
    @IsString()
    @Length(3,100)
    TypeName: string
    @IsNotEmpty()
    ImagePath: string
}