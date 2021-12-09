import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://localhost:27017/customerDB"),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "sipusipu18",
            database: "student-management",
            // entities: [] // OR
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class DatabaseModule {}
