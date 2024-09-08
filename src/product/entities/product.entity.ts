import { Games } from "src/games/entities/game.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId: string
    @Column({unique: true})
    Name: string
    @Column()
    ImagePath: string
    @Column()
    Value: number
    @ManyToOne(()=>Games,(el)=>el.products,{eager: true})
    Type: Games
}
