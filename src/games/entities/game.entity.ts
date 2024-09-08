import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Games{
    @PrimaryGeneratedColumn()
    gameId: number
    @Column({unique: true})
    gameName: string
    @OneToMany(()=>Product,(el)=>el.Type)
    products: Product[]
}