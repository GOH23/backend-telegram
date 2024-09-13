import { Games } from "src/games/entities/game.entity";
import { Image } from "src/image/entities/image.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId: string
    @Column({unique: true})
    Name: string
    @Column({default: true})
    Blocked: boolean
    @Column()
    Value: number
    @ManyToOne(()=>Image,(el)=>el.products,{eager: true})
    Image: Image
    @ManyToOne(()=>Games,(el)=>el.products,{eager: true})
    Type: Games
}
