import { Column, Entity, PrimaryColumn } from "typeorm";
export enum Roles{
    Admin = "Admin",
    Manager = "Manager",
    User = "User"
}
@Entity()
export class User {
    @PrimaryColumn()
    userId: number;
    @Column()
    allowsWriteToPm: boolean
    @Column({default: ""})
    firstname: string
    @Column({default: "ru"})
    languageCode: string
    @Column({default: ""})
    username: string
    @Column({type: 'enum',enum: Roles,default: Roles.User,select: true})
    roles: Roles
}