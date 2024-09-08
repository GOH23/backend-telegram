import { Column, PrimaryColumn } from "typeorm";

export class OtherData {
    @Column()
    GenshinId: string;
    @Column()
    HonkaiStarRailId: string
}
