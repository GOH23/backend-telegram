import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateGameDto{
    @IsNotEmpty()
    @IsString()
    gameName: string
}

export class CreateGamesDto{
    @IsNotEmpty()
    @IsArray()
    gameNames: string[]
}