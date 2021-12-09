import { User } from "../../auth-sql-pg/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    // @PrimaryGeneratedColumn("uuid") // if uuid is required
    // id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @ManyToOne((_type) => User, (user) => user.students, { eager: false })
    /* 
        Don't fetch the User while fetching Student
    */
    @Exclude({ toPlainOnly: true })
    user: User;
}
