import { Column, PrimaryGeneratedColumn } from "typeorm"

export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    phone: string
    @Column()
    password: string
}