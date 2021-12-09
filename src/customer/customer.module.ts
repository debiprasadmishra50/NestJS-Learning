import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./entities/customer.schema";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
        AuthModule,
        MulterModule.register({
            dest: "./uploadedFiles",
        }),
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
