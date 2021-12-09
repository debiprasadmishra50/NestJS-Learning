import { Student } from "../../student/entities/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: Role, default: Role.User })
    role: Role;

    @OneToMany((_type) => Student, (student) => student.user, { eager: true })
    /* 
        Fetch the students automatically
    */
    students: Student[];
}
