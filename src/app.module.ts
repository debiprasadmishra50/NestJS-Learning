import { CacheModule, CACHE_MANAGER, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { DatabaseModule } from "./database/database.module";
import { CustomerModule } from "./customer/customer.module";
import { AuthModule } from "./auth/auth.module";
import { TestuserModule } from "./passport-local-testuser/testuser.module";
import { TestauthModule } from "./passport-local-testauth/testauth.module";
import { AppController } from "./app.controller";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { StudentModule } from "./student/student.module";
import { AuthSQLModule } from "./auth-sql-pg/auth-sql.module";

@Module({
    imports: [
        UserModule,
        TaskModule,
        DatabaseModule,
        CustomerModule,
        AuthModule,
        AuthSQLModule,
        TestuserModule,
        TestauthModule,
        EventEmitterModule.forRoot({ delimiter: "." }),
        ScheduleModule.forRoot(),
        CacheModule.register({
            max: 10, // 10 elements
            ttl: 10, // seconds
        }),
        StudentModule,
    ],
    controllers: [AppController],
    providers: [],
    exports: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("/**");
    }
}
