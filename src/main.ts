import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./user/filters/httpexception.filter";
import { LoggingInterceptor } from "./user/interceptors/logging.interceptor";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("/api/v1");
    // app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalFilters(new HttpExceptionFilter());
    // app.useGlobalInterceptors(new LoggingInterceptor())
    app.use(cookieParser());

    const port = process.env.PORT || 3000;
    await app.listen(port, () => {
        console.log("[+] Server started on port " + port);
    });
}
bootstrap();
