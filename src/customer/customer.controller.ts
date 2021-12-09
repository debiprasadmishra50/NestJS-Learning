import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    UseGuards,
    UseFilters,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Req,
    Query,
    CacheInterceptor,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { User } from "../auth/entities/user.entity";
import { GetUser } from "../auth/get-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Role } from "../auth/entities/role.enum";
import { imageFileFilter } from "./file-helper";
import { HttpExceptionFilter } from "./filters/httpexception.filter";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "./guards/roles.guard";
import { ValidationPipe } from "./pipes/class-validation.pipe";

@Controller("customers")
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("image", { fileFilter: imageFileFilter }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException("No file provided");

        return {
            name: file.filename,
            path: file.path,
            size: file.size,
            destination: file.destination,
            mimetype: file.mimetype,
        };
    }

    @Post()
    async create(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Get()
    // @UseInterceptors(CacheInterceptor)
    @Roles(Role.Admin)
    async findAll(@Query() query: any, @Res() res: Response) {
        const data = await this.customerService.findAllCustomers(query);

        res.status(200).json({
            status: "success",
            results: data.length,
            data,
        });
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.customerService.findOneCustomer(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customerService.updateCustomer(id, updateCustomerDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.customerService.removeCustomer(id);
    }
}
