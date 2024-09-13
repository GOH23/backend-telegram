import { Games } from "src/games/entities/game.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn("uuid")
    imageId: string
    @Column({unique: true})
    imagePath: string
    @OneToMany(()=>Product,(product)=>product.Image)
    products: Product[]
}
